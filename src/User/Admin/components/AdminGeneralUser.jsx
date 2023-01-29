import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import useUserHook from '../../hooks';

import './AdminGeneralUser.scss';
import AdminGeneralNewUser from './AdminGeneralNewUser';

const formatDate = (value) => new Date(value);

const ageTemplate = (rowData) => formatDate(rowData.age).toLocaleDateString();

export default function AdminGeneralUser() {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const [users, setUsers] = useState([]);
  const [opened, setOpened] = useState(false);
  const [userItem, setUserItem] = useState(null);
  const { getAllUsers, deleteUser } = useUserHook();

  const getUserList = async () => {
    const result = await getAllUsers(token, id);

    setUsers(result.data);
  };

  useEffect(() => {
    getUserList();
  }, []);

  const newUser = () => {
    setOpened(true);
  };

  const editUser = (rowData) => {
    setUserItem(rowData);
    setOpened(true);
  };

  const removeUser = (rowData) => {
    confirmDialog({
      message: 'Do you want to delete this user?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteUser(token, id, rowData.id);
      },
      reject: () => null
    });
  };

  const header = () => (
    <div className="table-header">
      <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={newUser} />
    </div>
  );

  const actionBodyTemplate = (rowData) => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => editUser(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => removeUser(rowData)} />
    </>
  );

  return (
    <>
      <div className="admin-generaluser-container">
        <DataTable
          value={users}
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
          <Column field="surname" header="Surname" sortable style={{ minWidth: '16rem' }} />
          <Column field="email" header="Email" sortable style={{ minWidth: '20rem' }} />
          <Column field="age" header="Age" body={ageTemplate} sortable style={{ minWidth: '10rem' }} />
          <Column field="isOwner" header="Is Owner" sortable style={{ minWidth: '10rem' }} />
          <Column field="isAdmin" header="Is Admin" sortable style={{ minWidth: '10rem' }} />
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>
      <AdminGeneralNewUser opened={opened} setOpened={setOpened} userItem={userItem} />
      <ConfirmDialog />
    </>
  );
}
