import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Dropdown } from 'primereact/dropdown';

import ListItem from '../../../GeneralComponents/ListItem/ListItem';
import GridItem from '../../../GeneralComponents/GridItem/GridItem';

import './HomeTable.css';

const itemTemplate = (media, Layout) => {
  if (!media) {
    return null;
  }

  let result = (
    <GridItem id={media.id} img={media.img} name={media.name} rating={media.rating} price={media.price} type={type} />
  );

  if (Layout === 'list') {
    result = <ListItem img={media.img} name={media.name} rating={media.rating} price={media.price} />;
  }

  return result;
};

export default function HomeTable({ rentedSpaceList, type }) {
  const [layout, setLayout] = useState('grid');
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [loading, setLoading] = useState(true);

  const sortOptions = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' }
  ];

  const onSortChange = (event) => {
    const { value } = event;

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

  const renderHeader = () => (
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

  useEffect(() => {
    if (rentedSpaceList.length > 0) {
      setLoading(false);
    }
  }, [rentedSpaceList]);

  return (
    <div className="table-rentedspacemedia-container">
      <DataView
        value={rentedSpaceList}
        layout={layout}
        header={renderHeader}
        itemTemplate={(data) => itemTemplate(data, type)}
        paginator
        rows={9}
        sortOrder={sortOrder}
        sortField={sortField}
        loading={loading}
      />
    </div>
  );
}

HomeTable.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  rentedSpaceList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};
