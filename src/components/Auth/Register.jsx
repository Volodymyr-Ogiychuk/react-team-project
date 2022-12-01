import { Formik, Field, Form } from 'formik';
import { NavLink } from 'react-router-dom';
import register from '../../images/currency/register.png';
import { useDispatch } from 'react-redux';
import { RegisterApi } from 'redux/AuthRedux/operations';
import sprite from '../Navigation/sprite.svg';
import sp from './Auth.svg';
import s from './Login.module.css';

const Register = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.section}>
       <div className={s.aside}>
        <img src={register} alt="register" className={s.image} />
        <h2 className={s.title}>Finance App</h2>
      </div>
      <div className={s.widget}>
        <svg className={s.widget_svg}>
          <use href={`${sp}#Elipse1`}></use>
        </svg>
      </div>
      <div className={s.sidebar}>
        <svg className={s.sidebar_svg}>
          <use href={`${sp}#Elipse`}></use>
        </svg>
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
            <div className={s.block_check}></div>
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
    </div>
    </div>
  );
};
export default Register;
