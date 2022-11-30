// Модальне вікно бере екшн на закриття global.isModalAddTransactionOpen і вішає його на сірий фон, кнопку Escape
// Зробити валідацію поля форми, використовувати: 1) бібліотеку formik та yup або 2) indicative. Обов'язковою має бути тільки сума транзакції,
// дата та тип транзакції, коментар необов'язкове поле.
// Також операція повинна додавати в redux store нову транзакцію, отриману у відповідь від сервера.
// На неуспішне спрацювання операції скористатися бібліотекою react-toastify та виводити помилку

import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import s from './ModalAddTransaction.module.css';
import {
  addTransaction,
  getCategories,
} from 'redux/transactions/transactions-operations';
import { selectCategories } from 'redux/transactions/transactions-selectors';

export function ModalAddTransaction() {
  const [startDate, setStartDate] = useState(new Date());
  const dispatch = useDispatch();

  console.log(startDate);
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector(selectCategories);

  const formik = useFormik({
    initialValues: {
      type: true,
      amount: '',
      comment: '',
      categoryId: '',
    },
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

  const { handleChange, handleSubmit, values } = formik;

  return (
    <div className={s.backdrop}>
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

          <input
            name="amount"
            type="text"
            placeholder="0.00"
            value={values.amount}
            onChange={handleChange}
            required
          />
          <DatePicker
            selected={startDate}
            dateFormat="dd.MM.yyyy"
            calendarStartDay={1}
            onChange={date => {
              console.log('datepicker inside', date);
              setStartDate(date);
            }}
          />
          <input
            name="comment"
            type="text"
            placeholder="Your comment"
            value={values.comment}
            onChange={handleChange}
          />
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
