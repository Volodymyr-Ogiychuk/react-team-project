import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const Navigation = () => {
  return (
    <>
      <NavLink to="register">Register</NavLink>
      <NavLink to="login">Login</NavLink>

      <Suspense>
      <Outlet/>
      </Suspense>
    </>
  );
};
export default Navigation;
