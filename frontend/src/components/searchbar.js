import { Input, Select } from "antd";
import { useState } from "react";
import "./searchbar.scss";

const Searchbar = () => {
  const { Search } = Input;
  const [showfruit, setShowFruit] = useState(false);
  const [showveg, setShowVeg] = useState(false);

  const onSearch = (value) => console.log(value);

  const handleClickVeg = () => {
    setShowVeg(true);
    setShowFruit(false);
    console.log("click veg");
  };

  const handleClickFruit = () => {
    setShowVeg(false);
    setShowFruit(true);
    console.log("click fruit");
  };

  return (
    <div className="bg-container">
      <div className="data-container flex-row">
        <Search
          placeholder="Search"
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Select placeholder="Select Type">
          <Select value="1" onMouseEnter={handleClickVeg}>
            Vegetables
          </Select>
          <Select value="2" onMouseEnter={handleClickFruit}>
            Fruits
          </Select>
        </Select>
      </div>
    </div>
  );
};

export default Searchbar;
