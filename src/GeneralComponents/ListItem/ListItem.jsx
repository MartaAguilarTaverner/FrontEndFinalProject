import React from 'react';
import PropTypes from 'prop-types';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';

export default function ListItem({ img, name, rating, price }) {
  return (
    <div className="col-12">
      <div className="RentedSpace-list-item rentedSpace-card">
        <img src={img} alt={name} className="rentedSpaceMediaimg" /> {/* TODO: base 64 y galeria */}
        <div className="rentedSpace-list-detail">
          <div className="rentedSpace-name">{name}</div>
          <Rating value={rating} readOnly cancel={false} />
        </div>
        <div className="product-list-action">
          <span className="rentedSpace-price">${price}</span>
          <Button icon="pi pi-check" label="Info" />
        </div>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired
};
