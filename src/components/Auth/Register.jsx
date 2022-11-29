import { Formik, Field, Form } from "formik";
import { NavLink } from 'react-router-dom';
const Register = () => {

  return (
    <div>
    <h1>Wallet</h1>
      <Formik
        initialValues={{ password: '', email: '' }}
      >
        <Form>
        <Field name="email" type="email" required/>
          <Field name="password" type="password" required/>
          <Field name="password" type="password" required/>
          <Field name="name" type="name" required/>
          <button type="submit">Register</button>
          <NavLink to="/login">Log in</NavLink>
        </Form>
      </Formik>
    </div>
  );
};
export default Register;
