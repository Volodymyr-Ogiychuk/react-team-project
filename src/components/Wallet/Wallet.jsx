import { Suspense, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from 'react-router-dom';
import { Currency } from './Currency';
import Media from 'react-media';
import s from '../Navigation/Navigation.module.css';
import sprite from '../Navigation/sprite.svg';
import { useDispatch } from "react-redux";
import { getTransactions } from "redux/transactions/transactions-operations";


const mediaQueries = {
  response: '(max-width: 479px)',
  mobile: '(min-width: 480px) and (max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
};
const Wallet = () => {
const dispatch = useDispatch();
useEffect(() => {
  dispatch(getTransactions());
}, [dispatch]);
    return (
      <>
        <div>Wallet</div>
        <ul className={s.nav}>
          <li className={s.navItem}>
            <NavLink
              to="wallet/transactions"
              className={s.navLink}
              activeclassname={s.navLinkActive}
            >
              <div className={s.iconWrapper}>
                <svg className={s.svg}>
                  <use href={`${sprite}#icon-home`}></use>
                </svg>
              </div>
              <span className={s.navText}>Home</span>
            </NavLink>
          </li>
          <li className={s.navItem}>
            <NavLink
              to="wallet/statistics"
              className={s.navLink}
              activeclassname={s.navLinkActive}
            >
              <div className={s.iconWrapper}>
                <svg className={s.svg}>
                  <use href={`${sprite}#icon-statistic`}></use>
                </svg>
              </div>
              <span className={s.navText}>Statistics</span>
            </NavLink>
          </li>

          <Media queries={mediaQueries}>
            {matches =>
              (matches.mobile || matches.response) && (
                <li className={s.navItem}>
                  <NavLink
                    to="currency"
                    className={s.navLink}
                    activeclassname={s.navLinkActive}
                  >
                    <div className={s.iconWrapper}>
                      <svg className={s.svg}>
                        <use href={`${sprite}#icon-currency`}></use>
                      </svg>
                    </div>
                  </NavLink>
                </li>
              )
            }
          </Media>
        </ul>
        <Currency />
        <Suspense>
          <Outlet />
        </Suspense>
      </>
    );
  };
  
  export default Wallet;