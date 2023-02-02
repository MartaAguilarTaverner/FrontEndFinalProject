import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

import useReviewHook from '../../../../Review/hooks/review.hooks';

export default function AdminReview({ opened, setOpened, reviewItem }) {
  const { createReview } = useReviewHook();
  const [reservationId, setReservationId] = useState('');
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState('');

  const addReview = async () => {
    const newReview = {
      reservationId,
      rating,
      comment
    };

    await createReview(newReview);
    setOpened(false);
  };

  const updateReview = async () => {
    setOpened(false);
  };

  const reviewDialogFooter = (
    <>
      <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={() => setOpened(false)} />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={reviewItem ? updateReview : addReview}
      />
    </>
  );

  useEffect(() => {
    if (reviewItem) {
      setReservationId(reviewItem.reservationId);
      setRating(reviewItem.rating);
      setComment(reviewItem.comment);
    }
  }, [reviewItem]);

  return (
    <Dialog
      visible={opened}
      style={{ width: '450px' }}
      header={reviewItem ? 'Update review' : 'Create review'}
      modal
      className="p-fluid"
      footer={reviewDialogFooter}
      onHide={() => setOpened(false)}
    >
      <div className="col-6">
        <InputNumber
          placeholder="reservationId"
          value={reservationId}
          onValueChange={(e) => setReservationId(e.target.value)}
          className="w-full"
        />
      </div>
      <div className="col-6">
        <InputNumber
          placeholder="rating"
          value={rating}
          onValueChange={(e) => setRating(e.target.value)}
          min={0}
          max={5}
          className="w-full"
        />
      </div>
      <div className="col-6">
        <InputText
          placeholder="comment"
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full"
        />
      </div>
    </Dialog>
  );
}

AdminReview.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  reviewItem: PropTypes.oneOfType([null, PropTypes.object]).isRequired
};
