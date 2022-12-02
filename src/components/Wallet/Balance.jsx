import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrentUser } from '../../redux/AuthRedux/operations';
import { selectTransactions } from 'redux/transactions/transactions-selectors';
import { getAuthBalance } from '../../redux/AuthRedux/selectors';
import s from './Balance.module.css';

const Balance = () => {
  const dispatch = useDispatch();
  const balance = useSelector(getAuthBalance);
  const transactions = useSelector(selectTransactions);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch, transactions]);

  return (
    <div className={s.card}>
      <p className={s.title}>Ваш баланс</p>
      <p className={s.result}>&#8372; {balance}</p>
    </div>
  );
};

export default Balance;
