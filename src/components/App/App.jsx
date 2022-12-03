import React from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Media from 'react-media';
import Navigation from 'components/Navigation/Navigation';
import { Currency } from 'components/Wallet/Currency';

import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

// import { getIsFetchingCurrent } from 'redux/store';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from 'redux/AuthRedux/operations';
// import { fetchCurrentUser } from 'redux/operations/operations';
// eslint-disable-next-line
import css from './App.module.css';



const Register = lazy(() => import('../Auth/Register'));
const Login = lazy(() => import('../Auth/Login'));
const Wallet = lazy(() => import('../Wallet/Wallet'));
const Statistics = lazy(() => import('../Wallet/Statistics'));
const Transactions = lazy(() => import('../Wallet/Transactions'));

export const App = () => {
  const dispatch = useDispatch();
  // const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    // !isFetchingCurrentUser && (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route
          index
          element={
            <PublicRoute restricted redirectTo="/wallet/home">
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute restricted>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute restricted redirectTo="/wallet/home">
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/wallet"
          element={
            <PrivateRoute>
              <Wallet />
            </PrivateRoute>
          }
        >
          <Route
            path="diagram"
            element={
                <Statistics />
            }
          />
          <Route
            path="home"
            element={
                <Transactions />
            }
          />
          <Route
            path="currency"
            element={
              <Media query="(max-width: 767px)" render={() => <Currency />} />
            }
          />
        </Route>
      </Route>
    </Routes>
    // )
  );
};
