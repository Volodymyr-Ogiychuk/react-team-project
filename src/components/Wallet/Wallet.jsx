import { Suspense, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Currency } from './Currency';
import Media from 'react-media';
import s from '../Navigation/Navigation.module.css';
import css from '../Wallet/Wallet.module.css';
import sprite from '../Navigation/sprite.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactions } from 'redux/transactions/transactions-operations';
import { AddTransactionBtn } from './AddTransactionBtn/AddTransactionBtn';
import { selectModalStatus } from 'redux/transactions/transactions-selectors';

export const mediaQueries = {
  response: '(max-width: 479px)',
  mobile: '(min-width: 480px) and (max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
};

const Wallet = () => {
  const isTransactionModalOpen = useSelector(selectModalStatus);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <>
      <section className={css.container}>
        <div className={css.bar}>
          <ul className={s.nav}>
            <li className={s.navItem}>
              <NavLink
                to="home"
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
                to="diagram"
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
          <Media queries={mediaQueries}>
            {matches => (matches.tablet || matches.desktop) && <Currency />}
          </Media>
        </div>
        <div>
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </section>
      <Media queries={mediaQueries}>
        {matches =>
          (matches.tablet || matches.desktop) && <AddTransactionBtn />
        }
      </Media>
      <Media queries={mediaQueries}>
        {matches =>
          (matches.mobile || matches.response) &&
          !isTransactionModalOpen && <AddTransactionBtn />
        }
      </Media>
    </>
  );
};

export default Wallet;
