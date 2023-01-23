import React, { useCallback, useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { FileUpload } from 'primereact/fileupload';

import useUserHook from '../hooks';

import '../UserGeneral.css';

export default function ProfileModify() {
  const { id } = useParams();
  const token = useSelector((state) => state.user.token);
  const [userItem, setUserItem] = useState({});
  const { getUserById } = useUserHook();
  const [name, setName] = useState(userItem.name);
  const [surname, setSurname] = useState(userItem.surname);
  const [email, setEmail] = useState(userItem.email);
  const [phone, setPhone] = useState(userItem.phoneNumber);
  const [age, setAge] = useState(userItem.age);

  const getUser = useCallback(async () => {
    const result = await getUserById(token, id);
    setUserItem(result.data);
  }, [id, token]);

  useEffect(() => {
    getUser();
  }, [getUser]);

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

  return (
    <div className="flex justify-content-center align-items-center register-container">
      <div className="card register-form">
        <h5 className="text-center register-text">Register</h5>
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
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="field mt-3">
          <Password
            placeholder="Password"
            id="password"
            className="w-full display-flex justify-content-center"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
            Profile Pict
          </label>
          <FileUpload
            mode="basic"
            name="fileUpload"
            accept="image/*"
            customUpload
            uploadHandler={customBase64Uploader}
          />
        </div>
        <div className="field flex justify-content-center">
          <Button label="Submit" className="mt-2" onClick={() => onSubmitModifyUser} />
        </div>
      </div>
    </div>
  );
}
