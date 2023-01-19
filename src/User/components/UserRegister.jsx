import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { InputTextarea } from 'primereact/inputtextarea';
import { FileUpload } from 'primereact/fileupload';

import useUserHook from '../hooks';

import '../UserGeneral.css';

export default function FormRegister() {
  const { onSubmitRegister } = useUserHook();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(new Date());
  const [accept, setAccept] = useState();

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
        <div className="field">
          <span className="p-float-label w-full">
            <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
            <label htmlFor="name">name</label>
          </span>
        </div>
        <div className="field">
          <span className="p-float-label w-full">
            <InputText id="surname" value={surname} onChange={(e) => setSurname(e.target.value)} className="w-full" />
            <label htmlFor="surname">surname</label>
          </span>
        </div>
        <div className="field mt-4">
          <span className="p-float-label p-input-icon-right w-full">
            <i className="pi pi-envelope" />
            <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full" />
            <label htmlFor="email">Email</label>
          </span>
        </div>
        <div className="field mt-4">
          <span className="p-float-label p-input-icon-right w-full">
            <i className="pi pi-envelope" />
            <InputText id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full" />
            <label htmlFor="phone">Phone Number</label>
          </span>
        </div>
        <div className="field mt-4 w-full">
          <span className="p-float-label w-full">
            <Password id="password" className="w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="password">Password*</label>
          </span>
        </div>
        <div>
          <div className="card mt-4 w-full">
            <h5>Description</h5>
            <InputTextarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              cols={30}
              autoResize
            />
          </div>
        </div>
        <div className="field mt-4">
          <span className="p-float-label w-full">
            <Calendar
              id="birthDate"
              className="w-full"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              dateFormat="dd/mm/yy"
              mask="99/99/9999"
              showIcon
            />
            <label htmlFor="date">Birthday</label>
          </span>
        </div>
        <div className="card">
          <h5>Profile Pict</h5>
          <FileUpload
            mode="basic"
            name="demo[]"
            url="https://primefaces.org/primereact/showcase/upload.php"
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
          <Button label="Submit" className="mt-2" onClick={() => onSubmitRegister(name, email, password, birthDate)} />
        </div>
      </div>
    </div>
  );
}
