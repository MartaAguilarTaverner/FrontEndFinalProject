import React, { useState, useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';

import useRentedSpaceHook from '../../hooks/rentedSpace.hook';

export default function RentspaceRegister() {
  const { onSubmitSpaceregister } = useRentedSpaceHook();
  const [title, setTitle] = useState('');
  const [maxPersons, setMaxPersons] = useState(0);
  const [numBedrooms, setNumBedrooms] = useState(0);
  const [numBathrooms, setNumBathrooms] = useState(0);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [tv, setTv] = useState(false);
  const [kitchen, setKitchen] = useState(false);
  const [airconditioner, setAirconditioner] = useState(false);
  const [heating, setHeating] = useState(false);
  const [internet, setInternet] = useState(false);
  const [price, setPrice] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isFulfilled, setIsFulfilled] = useState(false);

  const submit = () => {
    const newRentedSpace = {
      title,
      maxPersons,
      numBedrooms,
      numBathrooms,
      description,
      address,
      tv,
      kitchen,
      airconditioner,
      heating,
      internet,
      price,
      latitude,
      longitude
    };

    onSubmitSpaceregister(newRentedSpace);
  };

  useEffect(() => {
    if (
      title &&
      maxPersons &&
      numBedrooms &&
      numBathrooms &&
      description &&
      address &&
      tv &&
      kitchen &&
      airconditioner &&
      heating &&
      internet &&
      price &&
      latitude &&
      longitude
    ) {
      setIsFulfilled(true);
    }
  }, [
    title,
    maxPersons,
    numBedrooms,
    numBathrooms,
    description,
    address,
    tv,
    kitchen,
    airconditioner,
    heating,
    internet,
    price,
    latitude,
    longitude
  ]);

  const setTest = (value) => {
    console.log('🚀 ~ file: rentedSpaceRegister.jsx:87 ~ setTest ~ value', value);
  };

  return (
    <div className="flex justify-content-center align-items-center register-container">
      <div className="card register-form">
        <h5 className="text-center register-text">Regist your Space</h5>
        <div className="field">
          <label htmlFor="Title" className='"block'>
            Title
          </label>
          <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
        </div>
        <div className="p-fluid grid formgrid display-flex justify-content-around">
          <div className="col-12 md:col-3">
            <label htmlFor="maxPersons">Max Persons</label>
            <InputNumber
              inputId="integeronly"
              value={maxPersons}
              onValueChange={(e) => setMaxPersons(e.target.value)}
              min={0}
              max={10}
            />
          </div>
          <div className="col-12 md:col-3">
            <label htmlFor="numBedrooms">Bedrooms</label>
            <InputNumber
              inputId="integeronly"
              value={numBedrooms}
              onValueChange={(e) => setNumBedrooms(e.target.value)}
              min={0}
              max={10}
            />
          </div>
          <div className="col-12 md:col-3">
            <label htmlFor="numBathrooms">Bathrooms</label>
            <InputNumber
              inputId="integeronly"
              value={numBathrooms}
              onValueChange={(e) => setNumBathrooms(e.target.value)}
              min={0}
              max={10}
            />
          </div>
        </div>
        <div className="field">
          <label htmlFor="description" className="block pt-3">
            Description
          </label>
          <InputTextarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={30}
            className="w-full"
          />
        </div>
        <div className="p-fluid grid formgrid display-flex justify-content-around">
          <div className="field-checkbox col-12 md:col-2">
            <Checkbox inputId="tv" value="TV" checked={tv} onChange={(e) => setTv(e.checked)} />
            <label htmlFor="binary">TV</label>
          </div>
          <div className="field-checkbox col-12 md:col-2">
            <Checkbox inputId="kitchen" value={kitchen} onChange={(e) => setKitchen(e.target.value)} />
            <label htmlFor="binary">Kitchen</label>
          </div>
          <div className="field-checkbox col-12 md:col-2">
            <Checkbox inputId="internet" value={internet} onChange={(e) => setInternet(e.target.value)} />
            <label htmlFor="binary">Internet</label>
          </div>
          <div className="field-checkbox col-12 md:col-2">
            <Checkbox
              inputId="airconditioner"
              value={airconditioner}
              onChange={(e) => setAirconditioner(e.target.value)}
            />
            <label htmlFor="binary">Airconditioner</label>
          </div>
          <div className="field-checkbox col-12 md:col-2">
            <Checkbox inputId="heating" value={heating} onChange={(e) => setHeating(e.target.value)} />
            <label htmlFor="binary">Heating</label>
          </div>
        </div>
        <div className="grid p-fluid-inputgroup display-flex justify-content-around">
          <div className="col-6">
            <InputText
              placeholder="Address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <InputText
              placeholder="latitude"
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="col-2">
            <InputText
              placeholder="longitude"
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="field flex justify-content-center">
          <Button label="Submit" className="mt-2" disabled={!isFulfilled} onClick={submit} />
        </div>
      </div>
    </div>
  );
}
