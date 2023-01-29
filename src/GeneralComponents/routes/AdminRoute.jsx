import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const isAdmin = useSelector((state) => state.user.isAdmin);
  const token = useSelector((state) => state.user.token);

  let result = false;

  if (isAdmin && token !== '') {
    result = true;
  }

  return result;
};

export default function AdminRoute() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/" />;
}
