import React from 'react';
import PropTypes from 'prop-types';

export default function GalleryThumbnail({ thumbnailImageSrc, alt }) {
  return <img src={thumbnailImageSrc} alt={alt} style={{ display: 'block' }} />;
}

GalleryThumbnail.propTypes = {
  thumbnailImageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
};
