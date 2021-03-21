import React, { useState } from "react";
import "./cart.scss";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Checkbox, Button } from "antd";
import vegThumbnail from "../img/veg-thumbnail.jpg";
import { DeleteOutlined } from "@ant-design/icons";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <Searchbar />
      <div className="cart-container">
        <h2>My order</h2>
        <div className="item-list">
          <div className="item">
            <div className="icon">
              <Checkbox />
            </div>
            <div className="product-detail">
              <div className="img">
                <img src={vegThumbnail} />
              </div>
              <div className="desc">
                <h3>Product Name mango mango mango</h3>
                <h4>amount: 3 kg</h4>
                <h4>price: 300 THB</h4>
              </div>
            </div>
            <div className="icon text-right">
              <DeleteOutlined className="delete-icon" />
            </div>
          </div>
          <div className="item">
            <div className="icon">
              <Checkbox />
            </div>
            <div className="product-detail">
              <div className="img">
                <img src={vegThumbnail} />
              </div>
              <div className="desc">
                <h3>Product Name mango mango mango</h3>
                <h4>amount: 3 kg</h4>
                <h4>price: 300 THB</h4>
              </div>
            </div>
            <div className="icon text-right">
              <DeleteOutlined className="delete-icon" />
            </div>
          </div>
        </div>
        <hr />
        <div className="summary">
          <h2>Total</h2>
          <h1>500</h1>
        </div>
        <div className="text-center">
          <Button htmlType="submit">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
