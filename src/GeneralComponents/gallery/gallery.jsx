import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';

import { RentedSpaceService } from '../../RentedSpace/services/rentedSpace.service';

import GalleryItem from './components/GalleryItem/GalleryItem';
import GalleryThumbnail from './components/GalleryThumbnail/GalleryThumbnail';

const renderGalleryItem = (data) => <GalleryItem itemImageSrc={data.itemImageSrc} alt={data.alt} />;
const renderGalleryThumbnail = (data) => <GalleryThumbnail thumbnailImageSrc={data.thumbnailImageSrc} alt={data.alt} />;

export default function GalleriaRentedSpace() {
  const [images, setImages] = useState(null);

  const rentedSpaceService = new RentedSpaceService();

  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '960px',
      numVisible: 4
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  const getImages = async () => {
    const result = await rentedSpaceService.getImages();

    if (result.data) {
      setImages(result.data);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div>
      <div className="card">
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={7} // 6 OR MORE AND ADD TO MEDIA
          circular
          style={{ maxWidth: '800px' }}
          item={renderGalleryItem}
          thumbnail={renderGalleryThumbnail}
        />
      </div>
    </div>
  );
}
