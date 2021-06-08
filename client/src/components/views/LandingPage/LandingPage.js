import React, { useEffect, useState } from "react";
import axios from "axios";
import { Icon, Col, Card, Row, Carousel } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import RadioBox from "./Sections/RadioBox";
import { continentsData, priceData } from "./Sections/Data";

function LandingPage() {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(8);
  const [postSize, setPostSize] = useState(0);
  const [filters, setFilters] = useState({
    continents: [],
    price: [],
  });

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패했습니다");
      }
    });
  };

  useEffect(() => {
    const body = {
      skip,
      limit,
    };
    getProducts(body);
  }, []);

  const onLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
    };
    getProducts(body);
    setSkip(skip + limit);
  };

  const renderCards = products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <Card cover={<ImageSlider images={product.images} />}>
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (newFilters) => {
    const body = {
      skip: 0,
      limit,
      filters: newFilters,
    };
    getProducts(body);
    setSkip(0);
  };

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters };

    if (category === "price") {
      // price 범위 array
      newFilters[category] = priceData[filter].array;
    } else {
      // continents, ...
      newFilters[category] = filter;
    }

    console.log(newFilters);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2>
            Let's Travel Anywhere <Icon type="rocket" />
          </h2>
        </div>

        {/* Filter */}
        <Row gutter={[16, 16]}>
          <Col lg={12} xs={24}>
            {/* CheckBox */}
            <CheckBox
              list={continentsData}
              handleFilters={(filter) => handleFilters(filter, "continents")}
            />
          </Col>
          <Col lg={12} xs={24}>
            <RadioBox
              list={priceData}
              handleFilters={(filter) => handleFilters(filter, "price")}
            />
            {/* RadioBox */}
          </Col>
        </Row>

        {/* Search */}

        {/* Card */}
        <Row gutter={[16, 16]}>{renderCards}</Row>
        <br />

        {postSize >= limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button onClick={onLoadMore}>더보기</button>
          </div>
        )}
      </div>
    </>
  );
}

export default LandingPage;
