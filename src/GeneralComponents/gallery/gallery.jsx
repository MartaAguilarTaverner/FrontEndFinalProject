import React, { useState, useEffect } from 'react';
import { RentedSpaceService } from './services/rentedSpace.service';
import { Galleria } from 'primereact/galleria';

const GalleriaRentedSpace = () => {
  const [images, setImages] = useState(null);

  const galleriaService = new RentedSpaceService();

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

  useEffect(() => {
    galleriaService.getImages().then((data) => setImages(data));
  }, []);

  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ display: 'block' }} />;
  };

  return (
    <div>
      <div className="card">
        <Galleria
          value={images}
          responsiveOptions={responsiveOptions}
          numVisible={7} //6 OR MORE AND ADD TO MEDIA
          circular
          style={{ maxWidth: '800px' }}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
      </div>
    </div>
  );
};

export default GalleriaRentedSpace;
