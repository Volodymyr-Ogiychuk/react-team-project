import { Formik, Field, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import register from '../../images/currency/register.png';
import { useDispatch } from 'react-redux';
import { RegisterApi } from 'redux/AuthRedux/operations';
import sprite from '../Navigation/sprite.svg';
import sp from './Auth.svg';
import s from './Login.module.css';
// import Media from 'react-media';

// import { getAuthError } from 'redux/AuthRedux/selectors';
import { useState } from 'react';
const Register = () => {
  const [chek, setChek] = useState();
  // eslint-disable-next-line
  // const error = useSelector(getAuthError);
  const dispatch = useDispatch();
  const handleSubmit = e => {
    const { email, username, password, userpassword } = e;
    if (
      password.length >= 6 &&
      password.length <= 12 &&
      username.length > 1 &&
      username.length <= 12
    ) {
      password === userpassword
        ? dispatch(RegisterApi({ email, username, password }))
        : console.log('The password does not match');
    } else {
      console.log('error');
    }
  };
  const handlePassword = e => {
    const good = { width: '100%', backgroundColor: '#24cca7' };
    const normally = { width: '45%', backgroundColor: 'orange' };
    const badly = { width: '25%', backgroundColor: 'red' };
    const refresh = { width: '0%', backgroundColor: '#E5F1EF' };
    if (e.length > 0 && e.length < 2) {
      setChek(refresh);
    }
    if (e.length > 3 && e.length < 5) {
      setChek(badly);
    }
    if (e.length >= 6 && e.length <= 8) {
      setChek(normally);
    }
    if (e.length >= 8 && e.length <= 12) {
      setChek(good);
    }
  };
  return (
    <div className={s.section}>
      <div className={s.aside}>
        <img src={register} alt="register" className={s.image} />
        <h2 className={s.title}>Finance App</h2>
      </div>
      <div className={s.body}>
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
            validate={({ password, userpassword, email }) => {
              if (userpassword.length === password.length) {
                handlePassword(userpassword);
              }
              const errors = {};
              if (!email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={handleSubmit}
          >
            <Form className={s.form}>
              <div className={s.inner}>
                <label form="email">
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
              </div>
              <div className={s.inner}>
                <label form="password">
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
              </div>
              <div className={s.inner}>
                <label form="password">
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
                  <div className={s.block_check}>
                    <div style={chek} className={s.check}></div>
                  </div>
                </label>
              </div>
              <div className={s.inner}>
                <svg className={s.svg}>
                  <use href={`${sp}#user`}></use>
                </svg>
                <label form="username">
                  <Field
                    name="username"
                    type="username"
                    required
                    className={s.field}
                    placeholder="First name"
                  />
                </label>
              </div>
              <button type="submit" className={s.button}>
                Register
              </button>
              <NavLink to="/login" className={s.link}>
                Log in
              </NavLink>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Register;
