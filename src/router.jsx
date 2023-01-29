import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

import App from './App';
import Home from './Home/Home';
import UserLogin from './User/Login';
import UserRegister from './User/Register';
import UserProfile from './User/Profile';
import Admin from './User/Admin/Admin';
import AdminGeneralUser from './User/Admin/components/AdminGeneralUser';

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
        {/* <Route path="/trips" element={<Trips />} /> */}
        <Route path="/register-space" element={<SpaceRegister />} />
      </Route>
      <Route element={<OwnerRoute />}>
        {/* <Route path="/your-place" element={<YourPlace />} /> */}
        {/* <Route path="/modifyplace" element={<ModifyYourPlace />} /> */}
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/user-list" element={<AdminGeneralUser />} />
        {/* <Route path="/owneruser" element={<AdminOwnerUser />} /> */}
        {/* <Route path="/adminuser" element={<AdminadminUser />} /> */}
        {/* <Route path="/rentedspace" element={<AdminRentedSpace />} /> */}
        {/* <Route path="/hometype" element={<AdminHomeType />} /> */}
        {/* <Route path="/roomtype" element={<AdminRoomtype />} /> */}
        {/* <Route path="/spacemedia" element={<AdminSpaceMedia />} /> */}
        {/* <Route path="/reservation" element={<AdminReservation />} /> */}
        {/* <Route path="/review" element={<AdminReview />} /> */}
      </Route>
    </Route>
  )
);

export default router;
