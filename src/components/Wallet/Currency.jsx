import s from '../Wallet/Currency.module.css';
import { useState, useEffect } from 'react';

export const Currency = () => {

    const [USD, setUSD] = useState({ buy: 0.00, sale: 0.00 });
    const [EUR, setEUR] = useState({ buy: 0.00, sale: 0.00 });
    const RUB = { buy: "00.00", sale: "00.00" };

  function fetchCurrencyAPI() {
    return (
      fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5').then((response) => response.json())
        .then((data) => data).catch(e => e.message));
  };

  useEffect(() => {
    fetchCurrencyAPI().then((data) => {
      
      setEUR({ buy: Number(data[0].buy).toFixed(2), sale: Number(data[0].sale).toFixed(2)});
      setUSD({ buy: Number(data[1].buy).toFixed(2), sale: Number(data[1].sale).toFixed(2) });
      
      })  
    }, [])


    return (
        <div className={s.container}>
            <ul className={s.list}>
                <li className={s.item}>
                    <span className={s.title}>Currency</span>
                    <span className={s.currency}>USD</span>
                    <span className={s.currency}>EUR</span>
                    <span className={s.currency}>RUB</span>

                </li>
                <li className={s.item}>
                    <span className={s.title}>Purchase</span>
                    <span className={s.currency}>{USD.buy}</span>
                    <span className={s.currency}>{EUR.buy}</span>
                    <span className={s.currency}>{RUB.buy}</span>
                </li>
                <li className={s.item}>
                    <span className={s.title}>Sale</span>
                    <span className={s.currency}>{USD.sale}</span>
                    <span className={s.currency}>{EUR.sale}</span>
                    <span className={s.currency}>{RUB.sale}</span>
                </li>
            </ul>
        
        </div>
)
}

