import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Card } from 'primereact/card';
import { Chips } from 'primereact/chips';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';

const UserProfile = () => {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const [userItem, setUserItem] = useState({});

  const getUser = useCallback(async () => {
    const result = await getUserById(token, id);
    setUserItem(result.data);
  }, [id, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const header = (
    <img
      alt="Card"
      value={userItem.profileImg}
      onClick="setState={newState}"
      onError={(e) => (e.target.src = '/public/profiledefault.png')}
    />
  );
  const footer = (
    <span>
      <Button label="Change" icon="pi pi-check" />
      <Button label="Save" icon="pi pi-times" className="p-button-secondary ml-2" />
    </span>
  );

  return (
    <Card className="profile-card">
      <div className="card p-fluid">
        <h5>Name</h5>
        <Chips value={userItem.name} />

        <h5>Surname</h5>
        <Chips value={userItem.surname} />

        <h5>Email</h5>
        <Chips value={userItem.email} />

        <h5>Phone Number</h5>
        <Chips value={userItem.phoneNumber} />

        <h5>Description</h5>
        <Chips value={userItem.description} />

        <h5>Birth Date</h5>
        <Chips value={userItem.birthDate} />
      </div>
    </Card>
  );
};

export default UserProfile;
