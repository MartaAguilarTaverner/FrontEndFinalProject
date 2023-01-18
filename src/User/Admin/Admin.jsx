import { useState } from 'react';

import AdminMenu from './components/AdminMenu';
import AdminUsers from './components/AdminUsers';
import AdminReservations from './components/AdminReservatios';
import AdminRentedSpaces from './components/AdminRentedSpaces';
import AdminReviews from './components/AdminReviews';

const Admin = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div className="admin-header">
        <AdminMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      <div className="admin-content p-4">
        {activeIndex === 0 && <AdminUsers />}
        {activeIndex === 1 && <AdminRentedSpaces />}
        {activeIndex === 2 && <AdminReservations />}
        {activeIndex === 3 && <AdminReviews />}
      </div>
    </>
  );
};

export default Admin;
