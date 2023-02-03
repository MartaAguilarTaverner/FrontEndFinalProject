import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import { Buffer } from 'buffer';

import useMediaHook from '../../RentedSpace/Media/hooks/media.hooks';

export default function ListItem({ img, name, price }) {
  const { getMediaById } = useMediaHook();
  const [mediaList, setMediaList] = useState('');

  const getMediaList = async () => {
    const media = await getMediaById(img);

    const blob = new Blob(media.data.img1.data, { type: 'image/webp' });

    const reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      console.log(reader.result);
      setMediaList(reader.result);
    };

    // const base64 = Buffer.from(media.data.img1.data).toString('base64');

    // setMediaList(`data:image/webp;base64,${base64}`);
  };

  useEffect(() => {
    getMediaList();
  }, []);

  return (
    <div className="col-12">
      <div className="RentedSpace-list-item rentedSpace-card">
        <img src={mediaList} alt={name} className="rentedSpaceMediaimg" />
        <div className="rentedSpace-list-detail">
          <div className="rentedSpace-name">{name}</div>
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
  img: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};
