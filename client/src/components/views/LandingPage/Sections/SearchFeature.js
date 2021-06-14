import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature({ refreshFunction }) {
  const [searchTerm, setSearchTerm] = useState("");
  const onSearch = (e) => {
    refreshFunction(searchTerm);
  };
  const onChange = (e) => {
    setSearchTerm(e.currentTarget.value);
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={onChange}
        onSearch={onSearch}
        style={{ width: 200 }}
        enterButton
        value={searchTerm}
      />
    </div>
  );
}

export default SearchFeature;
