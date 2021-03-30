import React, { useEffect, useState } from "react";
import "./cart.scss";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Checkbox, Button, Form, Modal } from "antd";
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
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [productDeleted, setProductDeleted] = useState({})

  useEffect(() => {
    getCartData()
  }, [])

  const getCartData = async () => {
    try {
      const res = await getCart()
      console.log('res',res.data.cart_items);
      setCart(res.data.cart_items)
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
  const handleRemove = (productDeleted) => {
    console.log('delete', productDeleted);
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

  const openModelDelete = (e, product) => {
    setVisibleDelete(true)
    setProductDeleted(product)
    console.log('openmode', product);
  }

  const handleCancelDelete = () => {
    setVisibleDelete(false)
  }

  return (
    <div>
      <Navbar />
      <Searchbar />
      <div className="cart-container">
        <h2>My order</h2>
        <div className="item-list">
          <Form onFinish={handleCheckout} onFinishFailed={handleCheckoutFailed}>
            {cart.map(product => (
              <Form.Item name={product.productName} key={product.ID}>
              <div className="item">
                <div className="icon">
                  <Checkbox onChange={(e) => handleCheckbox(e, product)}/>
                </div>
                <div className="product-detail">
                  <div className="img">
                    <img src={product.picture_url} />
                  </div>
                  <div className="desc">
                    <h3>{product.product_title}</h3>
                    <h4>amount: 
                      <Button onClick={() => handleAddQuantity(product)}><MinusOutlined /></Button>
                      {product.amount} kg
                      <Button onClick={() => handleSubtractQuantity(product)}><PlusOutlined /></Button>
                    </h4>
                    <h4>price: {product.price} THB</h4>
                  </div>
                </div>
                <Button onClick={(e) => openModelDelete(e, product)}>
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
      <Modal 
        visible={visibleDelete}
        centered
        onCancel={handleCancelDelete}
        footer={false}>
          <div className="text-center">
              <div className="text-alert">
                    Confirm remove {productDeleted?.product_title}
                </div>
                <div className="flex-row flex-center m-t-20">
                    <Button className="red-text m-r-10" onClick={(e) => handleRemove(e, productDeleted)}>remove</Button>
                    <Button className="gray-btn" onClick={handleCancelDelete}>Cancel</Button>
                </div>
            </div>
      </Modal>
    </div>
  );
};

export default Cart;
