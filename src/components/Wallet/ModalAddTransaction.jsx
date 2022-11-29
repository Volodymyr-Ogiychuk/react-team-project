// Модальне вікно бере екшн на закриття global.isModalAddTransactionOpen і вішає його на сірий фон, кнопку Escape
// Statefull комопнент, у свому State зберігає поточний стан інпутів
// За замовчуванням обрана радіокнопка на витрату
// Залежно від обраного стану в радіокнопці рендерувати чи ні селект з вибором категорій
// Розібратися з бібліотекою react-datetime і підключити її до компопента, за замовчуванням має бути обрана поточна дата
// Зробити валідацію поля форми, використовувати: 1) бібліотеку formik та yup або 2) indicative. Обов'язковою має бути тільки сума транзакції,
// дата та тип транзакції, коментар необов'язкове поле.
// Написати операцію на створення транзакції та повісити її на сабміт форми, всередині операції на успішне виконання операції закривати модальне вікно
// екшн на закриття global.isModalAddTransactionOpen.Також операція повинна додавати в redux store нову транзакцію, отриману у відповідь від сервера.
// На неуспішне спрацювання операції скористатися бібліотекою react-toastify та виводити помилку

import { useFormik } from 'formik';
import DatePicker from 'react-datepicker';
import { useDispatch } from 'react-redux';
import { toggleModal } from 'redux/transactions/transactions-slice';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import s from './ModalAddTransaction.module.css';

export function ModalAddTransaction() {
  const [startDate, setStartDate] = useState(new Date());

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      type: true,
      amount: '',
      comment: '',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
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
        >
          X
        </button>
        <form className={s.modalForm} onSubmit={handleSubmit}>
          <h2>Add transaction</h2>

          <span className={values.type ? s.inActive : s.income}>Income</span>
          <input
            name="type"
            type="checkbox"
            checked={values.type}
            onChange={handleChange}
          />
          <span className={values.type ? s.expense : s.inActive}>Expense</span>

          {values.type && <select required></select>}

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
            onChange={date => setStartDate(date)}
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
