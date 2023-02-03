import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import useReservationHook from '../../hooks/reservation.hook';

import './UserReservations.scss';

export default function UserReservations() {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const [reservations, setReservations] = useState([]);
  const { getAllReservationbyUser, deleteReservation } = useReservationHook();

  const getReservationList = async () => {
    const result = await getAllReservationbyUser(token, id, { user: id });

    setReservations(result.data);
  };

  useEffect(() => {
    getReservationList();
  }, []);

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

  const actionBodyTemplateHome = (rowData) => (
    <Button
      icon="pi pi-trash"
      className="p-button-rounded p-button-danger"
      onClick={() => removeReservation(rowData)}
    />
  );

  return (
    <>
      <div className="reservation-container">
        <DataTable
          value={reservations}
          dataKey="id"
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
          scrollable
          size="small"
        >
          <Column field="rentedspaceId" header="RentedSpaceId" sortable style={{ minWidth: '16rem' }} />
          <Column field="startDate" header="StartDate" sortable style={{ minWidth: '16rem' }} />
          <Column field="endDate" header="EndDate" sortable style={{ minWidth: '16rem' }} />
          <Column field="price" header="Price" sortable style={{ minWidth: '16rem' }} />
          <Column body={actionBodyTemplateHome} exportable={false} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>
      <ConfirmDialog />
    </>
  );
}
