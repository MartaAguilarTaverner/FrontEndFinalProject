import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';

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
  const [accept, setAccept] = useState(false);
  const [isFulfilled, setIsFulfilled] = useState(false);

  const submit = () => {
    const newUser = {
      name,
      surname,
      email,
      phoneNumber,
      password,
      age
    };

    onSubmitRegister(newUser);
  };

  useEffect(() => {
    if (name && surname && email && phoneNumber && password && age && accept) {
      setIsFulfilled(true);
    }
  }, [name, surname, email, phoneNumber, password, age, accept]);

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
