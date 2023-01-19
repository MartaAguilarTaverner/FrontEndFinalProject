import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const token = useSelector((state) => state.user.token);

  let result = false;

  if (token !== '') {
    result = true;
  }

  return result;
};

export default function PrivateRoute() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/home" />;
}
