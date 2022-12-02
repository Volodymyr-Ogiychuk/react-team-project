import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import s from './ModalAddTransaction.module.css';
import {
  addTransaction,
  getCategories,
} from 'redux/transactions/transactions-operations';
import { CustomDatePicker } from './CustomDatePicker';
import { ModalSelect } from './ModalSelect';

export function ModalAddTransaction() {
  const [startDate, setStartDate] = useState(new Date());
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Close modal on ESC logic:

  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code === 'Escape') {
        dispatch(toggleModal());
      }
    };

    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [dispatch]);

  // Close modal on overlay click logic:

  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      dispatch(toggleModal());
    }
  }

  // formik setup:

  const formik = useFormik({
    initialValues: {
      type: true,
      amount: '',
      comment: '',
    },
    validationSchema: yup.object({
      type: yup.bool(),
      amount: yup.number().required('Required'),
      comment: yup.string().max(40, '40 characters max'),
    }),

    onSubmit: ({ type, amount, comment }) => {
      const newTransaction = {
        transactionDate: startDate,
        comment,
        categoryId: type ? categoryId : '063f1132-ba5d-42b4-951d-44011ca46262',
        amount: type ? Number(amount) * -1 : Number(amount),
        type: type ? 'EXPENSE' : 'INCOME',
      };
      dispatch(addTransaction(newTransaction));
      dispatch(toggleModal());
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  return (
    <div className={s.backdrop} onClick={closeOnOverlay}>
      <div className={s.modal}>
        <button
          className={s.closeBtn}
          onClick={() => dispatch(toggleModal())}
          type="button"
          aria-label="close button"
        ></button>

        <form className={s.modalForm} onSubmit={handleSubmit}>
          <h2 className={s.modalTitle}>Add transaction</h2>

          <div className={s.typeWrapper}>
            <div className={values.type ? s.inactive : s.income}>Income</div>
            <label className={s.typeLabel}>
              <input
                className={s.typeCheckbox}
                name="type"
                type="checkbox"
                checked={values.type}
                onChange={handleChange}
              />
              <div className={s.customCheckbox}></div>
            </label>
            <div className={values.type ? s.expense : s.inactive}>Expense</div>
          </div>

          {values.type && <ModalSelect setCategoryId={setCategoryId} />}
          {touched.categoryId && errors.categoryId ? (
            <div>{errors.categoryId}</div>
          ) : null}

          <div className={s.amountAndDate}>
            <input
              className={s.amountInput}
              name="amount"
              type="text"
              placeholder="0.00"
              value={values.amount}
              onChange={handleChange}
              required
            />
            {touched.amount && errors.amount ? (
              <div>{errors.amount}</div>
            ) : null}

            <DatePicker
              selected={startDate}
              dateFormat="dd.MM.yyyy"
              calendarStartDay={1}
              onChange={setStartDate}
              customInput={<CustomDatePicker />}
            />
          </div>

          <textarea
            className={s.commentInput}
            name="comment"
            type="text"
            placeholder="Comment"
            value={values.comment}
            onChange={handleChange}
          />
          {touched.comment && errors.comment ? (
            <div>{errors.comment}</div>
          ) : null}

          <div className={s.btnWrapper}>
            <button className={s.addBtn} type="submit">
              Add
            </button>
            <button
              className={s.cancelBtn}
              type="button"
              onClick={() => dispatch(toggleModal())}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
