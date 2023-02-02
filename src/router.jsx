import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from './App';
import Home from './Home/Home';
import UserLogin from './User/Login';
import UserRegister from './User/Register';
import UserProfile from './User/Profile';
import Admin from './User/Admin/Admin';
import AdminGeneralUser from './User/Admin/components/AdminGeneralUser';
import AdminReview from './User/Admin/components/AdminReview/AdminNewReview';
import AdminReservation from './User/Admin/components/AdminReservation/AdminReservation';
import UserReservations from './Reservation/components/UserReservations/UserReservations';

import PrivateRoute from './GeneralComponents/routes/PrivateRoute';
import AdminRoute from './GeneralComponents/routes/AdminRoute';
import OwnerRoute from './GeneralComponents/routes/OwnerRoute';
import SpaceRegister from './RentedSpace/RentedSpaceRegister';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<Home />} />
      {/* <Route path="/maps" element={<HomeMaps />} /> */}
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile/:id" element={<UserProfile />} />
        {/* <Route path="/reservation" element={<ReservePlace />} /> */}
        <Route path="/reservation" element={<UserReservations />} />
        <Route path="/register-space" element={<SpaceRegister />} />
      </Route>
      <Route element={<OwnerRoute />}>
        {/* <Route path="/your-place" element={<YourPlace />} /> */}
        {/* <Route path="/modifyplace" element={<ModifyYourPlace />} /> */}
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/user-list" element={<AdminGeneralUser />} />
        <Route path="/reservation-list" element={<AdminReservation />} />
        <Route path="/review-list" element={<AdminReview />} />
      </Route>
    </Route>
  )
);

export default router;
