import React, { useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

function RadioBox({ list, handleFilters }) {
  const [checked, setChecked] = useState(0);

  const onChange = (e) => {
    setChecked(e.target.value);
    handleFilters(e.target.value);
  };

  const renderRadioboxLists = () =>
    list &&
    list.map((item) => (
      <Radio key={item._id} value={item._id}>
        {item.name}
      </Radio>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price" key="1">
          <Radio.Group onChange={onChange} value={checked}>
            {renderRadioboxLists()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
