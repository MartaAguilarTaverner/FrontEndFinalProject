import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';

export default function GridItem({ id, img, name, rating, price, type }) {
  const navigate = useNavigate();

  return (
    <div className="col-12 md:col-4 lg:col-3 xl:col-2">
      <div className="rentedSpace-grid-item card">
        <div className="rentedSpace-grid-item-content rentedSpace-card">
          <img src={img} alt={name} className="rentedSpaceMediaimg" />
          <div className="rentedSpace-name">{name}</div>
          <Rating value={rating} readOnly cancel={false} />
        </div>
        <div className="rentedSpace-grid-item-bottom">
          <span className="rentedSpace-price">${price}</span>
          <Button
            icon="pi pi-check"
            className="rentedSpace-button"
            label="Info"
            onClick={() => navigate(`/${type}/${id}`)}
          />
        </div>
      </div>
    </div>
  );
}

GridItem.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
};
