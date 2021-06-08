import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
import { continentsData } from "../LandingPage/Sections/Data";

const { Title } = Typography;
const { TextArea } = Input;

const initialInputs = {
  title: "",
  description: "",
  price: 0,
  continents: 1,
  images: [],
};

export default function UploadProductPage(props) {
  const [inputs, setInputs] = useState(initialInputs);
  const { title, description, price, continents, images } = inputs;

  const onInputChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const updateImages = (newImages) => {
    setInputs({ ...inputs, images: newImages });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const hasNull = Object.keys(inputs).reduce((acc, name) => {
      if (Array.isArray(inputs[name])) {
        return acc || inputs[name].length === 0;
      } else {
        return acc && !inputs[name];
      }
    }, false);
    if (hasNull) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }
    console.log("여기까지");
    // 서버에 채운 값들을 request로 보낸다.
    const body = {
      // 로그인 된 사람의 ID
      writer: props.user.userData._id,
      ...inputs,
    };

    Axios.post("/api/product", body).then((response) => {
      if (response.data.success) {
        alert("상품 업로드에 성공했습니다.");
        props.history.push("/");
      } else {
        alert("상품 업로드에 실패했습니다.");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}> 여행 상품 업로드</Title>
      </div>
      <Form onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />
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
        <select name="continents" onChange={onInputChange} value={continents}>
          {continentsData.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        {/* 강의에선 type="submit"으로 했는데 작동안됨. onClick으로 해야함 */}
        <Button onClick={onSubmit}>확인</Button>
      </Form>
    </div>
  );
}
