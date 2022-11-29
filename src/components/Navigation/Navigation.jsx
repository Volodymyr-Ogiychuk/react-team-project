import Media from 'react-media';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';
import sprite from './sprite.svg';
// import { Outlet } from 'react-router-dom';
// import { Suspense } from 'react';

const mediaQueries = {
  response: '(max-width: 479px)',
  mobile: '(min-width: 480px) and (max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1279px)',
  desktop: '(min-width: 1280px)',
};

const Navigation = () => {
  return (
  
    <ul className={s.nav}>
      <li className={s.navItem}>
        <NavLink
          exact
          to="/"
          className={s.navLink}
          activeClassName={s.navLinkActive}
        >
          <div className={s.iconWrapper}>
            <svg className={s.svg}>
              <use href={`${sprite}#icon-home`}></use>
            </svg>
          </div>
          <span className={s.navText}>Главная</span>
        </NavLink>
      </li>
      <li className={s.navItem}>
        <NavLink
          to="statistics"
          className={s.navLink}
          activeClassName={s.navLinkActive}
        >
          <div className={s.iconWrapper}>
            <svg className={s.svg}>
              <use href={`${sprite}#icon-statistic`}></use>
            </svg>
          </div>
          <span className={s.navText}>Статистика</span>
        </NavLink>
      </li>

      <Media queries={mediaQueries}>
        {matches =>
          (matches.mobile || matches.response) && (
            <li className={s.navItem}>
              <NavLink
                to="currency"
                className={s.navLink}
                activeClassName={s.navLinkActive}
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
    // <>
    //   {/* <NavLink to="register">Register</NavLink>
    //   <NavLink to="login">Login</NavLink> */}

    //   <Suspense>
    //     <Outlet />
    //   </Suspense>
    // </>
  );
};
export default Navigation;
