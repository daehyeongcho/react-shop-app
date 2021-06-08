import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

function CheckBox({ list, handleFilters }) {
  const [checked, setChecked] = useState([]);

  const onToggle = (key) => {
    // 누른 것의 Index를 구하고
    const currentIndex = checked.indexOf(key);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      // 체크 안되어 있었다면 checked에 추가
      newChecked.push(key);
    } else {
      // 체크 되어 있었다면 checekd에서 제거
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    list &&
    list.map((item) => (
      <Checkbox
        key={item.key}
        onChange={() => onToggle(item.key)}
        checked={checked.indexOf(item.key) !== -1}
      >
        {item.value}
      </Checkbox>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
