import React from "react";
import { Carousel } from "antd";

function ImageSlider({ images }) {
  return (
    <div>
      <Carousel autoplay>
        {images.map((img, index) => {
          return (
            <div key={index}>
              <img
                style={{ width: "100%", maxHeight: "150px" }}
                src={`${process.env.REACT_APP_API_URL}/${img}`}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
