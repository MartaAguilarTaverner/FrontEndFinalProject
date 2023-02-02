import React, { useState } from 'react';

import AdminMenu from './components/AdminMenu';
import AdminHomeType from './components/AdminHomeType/AdminHomeType';
import AdminRoomType from './components/AdminRoomType/AdminRoomType';
import AdminRentedSpace from './components/AdminRentedSpace/AdminRentedSpace';

export default function Admin() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <div>
        <AdminMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      <div>
        {activeIndex === 0 && <AdminHomeType />}
        {activeIndex === 1 && <AdminRoomType />}
        {activeIndex === 2 && <AdminRentedSpace />}
      </div>
    </>
  );
}
