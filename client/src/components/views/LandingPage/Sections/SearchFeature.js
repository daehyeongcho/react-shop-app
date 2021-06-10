import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature({ refreshFunction }) {
  const [searchTerm, setSearchTerm] = useState("");
  const onChange = (e) => {
    setSearchTerm(e.currentTarget.value);
    refreshFunction(e.currentTarget.value);
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={onChange}
        style={{ width: 200 }}
        value={searchTerm}
      />
    </div>
  );
}

export default SearchFeature;
