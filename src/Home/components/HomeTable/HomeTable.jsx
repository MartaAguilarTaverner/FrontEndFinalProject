import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';

import ListItem from '../../../GeneralComponents/ListItem/ListItem';
import GridItem from '../../../GeneralComponents/GridItem/GridItem';

import './HomeTable.css';

const itemTemplate = (media, Layout) => {
  if (!media) {
    return null;
  }

  let result = <GridItem id={media.id} img={media.img} name={media.name} rating={media.rating} price={media.price} />;

  if (Layout === 'list') {
    result = <ListItem img={media.img} name={media.name} rating={media.rating} price={media.price} />;
  }

  return result;
};

export default function HomeTable({ rentedSpaceList, type }) {
  const [layout, setLayout] = useState('grid');
  const [sortOrder] = useState(null);
  const [sortField] = useState(null);
  const [loading, setLoading] = useState(true);

  const renderHeader = () => (
    <div className="grid grid-nogutter header-rentedSpacetaleb">
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
        header={renderHeader()}
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
