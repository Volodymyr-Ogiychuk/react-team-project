import { Formik, Field, Form } from 'formik';
import { NavLink, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { RegisterApi } from 'redux/AuthRedux/operations';

import s from './Login.module.css';

const Register = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className={s.box}>
      <h1>Wallet</h1>
      <Formik
        initialValues={{ password: '', email: '', username: '' }}
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
          const password = e.password;
          if (password.length > 6 && password.length < 12){
             dispatch(RegisterApi(e))
          } else{
            console.log("false")
          }
            navigate('/login');
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
          <Field
            name="password"
            type="password"
            required
            className={s.field}
            placeholder="Confirm password"
          />
          <Field
            name="username"
            type="username"
            required
            className={s.field}
            placeholder="First name"
          />
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
