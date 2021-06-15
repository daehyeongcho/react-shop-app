import React from "react";
import { Descriptions, Button } from "antd";

function ProductInfo({ detail }) {
  const onClick = () => {};

  return (
    <div>
      <Descriptions title="Product Info">
        <Descriptions.Item label="Price">{detail.price}</Descriptions.Item>
        <Descriptions.Item label="Sold">{detail.sold}</Descriptions.Item>
        <Descriptions.Item label="Views">{detail.views}</Descriptions.Item>
        <Descriptions.Item label="Description">
          {detail.description}
        </Descriptions.Item>
      </Descriptions>
      <br />
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button size="large" shape="round" type="danger" onClick={onClick}>
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductInfo;
