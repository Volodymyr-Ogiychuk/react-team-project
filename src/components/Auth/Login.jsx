import { Formik, Field, Form } from 'formik';
import s from './Login.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LoginApi } from 'redux/AuthRedux/operations';
import sprite from '../Navigation/sprite.svg';
import sp from './Auth.svg';
const Login = () => {
  const dispatch = useDispatch();

  return (
    <>
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
            <svg className={s.email}>
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
             <svg className={s.email}>
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
    </>
  );
};
export default Login;
