import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import useReviewHook from '../../hooks/review.hooks';

import './UserReviews.scss';

export default function UserReviewList() {
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.id);
  const [reviews, setReviews] = useState([]);
  const [opened, setOpened] = useState(false);
  const [reviewItem, setReviewItem] = useState(null);
  const { getAllReviews, deleteReview } = useReviewHook();

  const getReviewList = async () => {
    const result = await getAllReviews(token, id);

    setReviews(result.data);
  };

  useEffect(() => {
    getReviewList();
  }, []);

  const editReview = (rowData) => {
    setReviewItem(rowData);
    setOpened(true);
  };

  const removeReview = (rowData) => {
    confirmDialog({
      message: 'Do you want to delete this review?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptClassName: 'p-button-danger',
      accept: () => {
        deleteReview(token, id, rowData.id);
      },
      reject: () => null
    });
  };

  const actionBodyTemplateHome = (rowData) => (
    <>
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-info mr-2" onClick={() => editReview(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => removeReview(rowData)} />
    </>
  );

  return (
    <>
      <div className="admin-review-container">
        <DataTable
          value={reviews}
          dataKey="id"
          paginator
          rows={10}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
          responsiveLayout="scroll"
          scrollable
          size="small"
        >
          <Column field="reservationId" header="ReservationId" sortable style={{ minWidth: '16rem' }} />
          <Column field="rating" header="Rating" sortable style={{ minWidth: '16rem' }} />
          <Column field="comment" header="Comment" sortable style={{ minWidth: '30rem' }} />
          <Column body={actionBodyTemplateHome} exportable={false} style={{ minWidth: '8rem' }} />
        </DataTable>
      </div>
      <AdminNewReview opened={opened} setOpened={setOpened} reviewItem={reviewItem} />
      <ConfirmDialog />
    </>
  );
}
