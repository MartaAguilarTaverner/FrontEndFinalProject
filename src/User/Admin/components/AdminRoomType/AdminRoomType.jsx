import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import useRoomTypeHook from '../../../../RentedSpace/RoomType/hooks/roomType.hook';

import './AdminRoomType.scss';
import AdminNewRoomType from './AdminNewRoomType';

export default function AdminGeneralHomeType() {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const [roomTypes, setRoomType] = useState([]);
  const [opened, setOpened] = useState(false);
  const [roomTypeItem, setRoomTypeItem] = useState(null);
  const { getAllRoomType, deleteRoomType } = useRoomTypeHook();

  const getRoomTypeList = async () => {
    const result = await getAllRoomType(token, id);

    setRoomType(result.data);
  };

  useEffect(() => {
    getRoomTypeList();
  }, []);

  const newRoomType = () => {
    setOpened(true);
  };

  const editRoomType = (rowData) => {
    setRoomTypeItem(rowData);
    setOpened(true);
  };

  const removeRoomType = (rowData) => {
    confirmDialog({
      message: 'Do you want to delete this room type?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteRoomType(token, id, rowData.id);
      },
      reject: () => null
    });
  };

  const header = () => (
    <div className="table-header">
      <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={newRoomType} />
    </div>
  );

  const actionBodyTemplateHome = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info mr-2"
        onClick={() => editRoomType(rowData)}
      />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => removeRoomType(rowData)} />
    </>
  );

  return (
    <>
      <div className="admin-roomtype-container">
        <DataTable
          value={roomTypes}
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
          <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }} />
          <Column body={actionBodyTemplateHome} exportable={false} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>
      <AdminNewRoomType opened={opened} setOpened={setOpened} roomTypeItem={roomTypeItem} />
      <ConfirmDialog />
    </>
  );
}
