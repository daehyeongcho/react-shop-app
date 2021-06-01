import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";

const { Title } = Typography;
const { TextArea } = Input;

const initialInputs = {
  title: "",
  description: "",
  price: 0,
  continent: 1,
  images: [],
};

const continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

export default function UploadProductPage() {
  const [inputs, setInputs] = useState(initialInputs);
  const { title, description, price, continent, images } = inputs;
  const onInputChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> 여행 상품 업로드</Title>
      </div>
      <Form>
        {/* DropZone */}
        <br />
        <br />
        <label>이름</label>
        <Input name="title" onChange={onInputChange} value={title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea
          name="description"
          onChange={onInputChange}
          value={description}
        />
        <br />
        <br />
        <label>가격($)</label>
        <Input
          name="price"
          type="number"
          onChange={onInputChange}
          value={price}
        />
        <br />
        <br />
        <select name="continent" onChange={onInputChange} value={continent}>
          {continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button type="submit">확인</Button>
      </Form>
    </div>
  );
}
