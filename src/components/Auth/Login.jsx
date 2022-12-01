import { Formik, Field, Form } from 'formik';
import s from './Login.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LoginApi } from 'redux/AuthRedux/operations';
import sprite from '../Navigation/sprite.svg';
import sp from './Auth.svg';
import login from '../../images/currency/login.png';
const Login = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.section}>
      <div className={s.aside}>
        <img src={login} alt="login" className={s.image} />
        <div className={s.widget}>
          <svg className={s.widget_svg}>
            <use href={`${sp}#Elipse1`}></use>
          </svg>
        </div>
        <h2 className={s.title}>Finance App</h2>
      </div>
      <div className={s.body}>
        <div className={s.sidebar}>
          <svg className={s.sidebar_svg}>
            <use href={`${sp}#Elipse`}></use>
          </svg>
        </div>
        <div className={s.box}>
          <div className={s.logo}>
            <svg className={s.logoSvg}>
              <use href={`${sprite}#icon-logo-full`}></use>
            </svg>
          </div>
          <Formik
            initialValues={{ password: '', email: '' }}
            onSubmit={e => {
              dispatch(LoginApi(e));
            }}
          >
            <Form className={s.form}>
              <label>
                <svg className={s.svg}>
                  <use href={`${sp}#email`}></use>
                </svg>
                <Field
                  name="email"
                  type="email"
                  required
                  className={s.field}
                  placeholder="E-mail"
                />
              </label>
              <label>
                <svg className={s.svg}>
                  <use href={`${sp}#password`}></use>
                </svg>
                <Field
                  name="password"
                  type="password"
                  required
                  className={s.field}
                  placeholder="Password"
                />
              </label>
              <button type="submit" className={s.button}>
                Log in
              </button>
              <NavLink to="/register" className={s.link}>
                Register
              </NavLink>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Login;
