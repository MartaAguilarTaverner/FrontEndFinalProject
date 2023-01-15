import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Rating } from 'primereact/rating';

import './homeTable.css';
import { useNavigate } from 'react-router-dom';

const renderListItem = (data) => (
  <div className="col-12">
    <div className="RentedSpace-list-item rentedSpace-card">
      <img src={data.img} alt={data.name} className="rentedSpaceMediaimg" /> //base 64 y galeria
      <div className="rentedSpace-list-detail">
        <div className="rentedSpace-name">{data.name}</div>
        <Rating value={data.rating} readOnly cancel={false}></Rating>
      </div>
      <div className="product-list-action">
        <span className="rentedSpace-price">${data.price}</span>
        <Button icon="pi pi-check" label="Info"></Button>
      </div>
    </div>
  </div>
);

const HomeTable = ({ rentedSpaceList, type }) => {
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const itemTemplate = (media, Layaout) => {
    if (!media) {
      return;
    }
    let result = renderGridItem(media);

    if (Layaout === 'list') {
      result = renderListItem(media);
    }
    return result;
  };

  const onSortChange = (event) => {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      setSortOrder(-1);
      setSortField(value.substring(1, value.length));
      setSortKey(value);
    } else {
      setSortOrder(1);
      setSortField(value);
      setSortKey(value);
    }
  };

  const renderGridItem = (data) => {
    return (
      <div className="col-12 md:col-4 lg:col-3 xl:col-2">
        <div className="rentedSpace-grid-item card">
          <div className="rentedSpace-grid-item-content rentedSpace-card">
            <img
              src={data.img} //Gallery
              alt={data.name}
              className="rentedSpaceMediaimg"
            />
            <div className="rentedSpace-name">{data.name}</div>
            <Rating value={data.rating} readOnly cancel={false}></Rating>
          </div>
          <div className="rentedSpace-grid-item-bottom">
            <span className="rentedSpace-price">${data.price}</span>
            <Button
              icon="pi pi-check"
              className="rentedSpace-button"
              label="Info"
              onClick={() => navigate(`/${type}/${data.id}`)} //TO THE PAGE OF INFO
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const renderHeader = () => {
    return (
      <div className="grid grid-nogutter header-rentedSpacetaleb">
        <div className="col-6" style={{ textAlign: ' left' }}>
          <Dropdown
            options={sortOptions}
            value={sortKey}
            optionLabel="label"
            placeholder="Sort By Price"
            onChange={onSortChange}
          />
        </div>
        <div className="col-6" style={{ textAlign: 'right' }}>
          <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (rentedSpaceList.lenght > 0) {
      setLoading(false);
    }
  }, [rentedSpaceList]);

  return (
    <div className="table-rentedspacemedia-container">
      <DataView
        value={rentedSpaceList}
        layout={layout}
        header={renderHeader()}
        itemTemplate={itemTemplate}
        paginator
        rows={9}
        sortOrder={sortOrder}
        sortField={sortField}
        loading={loading}
      />
    </div>
  );
};

export default HomeTable;
