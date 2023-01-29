import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import useHomeTypeHook from '../../../../RentedSpace/HomeType/hooks/homeType.hook';

import './AdminHomeType.scss';
import AdminNewHomeType from './AdminNewHomeType';

export default function AdminHomeType() {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const [homeTypes, setHomeType] = useState([]);
  const [opened, setOpened] = useState(false);
  const [homeTypeItem, setHomeTypeItem] = useState(null);
  const { getAllHomeType, deleteHomeType } = useHomeTypeHook();

  const getHomeTypeList = async () => {
    const result = await getAllHomeType(token, id);

    setHomeType(result.data);
  };

  useEffect(() => {
    getHomeTypeList();
  }, []);

  const newHomeType = () => {
    setOpened(true);
  };

  const editHomeType = (rowData) => {
    setHomeTypeItem(rowData);
    setOpened(true);
  };

  const removeHomeType = (rowData) => {
    confirmDialog({
      message: 'Do you want to delete this home type?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteHomeType(token, id, rowData.id);
      },
      reject: () => null
    });
  };

  const header = () => (
    <div className="table-header">
      <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={newHomeType} />
    </div>
  );

  const actionBodyTemplateHome = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-info mr-2"
        onClick={() => editHomeType(rowData)}
      />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => removeHomeType(rowData)} />
    </>
  );

  return (
    <>
      <div className="admin-hometype-container">
        <DataTable
          value={homeTypes}
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
      <AdminNewHomeType opened={opened} setOpened={setOpened} homeTypeItem={homeTypeItem} />
      <ConfirmDialog />
    </>
  );
}
