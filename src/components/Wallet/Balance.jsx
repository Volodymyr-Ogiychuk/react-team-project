import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTransactions } from 'redux/transactions/transactions-selectors';
import { getAuthBalance } from '../../redux/AuthRedux/selectors';
import s from './Balance.module.css';
import { useState } from 'react';

const Balance = () => {
  const loginBalance = useSelector(getAuthBalance);
  const transactions = useSelector(selectTransactions);
  const [balance, setBalance] = useState(loginBalance);
  const transactionBalance = transactions[transactions.length - 1]?.balanceAfter;
 
  useEffect(() => {
    if (transactionBalance) setBalance(transactionBalance);
  }, [transactionBalance]);

  return (
    <div className={s.card}>
      <p className={s.title}>Ваш баланс</p>
      <p className={s.result}>&#8372; {balance}</p>
    </div>
  );
};

export default Balance;
