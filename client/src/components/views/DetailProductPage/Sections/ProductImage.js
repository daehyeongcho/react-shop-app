import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";

function ProductImage({ detail }) {
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (detail.images && detail.images.length > 0) {
      const newImages = [];
      detail.images.map((item) => {
        newImages.push({
          original: `${process.env.REACT_APP_API_URL}/${item}`,
          thumbnail: `${process.env.REACT_APP_API_URL}/${item}`,
        });
      });
      console.log(newImages);
      setImages(newImages);
    }
  }, [detail]);

  return (
    <div>
      <ImageGallery items={images} />
    </div>
  );
}

export default ProductImage;
