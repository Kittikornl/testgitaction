import React, { useEffect, useState } from "react";
import "./cart.scss";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Checkbox, Button, Form } from "antd";
import vegThumbnail from "../img/veg-thumbnail.jpg";
import { DeleteOutlined } from "@ant-design/icons";
import { getCart, addCart, updateCart } from '../service/cart.service'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const initData = [
  {
    'productName': "mangooooooooooo",
    "amount": 2,
    "price": 200
  },
  {
    'productName': "orangeyyyyyyy",
    "amount": 5,
    "price": 500
  },
]

const Cart = () => {
  // const [addedItems, setAddItems] = useState('a')
  const [checkedProduct, setCheckedProduct] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    getCartData()
  }, [])

  const getCartData = async () => {
    try {
      const res = await getCart()
      console.log(res);
      // setCart(res)
    } catch (error) {
      throw error
    }
  }
  const addCartData = async () => {
    try {
      const res = await getCart()
      console.log(res);
      // setCart(res)
    } catch (error) {
      throw error
    }
  }
  const updateCartData = async () => {
    try {
      const res = await getCart()
      console.log(res);
      // setCart(res)
    } catch (error) {
      throw error
    }
  }
  const handleRemove = () => {

  }
  const handleAddQuantity = (product) => {
    //if that product is in checkedProduct -> add quantity in checkedProduct & initData -> 
    console.log(product);
  }
  const handleSubtractQuantity = (product) => {
    console.log(product);
  }
  const handleCheckbox = (e, product) => {
    if (e.target.checked) {
      console.log("product", product);
      setCheckedProduct([...checkedProduct, product])
      
    }
  }
  const handleCheckout = (e) => {
    console.log('checkout', e)
  }
  const handleCheckoutFailed = (e) => {
    console.log('checkout failed', e)
  }
  console.log(checkedProduct);
  return (
    <div>
      <Navbar />
      <Searchbar />
      <div className="cart-container">
        <h2>My order</h2>
        <div className="item-list">
          <Form onFinish={handleCheckout} onFinishFailed={handleCheckoutFailed}>
            {initData.map(product => (
              <Form.Item name={product.productName}>
              <div className="item">
                <div className="icon">
                  <Checkbox onChange={(e) => handleCheckbox(e, product)}/>
                </div>
                <div className="product-detail">
                  <div className="img">
                    <img src={vegThumbnail} />
                  </div>
                  <div className="desc">
                    <h3>Product {product.productName}</h3>
                    <h4>amount: 
                      <Button onClick={handleAddQuantity(product)}><MinusOutlined /></Button>
                      {product.amount} kg
                      <Button onClick={handleSubtractQuantity(product)}><PlusOutlined /></Button>
                    </h4>
                    <h4>price: {product.price} THB</h4>
                  </div>
                </div>
                <Button onClick={handleRemove(product)}>
                  <DeleteOutlined/>
                </Button>
              </div>
            </Form.Item>
            ))}
            
          </Form>
        </div>
        <hr />
        <div className="summary">
          <h2>Total</h2>
          <h1>500</h1>
        </div>
        <div className="text-center">
          <Button htmlType="submit" className="submit">Checkout</Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
