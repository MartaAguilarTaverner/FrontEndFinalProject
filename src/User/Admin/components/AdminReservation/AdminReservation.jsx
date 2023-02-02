import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import useReservationHook from '../../../../Reservation/hooks/reservation.hook';

import './AdminReservation.scss';
import AdminNewReservation from './AdminNewReservation';

export default function AdminReservation() {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const [reservations, setReservations] = useState([]);
  const [opened, setOpened] = useState(false);
  const [reservationItem, setReservationItem] = useState(null);
  const { getAllReservations, deleteReservation } = useReservationHook();

  const getReservationList = async () => {
    const result = await getAllReservations(token, id);

    setReservations(result.data);
  };

  useEffect(() => {
    getReservationList();
  }, []);

  const newReservation = () => {
    setOpened(true);
  };

  const editReservation = (rowData) => {
    setReservationItem(rowData);
    setOpened(true);
  };

  const removeReservation = (rowData) => {
    confirmDialog({
      message: 'Do you want to delete this reservation?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteReservation(token, id, rowData.id);
      },
      reject: () => null
    });
  };

  const header = () => (
    <div className="table-header">
      <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={newReservation} />
    </div>
  );

  const actionBodyTemplateHome = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info mr-2"
        onClick={() => editReservation(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => removeReservation(rowData)}
      />
    </>
  );

  return (
    <>
      <div className="admin-reservation-container">
        <DataTable
          value={reservations}
          header={header}
          dataKey="id"
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
          scrollable
          size="small"
        >
          <Column field="id" header="id" sortable style={{ minWidth: '12rem' }} />
          <Column field="userId" header="UserId" sortable style={{ minWidth: '16rem' }} />
          <Column field="rentedspaceId" header="RentedSpaceId" sortable style={{ minWidth: '16rem' }} />
          <Column field="startDate" header="StartDate" sortable style={{ minWidth: '16rem' }} />
          <Column field="endDate" header="EndDate" sortable style={{ minWidth: '16rem' }} />
          <Column field="price" header="Price" sortable style={{ minWidth: '16rem' }} />
          <Column body={actionBodyTemplateHome} exportable={false} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>
      <AdminNewReservation opened={opened} setOpened={setOpened} reservationItem={reservationItem} />
      <ConfirmDialog />
    </>
  );
}
