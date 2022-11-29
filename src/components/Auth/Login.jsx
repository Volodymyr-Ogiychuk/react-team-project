import { Formik, Field, Form } from 'formik';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LoginApi } from 'redux/AuthRedux/operations';
import { getAuthIsLoggedIn } from 'redux/AuthRedux/selectors';

const Login = () => {
  const dicpatch = useDispatch();
  const isLoggedIn = useSelector(getAuthIsLoggedIn);
  console.log(isLoggedIn);
  return (
    <div>
      <h1>Wallet</h1>
      <Formik
        initialValues={{ password: '', email: '' }}
        onSubmit={e => dicpatch(LoginApi(e))}
      >
        <Form>
          <Field name="email" type="email" required />
          <Field name="password" type="password" required />
          <button type="submit">Log in</button>
          <NavLink to="/register">Register</NavLink>
        </Form>
      </Formik>
    </div>
  );
};
export default Login;
