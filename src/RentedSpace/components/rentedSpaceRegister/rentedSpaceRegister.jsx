import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import useRentedSpaceHook from '../../hooks/rentedSpace.hook';

import './rentedSpaceRegister.scss';

export default function RentspaceRegister() {
  const { createRentedSpace, getDropdownValues } = useRentedSpaceHook();
  const userId = useSelector((state) => state.user.id);
  const token = useSelector((state) => state.user.token);

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
  const [homeType, setHomeType] = useState(0);
  const [homeTypeDropdown, setHomeTypeDropdown] = useState([]);
  const [roomType, setRoomType] = useState(0);
  const [roomTypeDropdown, setRoomTypeDropdown] = useState([]);
  const [mediaList, setMediaList] = useState([]);
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
      homeTypeId: homeType,
      roomTypeId: roomType,
      mediaList
    };

    createRentedSpace(token, userId, newRentedSpace);
  };

  useEffect(() => {
    if (
      title &&
      maxPersons &&
      numBedrooms &&
      numBathrooms &&
      description &&
      address &&
      price &&
      roomType &&
      homeType &&
      mediaList.length >= 3
    ) {
      setIsFulfilled(true);
    }
  }, [title, maxPersons, numBedrooms, numBathrooms, description, address, price, roomType, homeType, mediaList]);

  const transformDropdownValues = async () => {
    const { homeTypeList, roomTypeList } = await getDropdownValues();

    setHomeTypeDropdown(homeTypeList);
    setRoomTypeDropdown(roomTypeList);
  };

  useEffect(() => {
    transformDropdownValues();
  }, []);

  const customBase64Uploader = async (event) => {
    // convert file to base64 encoded
    const { files } = event;
    const resultPromises = files.map((file) => fetch(file.objectURL).then((r) => r.blob()));

    const result = await Promise.all(resultPromises);

    result.forEach((blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        const base64data = reader.result;

        setMediaList((oldMediaList) => [...oldMediaList, base64data]);
      };
    });
  };

  return (
    <div className="flex justify-content-center align-items-center register-container">
      <div className="card registerplace-form">
        <h5 className="text-center register-text">Regist your Space</h5>
        <div className="field">
          <label htmlFor="Title" className='"block'>
            Title
          </label>
          <InputText id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full" />
        </div>
        <div className="p-fluid grid formgrid display-flex justify-content-between mb-3">
          <div className="col-12 md:col-6">
            <label htmlFor="home-type">Home Type</label>
            <Dropdown
              value={homeType}
              options={homeTypeDropdown}
              onChange={(e) => setHomeType(e.value)}
              placeholder="Select a home type"
            />
          </div>
          <div className="col-12 md:col-6">
            <label htmlFor="room-type">Room Type</label>
            <Dropdown
              value={roomType}
              options={roomTypeDropdown}
              onChange={(e) => setRoomType(e.value)}
              placeholder="Select a room type"
            />
          </div>
        </div>
        <div className="p-fluid grid formgrid display-flex justify-content-between">
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
        <div className="p-fluid grid formgrid display-flex justify-content-between">
          <div className="field-checkbox col-4 md:col-2">
            <Checkbox inputId="tv" value="TV" checked={tv} onChange={(e) => setTv(e.checked)} />
            <label htmlFor="binary">TV</label>
          </div>
          <div className="field-checkbox col-4 md:col-2">
            <Checkbox inputId="kitchen" value={kitchen} checked={kitchen} onChange={(e) => setKitchen(e.checked)} />
            <label htmlFor="binary">Kitchen</label>
          </div>
          <div className="field-checkbox col-4 md:col-2">
            <Checkbox inputId="internet" value={internet} checked={internet} onChange={(e) => setInternet(e.checked)} />
            <label htmlFor="binary">Internet</label>
          </div>
          <div className="field-checkbox col-4 md:col-2">
            <Checkbox
              inputId="airconditioner"
              value={airconditioner}
              checked={airconditioner}
              onChange={(e) => setAirconditioner(e.checked)}
            />
            <label htmlFor="binary">Airconditioner</label>
          </div>
          <div className="field-checkbox col-4 md:col-2">
            <Checkbox inputId="heating" value={heating} checked={heating} onChange={(e) => setHeating(e.checked)} />
            <label htmlFor="binary">Heating</label>
          </div>
        </div>
        <div className="grid p-fluid-inputgroup display-flex justify-content-between">
          <div className="col-6">
            <label htmlFor="binary">Address:</label>
            <InputText
              placeholder="Address"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="col-3">
            <label htmlFor="binary">Price:</label>
            <InputText
              placeholder="Price"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        <div className="grid p-fluid-inputgroup display-flex justify-content-center">
          <FileUpload mode="basic" name="media[]" multiple auto customUpload uploadHandler={customBase64Uploader} />
        </div>
        <div className="field flex justify-content-center">
          <Button label="Submit" className="mt-2" disabled={!isFulfilled} onClick={submit} />
        </div>
      </div>
    </div>
  );
}
