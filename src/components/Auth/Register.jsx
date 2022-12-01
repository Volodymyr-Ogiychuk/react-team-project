import { Formik, Field, Form } from 'formik';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { RegisterApi } from 'redux/AuthRedux/operations';
import sprite from '../Navigation/sprite.svg';
import sp from './Auth.svg';
import s from './Login.module.css';

const Register = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.box}>
      <div className={s.logo}>
        <svg className={s.logoSvg}>
          <use href={`${sprite}#icon-logo-full`}></use>
        </svg>
      </div>
      <Formik
        initialValues={{
          password: '',
          email: '',
          username: '',
          userpassword: '',
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={e => {
          const { email, username, password, userpassword } = e;
          if (password.length >= 6 && password.length <= 12 && username.length > 1 && username.length <= 12) {
            password === userpassword
              ? dispatch(RegisterApi({ email, username, password }))
              : console.log('The password does not match');
          }
          console.log("error");
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
          <label>
          <svg className={s.svg}>
              <use href={`${sp}#password`}></use>
            </svg>
            <Field
              name="userpassword"
              type="password"
              required
              className={s.field}
              placeholder="Confirm password"
            />
          </label>
          <label>
          <svg className={s.svg}>
              <use href={`${sp}#user`}></use>
            </svg>
            <Field
              name="username"
              type="username"
              required
              className={s.field}
              placeholder="First name"
            />
          </label>
          <button type="submit" className={s.button}>
            Register
          </button>
          <NavLink to="/login" className={s.link}>
            Log in
          </NavLink>
        </Form>
      </Formik>
    </div>
  );
};
export default Register;
