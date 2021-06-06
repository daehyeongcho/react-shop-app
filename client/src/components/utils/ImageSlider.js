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
                src={`http://localhost:5000/${img}`}
              />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
