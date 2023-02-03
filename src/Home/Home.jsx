import React, { useState, useEffect } from 'react';

import HomeTable from './components/HomeTable/HomeTable';

import useRentedSpaceHook from '../RentedSpace/hooks/rentedSpace.hook';

export default function Home() {
  const { getAllRentedSpaces } = useRentedSpaceHook();
  const [rentedSpaces, setRentedSpaces] = useState([]);

  const getRentedSpacesList = async () => {
    const rentedSpaceList = await getAllRentedSpaces();

    setRentedSpaces(rentedSpaceList.data);
  };

  useEffect(() => {
    getRentedSpacesList();
  }, []);

  return <HomeTable rentedSpaceList={rentedSpaces} type="list" />;
}
