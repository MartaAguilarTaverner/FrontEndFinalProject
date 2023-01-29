import React, { useState } from 'react';

import AdminMenu from './components/AdminMenu';
import AdminHomeType from './components/AdminHomeType/AdminNewHomeType';

export default function Admin() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div>
        <AdminMenu />
      </div>
      {/*       <div>
        {activeIndex === 0 && <AdminHomeType />}
        {activeIndex === 1 && <AdminRentedSpace />} 
        {activeIndex === 2 && <AdminReservation />} 
        {activeIndex === 3 &&} 
      </div> */}
    </>
  );
}
