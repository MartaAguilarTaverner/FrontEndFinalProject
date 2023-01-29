import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';

import useReservationHook from '../../../Reservation/hooks';

export default function AdminReservations() {
  const token = useSelector((state) => state.user.token);
  const [Reservarions, setReservarions] = useState([]);
  const [globalFilter, setGlobalFilter] = useState(null);
  const { getAllReservations } = useReservationHook();

  const getReservarionsList = useCallback(async () => {
    const result = await getAllReservations(token);

    setReservarions(result.data);
  }, [token]);

  useEffect(() => {
    getReservarionsList();
  }, [getReservarionsList]);

  const header = (
    <div className="table-header">
      <h5 className="mx-0 my-1">Manage Reservations</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
    </div>
  );

  const actionBodyTemplate = () => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" />
    </>
  );

  return (
    <div className="datatable-crud-demo">
      <div className="card">
        <DataTable
          value={Reservarions}
          dataKey="id"
          paginator
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          globalFilter={globalFilter}
          responsiveLayout="scroll"
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false} />
          <Column field="userId" header="userId" sortable style={{ minWidth: '12rem' }} />
          <Column field="rentedSpaceId" header="Rented Space" sortable style={{ minWidth: '10rem' }} />
          <Column field="startDate" header="Start Date" sortable style={{ minWidth: '10rem' }} />
          <Column field="endDate" header="End Date" sortable style={{ minWidth: '10rem' }} />
          <Column header="actions" exportable={false} style={{ minWidth: '12rem' }} body={actionBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
}
