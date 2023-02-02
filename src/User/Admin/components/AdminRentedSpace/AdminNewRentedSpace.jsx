import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Checkbox } from 'primereact/checkbox';

import useRentedSpaceHook from '../../../../RentedSpace/hooks/rentedSpace.hook';

export default function AdminNewRentedSpace({ opened, setOpened, rentedSpaceItem }) {
  const { createRentedSpace } = useRentedSpaceHook();
  const [title, setTitle] = useState('');
  const [maxPersons, setMaxPersons] = useState(0);
  const [numBedrooms, setNumBedrooms] = useState(0);
  const [numBathrooms, setNumBathrooms] = useState(0);
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [tv, setTV] = useState(false);
  const [kitchen, setKichen] = useState(false);
  const [airconditioner, setAirconditioner] = useState(false);
  const [heating, setHeating] = useState(false);
  const [internet, setInternet] = useState(false);
  const [price, setPrice] = useState(0);

  const addRentedspace = async () => {
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
      price
    };

    await createRentedSpace(newRentedSpace);
    setOpened(false);
  };

  const updateRentedSpace = async () => {
    setOpened(false);
  };

  const rentedSpaceDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setOpened(false)} />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={rentedSpaceItem ? updateRentedSpace : addRentedspace}
      />
    </>
  );

  useEffect(() => {
    if (rentedSpaceItem) {
      setTitle(rentedSpaceItem.title);
      setMaxPersons(rentedSpaceItem.maxPersons);
      setNumBedrooms(rentedSpaceItem.numBedrooms);
      setNumBathrooms(rentedSpaceItem.numBathrooms);
      setDescription(rentedSpaceItem.description);
      setAddress(rentedSpaceItem.address);
      setTV(rentedSpaceItem.tv);
      setKichen(rentedSpaceItem.kitchen);
      setAirconditioner(rentedSpaceItem.airconditioner);
      setHeating(rentedSpaceItem.heating);
      setInternet(rentedSpaceItem.internet);
      setPrice(rentedSpaceItem.price);
    }
  }, [rentedSpaceItem]);

  return (
    <Dialog
      visible={opened}
      style={{ width: '450px' }}
      header={rentedSpaceItem ? 'Update rented space' : 'Create rented space'}
      modal
      className="p-fluid"
      footer={rentedSpaceDialogFooter}
      onHide={() => setOpened(false)}
    >
      <div className="grid p-fluid-inputgroup display-flex justify-content-around">
        <div className="col-6">
          <InputText
            placeholder="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="col-6">
          <InputNumber
            placeholder="maxPersons"
            value={maxPersons}
            onValueChange={(e) => setMaxPersons(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="col-6">
          <InputNumber
            placeholder="numBedrooms"
            value={numBedrooms}
            onValueChange={(e) => setNumBedrooms(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="col-6">
          <InputNumber
            placeholder="numBathrooms"
            value={numBathrooms}
            onValueChange={(e) => setNumBathrooms(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="col-6">
          <InputTextarea
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            cols={30}
          />
        </div>
        <div className="col-6">
          <InputText
            placeholder="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="field mt-4">
          <Checkbox inputId="TV" name="TV" checked={tv} onChange={(e) => setTV(e.checked)} />
          <label htmlFor="isAdmin">TV</label>
        </div>
        <div className="field mt-4">
          <Checkbox inputId="kitchen" name="kitchen" checked={kitchen} onChange={(e) => setKichen(e.checked)} />
          <label htmlFor="isAdmin">Kitchen</label>
        </div>
        <div className="field mt-4">
          <Checkbox
            inputId="airconditioner"
            name="airconditioner"
            checked={airconditioner}
            onChange={(e) => setAirconditioner(e.checked)}
          />
          <label htmlFor="isAdmin"> Airconditioner </label>
        </div>
        <div className="field mt-4">
          <Checkbox inputId="heating" name="heating" checked={heating} onChange={(e) => setHeating(e.checked)} />
          <label htmlFor="isAdmin">Heating</label>
        </div>
        <div className="field mt-4">
          <Checkbox inputId="internet" name="internet" checked={internet} onChange={(e) => setInternet(e.checked)} />
          <label htmlFor="isAdmin">Internet</label>
        </div>
        <div className="col-6">
          <InputNumber
            placeholder="price"
            value={price}
            onValueChange={(e) => setPrice(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
    </Dialog>
  );
}

AdminNewRentedSpace.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  rentedSpaceItem: PropTypes.oneOfType([null, PropTypes.object]).isRequired
};
