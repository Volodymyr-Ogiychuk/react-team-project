import { forwardRef } from 'react';
import s from './Transactions.module.css';

export const CustomDatePicker = forwardRef(({ value, onClick }, ref) => {
  return (
    <input
      value={value}
      className={s.customDateInput}
      onClick={onClick}
      onChange={onClick}
      ref={ref}
      required
    />
  );
});
