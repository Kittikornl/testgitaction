import { Input, Select } from "antd";
import { useState } from "react";
import "./searchbar.scss";

const Searchbar = (props) => {
  const { Search } = Input;
  const [type, setType] = useState("");

  const onSearch = (value) => {
    const payload = {};
    payload.keyword = value;
    payload.type = type;
    props.getSearchData(payload);
  };

  const handleClickVeg = () => {
    setType(1);
    console.log("click veg");
  };

  const handleClickFruit = () => {
    setType(2);
    console.log("click fruit");
  };

  const handleClickAll = () => {
    setType("");
    console.log("click all");
  };

  return (
    <div className="bg-container">
      <div className="data-container flex-row">
        <Select placeholder="Select Type">
          <Select value="" onMouseEnter={handleClickAll}>
            All types
          </Select>
          <Select value="1" onMouseEnter={handleClickVeg}>
            Vegetables
          </Select>
          <Select value="2" onMouseEnter={handleClickFruit}>
            Fruits
          </Select>
        </Select>
        <Search
          placeholder="Search"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
      </div>
    </div>
  );
};

export default Searchbar;
