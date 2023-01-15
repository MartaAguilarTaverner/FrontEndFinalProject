import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from './App';
import Home from './Home/Home';
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
        <Route path="/" element={<Home />} />
        <Route path="/maps" element={<HomeMaps />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/reservation" element={<ReservePlace />} />
          <Route path="/trips" element={<Trips />} />
          <Route path="/tripcompleted" element={<Opinion />} />
          <Route path="/registplace" element={<RegisPlace />} />
        </Route>
        <Route element={<OwnerRoute />}>
          <Route path="/yourplace" element={<YourPlace />} />
          <Route path="/modifyplace" element={<ModifyYourPlace />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/administration" element={<Admin />} />
        </Route>
      </Route>
    </>
  )
);

export default router;
