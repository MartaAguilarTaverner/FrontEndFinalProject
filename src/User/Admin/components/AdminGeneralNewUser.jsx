import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Buffer } from 'buffer';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { FileUpload } from 'primereact/fileupload';
import { Checkbox } from 'primereact/checkbox';

import useUserHook from '../../hooks';

export default function AdminGeneralNewUser({ opened, setOpened, userItem }) {
  const { createUser } = useUserHook();

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(new Date());
  const [profileImg, setProfileImg] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const addUser = async () => {
    const newUser = {
      name,
      surname,
      email,
      phoneNumber,
      password,
      age,
      profileImg,
      isAdmin
    };

    await createUser(newUser);

    setOpened(false);
  };

  const updateUser = async () => {
    console.log('YAY!');

    setOpened(false);
  };

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const file = event.files[0];
    const reader = new FileReader();
    const blob = await fetch(file.objectURL).then((r) => r.blob()); // blob:url
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      const base64data = reader.result;
      setProfileImg(base64data);
    };
  };

  const productDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setOpened(false)} />
      <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={userItem ? updateUser : addUser} />
    </>
  );

  useEffect(() => {
    if (userItem) {
      setName(userItem.name);
      setSurname(userItem.surname);
      setEmail(userItem.email);
      setPhoneNumber(userItem.phoneNumber);
      setAge(new Date(userItem.age));
      setProfileImg(Buffer.from(userItem.profileImg).toString('base64'));
      setIsAdmin(userItem.isAdmin);
    }
  }, [userItem]);

  return (
    <Dialog
      visible={opened}
      style={{ width: '450px' }}
      header={userItem ? 'Update user' : 'Create user'}
      modal
      className="p-fluid"
      footer={productDialogFooter}
      onHide={() => setOpened(false)}
    >
      <div className="grid p-fluid-inputgroup display-flex justify-content-around">
        <div className="col-6">
          <InputText
            placeholder="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="col-6">
          <InputText
            placeholder="surname"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="grid p-fluid-inputgroup display-flex justify-content-around">
        <div className="col-6">
          <InputText
            placeholder="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="col-6">
          <InputText
            placeholder="phone"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="field mt-3">
        {!userItem && (
          <Password
            placeholder="Password"
            id="password"
            className="w-full display-flex justify-content-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
      </div>
      <div className="field mt-4">
        <span className="p-float-label w-full">
          <Calendar
            id="age"
            className="w-full"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            showIcon
          />
          <label className="text-black-alpha-90 font-bold" htmlFor="date">
            Birthday
          </label>
        </span>
      </div>
      <div className="display-flex justify-content-center">
        <label className="text-black-alpha-90 font-bold" htmlFor="profilePict">
          Profile Image
        </label>
        {userItem && <img src={userItem.profileImg} alt="profile" />}
        <FileUpload mode="basic" name="fileUpload" accept="image/*" customUpload uploadHandler={customBase64Uploader} />
      </div>
      <div className="field mt-4">
        <Checkbox inputId="isAdmin" name="isAdmin" checked={isAdmin} onChange={(e) => setIsAdmin(e.checked)} />
        <label htmlFor="isAdmin">Is Admin?</label>
      </div>
    </Dialog>
  );
}

AdminGeneralNewUser.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  userItem: PropTypes.oneOfType([null, PropTypes.object]).isRequired
};
