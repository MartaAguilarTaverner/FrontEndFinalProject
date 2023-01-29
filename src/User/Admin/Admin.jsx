import React, { useState } from 'react';

import AdminMenu from './components/AdminMenu';

export default function Admin() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div>
        <AdminMenu />
      </div>
      <div>
        {/*         {activeIndex === 0 && <AdminUser />}
        {activeIndex === 1 && <AdminRentedSpace />}
        {activeIndex === 2 && <AdminReservation />}
        {activeIndex === 3 &&} */}
      </div>
    </>
  );
}
