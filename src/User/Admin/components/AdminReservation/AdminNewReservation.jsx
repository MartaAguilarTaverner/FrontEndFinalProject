import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';

import useReservationHook from '../../../../Reservation/hooks/reservation.hook';

export default function AdminNewReservation({ opened, setOpened, reservationItem }) {
  const { createReservation } = useReservationHook();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [price, setPrice] = useState(0);

  const addReservation = async () => {
    const newReservation = {
      startDate,
      endDate,
      price
    };

    await createReservation(newReservation);
    setOpened(false);
  };

  const updateReservation = async () => {
    setOpened(false);
  };

  const reservationDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setOpened(false)} />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={reservationItem ? updateReservation : addReservation}
      />
    </>
  );

  useEffect(() => {
    if (reservationItem) {
      setStartDate(reservationItem.startDate);
      setEndDate(reservationItem.endDate);
      setPrice(reservationItem.price);
    }
  }, [reservationItem]);

  return (
    <Dialog
      visible={opened}
      style={{ width: '450px' }}
      header={reservationItem ? 'Update reservation' : 'Create reservation'}
      modal
      className="p-fluid"
      footer={reservationDialogFooter}
      onHide={() => setOpened(false)}
    >
      <div className="field mt-4">
        <span className="p-float-label w-full">
          <Calendar
            id="startDate"
            className="w-full"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            showIcon
          />
          <label className="text-black-alpha-90 font-bold" htmlFor="date">
            Start Date
          </label>
        </span>
      </div>
      <div className="field mt-4">
        <span className="p-float-label w-full">
          <Calendar
            id="endDate"
            className="w-full"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            dateFormat="dd/mm/yy"
            mask="99/99/9999"
            showIcon
          />
          <label className="text-black-alpha-90 font-bold" htmlFor="date">
            End Date
          </label>
        </span>
      </div>
      <div className="col-6">
        <InputNumber
          placeholder="price"
          value={price}
          onValueChange={(e) => setPrice(e.target.value)}
          className="w-full"
        />
      </div>
    </Dialog>
  );
}

AdminNewReservation.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  reservationItem: PropTypes.oneOfType([null, PropTypes.object]).isRequired
};
