import React from 'react';
import PropTypes from 'prop-types';

export default function GalleryItem({ itemImageSrc, alt }) {
  return <img src={itemImageSrc} alt={alt} style={{ width: '100%', display: 'block' }} />;
}

GalleryItem.propTypes = {
  itemImageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
