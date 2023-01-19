import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Carousel } from 'primereact/carousel';

import './CarouselMedia.css';

const responsiveOptions = [
  {
    breakpoint: '1024px',
    numVisible: 6,
    numScroll: 1
  },
  {
    breakpoint: '600px',
    numVisible: 6,
    numScroll: 1
  },
  {
    breakpoint: '480px',
    numVisible: 6,
    numScroll: 1
  }
];

export default function CarouselMedia({ mediaList, itemTemplate }) {
  const [media, setMedia] = useState([]);

  useEffect(() => {
    setMedia(mediaList);
  }, [mediaList]);

  return (
    <div className="mediaCarousel">
      <Carousel
        value={media}
        numVisible={4}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        className="custom-carousel"
        itemTemplate={itemTemplate}
        circular
      />
    </div>
  );
}

CarouselMedia.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  mediaList: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  itemTemplate: PropTypes.object.isRequired
};
