import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from './App';
import Login from './User/Login';
import Register from './User/Register';
import Profile from './User/Profile';
import Admin from './User/Admin/Admin';

import PrivateRoute from './components/Routes/PrivateRoute';
import AdminRoute from './components/Routes/AdminRoute';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route element={<PrivateRoute />}></Route>
        <Route element={<AdminRoute />}>
          <Route path="/administration" element={<Admin />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
