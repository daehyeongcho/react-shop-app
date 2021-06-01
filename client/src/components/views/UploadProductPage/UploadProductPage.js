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

export default function UploadProductPage() {
  const [inputs, setInputs] = useState(initialInputs);
  const { title, description, price } = inputs;
  const onChange = (e) => {
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
        <Input name="title" onChange={onChange} value={title} />
        <br />
        <br />
        <label>설명</label>
        <TextArea name="description" onChange={onChange} value={description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input name="price" type="number" onChange={onChange} value={price} />
        <br />
        <br />
        <select>
          <option></option>
        </select>
        <br />
        <br />
        <Button>확인</Button>
      </Form>
    </div>
  );
}
