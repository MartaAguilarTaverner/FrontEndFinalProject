import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { FileUpload } from 'primereact/fileupload';

import useUserHook from '../hooks';

import '../UserGeneral.css';

export default function FormRegister() {
  const { onSubmitRegister } = useUserHook();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState(new Date());
  const [profileImg, setProfileImg] = useState(null);
  const [accept, setAccept] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);

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

  const submit = () => {
    const newUser = {
      name,
      surname,
      email,
      phoneNumber,
      password,
      age,
      profileImg
    };

    onSubmitRegister(newUser);
  };

  useEffect(() => {
    console.log(name, surname, email, phoneNumber, password, age, profileImg, accept);

    if (name && surname && email && phoneNumber && password && age && profileImg && accept) {
      setIsFulfilled(true);
    }
  }, [name, surname, email, phoneNumber, password, age, profileImg, accept]);

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
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
        <div className="field-checkbox mt-2">
          <Checkbox inputId="accept" name="accept" checked={accept} onChange={(e) => setAccept(e.checked)} />
          <label htmlFor="accept">I agree to the terms and conditions*</label>
        </div>
        <div className="field flex justify-content-center">
          <Button label="Submit" className="mt-2" disabled={!isFulfilled} onClick={submit} />
        </div>
      </div>
    </div>
  );
}
