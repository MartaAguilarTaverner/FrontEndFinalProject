import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
  const isOwner = useSelector((state) => state.user.isOwner);
  const token = useSelector((state) => state.user.token);

  let result = false;

  if (isOwner && token !== '') {
    result = true;
  }

  return result;
};

export default function AdminRoute() {
  const auth = useAuth();

  return auth ? <Outlet /> : <Navigate to="/home" />;
}
