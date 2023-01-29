import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import useRoomTypeHook from '../RentedSpace/RoomType/hooks/roomType.hook';

import HomeTable from './components/HomeTable/HomeTable';

export default function Home() {
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.id);
  const { deleteRoomType } = useRoomTypeHook();

  const genericTestAPI = useCallback(async () => {
    const roomType = {
      name: 'Test Create'
    };

    await deleteRoomType(token, userId, 4);
  }, []);

  useEffect(() => {
    if (token !== '') {
      genericTestAPI();
    }
  }, []);
  return <div>THIS IS HOME</div>;
}
