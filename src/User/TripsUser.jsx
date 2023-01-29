import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GetAllTripsUser() {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
}
