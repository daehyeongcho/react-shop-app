import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

import { Row, Col } from "antd";

function DetailProductPage(props) {
  const productId = props.match.params.productId;

  const [product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/product/products_by_id?id=${productId}&type=single`)
      .then((response) => {
        if (response.data.success) {
          console.log("response.data", response.data);
          setProduct(response.data.product[0]);
        } else {
          alert("상세 정보 가져오기에 실패했습니다.");
        }
      });
  }, []);

  return (
    <div>
      <div style={{ width: "100%", padding: "3rem 4rem" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h1>{product.title}</h1>
        </div>

        <br />

        <Row gutter={[16, 16]}>
          <Col lg={12} msm={24}>
            {/* ProductImage */}
            <ProductImage detail={product} />
          </Col>
          <Col lg={12} msm={24}>
            {/* ProductInfo */}
            <ProductInfo detail={product} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default DetailProductPage;
