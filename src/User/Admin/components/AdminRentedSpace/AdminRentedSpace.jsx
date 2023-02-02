import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import useRentedSpaceHook from '../../../../RentedSpace/hooks/rentedSpace.hook';

import './AdminRentedSpace.scss';
import AdminNewRentedSpace from './AdminNewRentedSpace';

export default function AdminRentedSpace() {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const [rentedSpaces, setRentedSpaces] = useState([]);
  const [opened, setOpened] = useState(false);
  const [rentedSpaceItem, setRentedSpaceItem] = useState(null);
  const { getAllRentedSpace, deleteRentedSpace } = useRentedSpaceHook();

  const getRentedSpaceList = async () => {
    const result = await getAllRentedSpace(token, id);

    setRentedSpaces(result.data);
  };

  useEffect(() => {
    getRentedSpaceList();
  }, []);

  const newRentedSpace = () => {
    setOpened(true);
  };

  const editRentedSpace = (rowData) => {
    setRentedSpaceItem(rowData);
    setOpened(true);
  };

  const removeRentedSpace = (rowData) => {
    confirmDialog({
      message: 'Do you want to delete this rented space?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteRentedSpace(token, id, rowData.id);
      },
      reject: () => null
    });
  };

  const header = () => (
    <div className="table-header">
      <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={newRentedSpace} />
    </div>
  );

  const actionBodyTemplateHome = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info mr-2"
        onClick={() => editRentedSpace(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => removeRentedSpace(rowData)}
      />
    </>
  );

  return (
    <>
      <div className="admin-rentedspace-container">
        <DataTable
          value={rentedSpaces}
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
          <Column field="id" header="id" sortable style={{ minWidth: '2rem' }} />
          <Column field="userId" header="UserId" sortable style={{ minWidth: '2rem' }} />
          <Column field="homeTypeId" header="HomeTypeId" sortable style={{ minWidth: '9rem' }} />
          <Column field="roomTypeId" header="RoomTypeId" sortable style={{ minWidth: '9rem' }} />
          <Column field="mediaId" header="MediaId" sortable style={{ minWidth: '5rem' }} />
          <Column field="title" header="Title" sortable style={{ minWidth: '5rem' }} />
          <Column field="maxPersons" header="Max Persons" sortable style={{ minWidth: '5rem' }} />
          <Column field="numBedrooms" header="Bedrooms" sortable style={{ minWidth: '5rem' }} />
          <Column field="numBathrooms" header="Bathrooms" sortable style={{ minWidth: '5rem' }} />
          <Column field="address" header="Address" sortable style={{ minWidth: '7rem' }} />
          <Column field="tv" header="TV" sortable style={{ minWidth: '2rem' }} />
          <Column field="kitchen" header="Kitchen" sortable style={{ minWidth: '5rem' }} />
          <Column field="airconditioner" header="Airconditioner" sortable style={{ minWidth: '10rem' }} />
          <Column field="heating" header="Heating" sortable style={{ minWidth: '5rem' }} />
          <Column field="internet" header="Internet" sortable style={{ minWidth: '5rem' }} />
          <Column field="price" header="Price" sortable style={{ minWidth: '5rem' }} />
          <Column body={actionBodyTemplateHome} exportable={false} style={{ minWidth: '5rem' }} />
        </DataTable>
      </div>
      <AdminNewRentedSpace opened={opened} setOpened={setOpened} rentedSpaceItem={rentedSpaceItem} />
      <ConfirmDialog />
    </>
  );
}
