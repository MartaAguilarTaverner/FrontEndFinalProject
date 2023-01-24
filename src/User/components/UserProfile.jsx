import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Image } from 'primereact/image';

import useUserHook from '../hooks';

export default function UserProfile() {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [profileImg, setProfileImg] = useState('/profiledefault.png');
  const [editMode, setEditMode] = useState(false);
  const { getUserById } = useUserHook();

  const getUser = useCallback(async () => {
    const result = await getUserById(token, id);
    setName(result.data.name);
    setSurname(result.data.surname);
    setEmail(result.data.email);
    setPhoneNumber(result.data.phoneNumber);
    setProfileImg(result.data.profileImg);
    setAge(result.data.age);
  }, [id, token]);

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    const blob = await fetch(file.objectURL).then((r) => r.blob()); // blob:url
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      console.log(base64data);
    };
  };

  useEffect(() => {
    getUser();

    const profileButtonEl = document.getElementById('profile-button');

    profileButtonEl.firstChild.addEventListener('click', () => {});
  }, [getUser]);

  const revertChanges = () => {
    setEditMode(!editMode);

    if (editMode) {
      getUser();
    }
  };

  const saveChanges = () => {
    setEditMode(!editMode);

    if (!editMode) {
      getUser();
    }
  };

  return (
    <div className="flex justify-content-center align-items-center profile-container">
      <div className="card profile-form m-2">
        <h5 className="text-center profile-text">Profile</h5>
        <Image
          placeholder="profileImg"
          id="profile-button"
          value={profileImg}
          src="/profiledefault.png"
          alt="Image"
          width="100"
        />
        <div className="grid p-1 p-fluid-inputgroup display-flex justify-content-around">
          <div className="col-6">
            <InputText
              placeholder="name"
              id="name"
              value={name}
              className="w-full"
              disabled={!editMode}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="col-6">
            <InputText
              placeholder="surname"
              id="surname"
              value={surname}
              className="w-full"
              disabled={!editMode}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
        </div>
        <div className="grid p-1p-fluid-inputgroup display-flex justify-content-around">
          <div className="col-6">
            <InputText
              placeholder="email"
              id="email"
              value={email}
              className="w-full"
              disabled={!editMode}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-6 justify-content-center">
            <InputText
              placeholder="phone"
              id="phone"
              value={phoneNumber}
              className="w-full"
              disabled={!editMode}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 flex justify-content-center">
          <InputText
            placeholder="age"
            id="age"
            value={age}
            className=""
            disabled={!editMode}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <div className="field flex justify-content-center">
          <Button label={editMode ? 'Cancel' : 'Change'} className="mt-2" onClick={() => revertChanges()} />
          {editMode ? <Button label="Save" className="mt-2" onClick={() => saveChanges()} /> : null}
        </div>
      </div>
    </div>
  );
}
