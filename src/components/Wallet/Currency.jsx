import s from '../Wallet/Currency.module.css';
import { useState, useEffect } from 'react';
import CurrencyLoader from './CurrencyLoader';
import axios from "axios";

export const Currency = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [USD, setUSD] = useState({ buy: 0.00, sale: 0.00 });
  const [EUR, setEUR] = useState({ buy: 0.00, sale: 0.00 });
  const [PLN, setPLN] = useState({ buy: 0.00, sale: 0.00 });
  const [dateFetching, setDateFetching] = useState(0);

  
  const fetchCurrencyAPI = async () => {
    
    try {
      const response = await axios.get('https://api.monobank.ua/bank/currency');
      const data = response.data;
      return data;
    } catch (e) {
      return e.message;
    }
  };

  function getCurrencies() {
    fetchCurrencyAPI().then((data) => {
      console.log('FETCHING!!!!!!');
      const usdBuy = data[0].rateBuy;
      const usdSale = data[0].rateSell;
      const eurBuy = data[1].rateBuy;
      const eurSale = data[1].rateSell;
      const plnBuy = data[82].rateCross;
      const plnSale = data[82].rateCross;

      setEUR({ buy: eurBuy, sale: eurSale });
      setUSD({ buy: usdBuy, sale: usdSale });
      setPLN({ buy: plnBuy, sale: plnSale });
      setDateFetching(Date.now());
    })
    .catch(err => err.message)
        .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    
    setIsLoading(true);
    
    if (!localStorage.getItem('currencies')) {
      getCurrencies();
     
    } else {
      const storage = JSON.parse(localStorage.getItem('currencies'));
      console.log('storage', storage);
      if ((storage.dateFetching !== 0) && (storage.dateFetching - Date.now() <= 3600000)) {
        console.log('Time limit not reached, writing info from Local to hooks');
        setUSD(storage.USD);
        setEUR(storage.EUR);
        setPLN(storage.PLN);
        setIsLoading(false);
      }
      getCurrencies();
    }
    // eslint-disable-next-line
  }, []);
  
  localStorage.setItem('currencies', JSON.stringify({EUR, USD, PLN, dateFetching}));      

    return (
      <div className={s.container}>
        {isLoading ? <div className={s.loader}><CurrencyLoader /></div> : 
            <ul className={s.list}>
                <li className={s.item}>
                    <span className={s.title}>Currency</span>
                    <span className={s.currency}>USD</span>
                    <span className={s.currency}>EUR</span>
                    <span className={s.currency}>PLN</span>

                </li>
                <li className={s.item}>
                    <span className={s.title}>Purchase</span>
                    <span className={s.currency}>{Number(USD.buy).toFixed(2)}</span>
                    <span className={s.currency}>{Number(EUR.buy).toFixed(2)}</span>
                    <span className={s.currency}>{Number(PLN.buy).toFixed(2)}</span>
                </li>
                <li className={s.item}>
                    <span className={s.title}>Sale</span>
                    <span className={s.currency}>{Number(USD.sale).toFixed(2)}</span>
                    <span className={s.currency}>{Number(EUR.sale).toFixed(2)}</span>
                    <span className={s.currency}>{Number(PLN.sale).toFixed(2)}</span>
                </li>
          </ul>
        }
        
        </div>
)
}
