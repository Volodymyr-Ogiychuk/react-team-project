// Зробити валідацію поля форми, використовувати: 1) бібліотеку formik та yup або 2) indicative. Обов'язковою має бути тільки сума транзакції,

import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import 'react-datepicker/dist/react-datepicker.css';
import s from './ModalAddTransaction.module.css';
import {
  addTransaction,
  getCategories,
} from 'redux/transactions/transactions-operations';
import { selectCategories } from 'redux/transactions/transactions-selectors';
import { CustomDatePicker } from './CustomDatePicker';

export function ModalAddTransaction() {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const closeOnEsc = e => {
      if (e.code === 'Escape') {
        dispatch(toggleModal());
      }
    };

    document.addEventListener('keydown', closeOnEsc);
    return () => document.removeEventListener('keydown', closeOnEsc);
  }, [dispatch]);

  function closeOnOverlay(e) {
    if (e.target === e.currentTarget) {
      dispatch(toggleModal());
    }
  }

  const categories = useSelector(selectCategories);

  const formik = useFormik({
    initialValues: {
      type: true,
      amount: '',
      comment: '',
      categoryId: '',
    },
    validationSchema: yup.object({
      type: yup.bool().required('Required'),
      amount: yup.number().required('Required'),
      comment: yup.string().max(40, '40 characters max'),
      categoryId: yup.string().required('Required'),
    }),

    onSubmit: ({ categoryId, type, amount, comment }) => {
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
        >
          X
        </button>

        <form className={s.modalForm} onSubmit={handleSubmit}>
          <h2>Add transaction</h2>

          <span className={values.type ? s.inactive : s.income}>Income</span>
          <input
            name="type"
            type="checkbox"
            checked={values.type}
            onChange={handleChange}
          />
          <span className={values.type ? s.expense : s.inactive}>Expense</span>

          {values.type && (
            <select
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
              required
            >
              <option value="" disabled hidden>
                Select your option
              </option>
              {categories.map(category =>
                category.type === 'EXPENSE' ? (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ) : null
              )}
            </select>
          )}
          {touched.categoryId && errors.categoryId ? (
            <div>{errors.categoryId}</div>
          ) : null}

          <input
            name="amount"
            type="text"
            placeholder="0.00"
            value={values.amount}
            onChange={handleChange}
            required
          />
          {touched.amount && errors.amount ? <div>{errors.amount}</div> : null}

          <DatePicker
            selected={startDate}
            dateFormat="dd.MM.yyyy"
            calendarStartDay={1}
            onChange={date => {
              setStartDate(date);
            }}
            customInput={<CustomDatePicker />}
          />

          <input
            name="comment"
            type="text"
            placeholder="Your comment"
            value={values.comment}
            onChange={handleChange}
          />
          {touched.comment && errors.comment ? (
            <div>{errors.comment}</div>
          ) : null}

          <div>
            <button type="submit">Add</button>
            <button type="button" onClick={() => dispatch(toggleModal())}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
