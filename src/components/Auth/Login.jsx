import { Formik, Field, Form } from 'formik';
import s from './Login.module.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {  LoginApi } from 'redux/AuthRedux/operations';

const Login = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={s.box}>
        <h1>Wallet</h1>
        <Formik
          initialValues={{ password: '', email: '' }}
          onSubmit={e => {
            dispatch(LoginApi(e)); 
         
          }}
        >
          <Form className={s.form}>
            <Field
              name="email"
              type="email"
              required
              className={s.field}
              placeholder="E-mail"
            />
            <Field
              name="password"
              type="password"
              required
              className={s.field}
              placeholder="Password"
            />
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
