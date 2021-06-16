import React from "react";
import { Descriptions, Button } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../../_actions/user_actions";

function ProductInfo({ detail }) {
  const dispatch = useDispatch();

  const onClick = () => {
    // 필요한 정보를 Cart 필드에 넣어준다.
    dispatch(addToCart(detail._id));

    const body = {
      id: 0,
      quantity: 0,
      date: 0,
    };
  };

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
