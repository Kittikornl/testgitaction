import React, { useEffect, useState } from "react";
import "./cart.scss";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Checkbox, Button, Form, Modal } from "antd";
import vegThumbnail from "../img/veg-thumbnail.jpg";
import { DeleteOutlined } from "@ant-design/icons";
import { getCart, addCart, updateCart, deleteProduct } from '../service/cart.service'
import Notification from '../components/notification'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import ColumnGroup from "antd/lib/table/ColumnGroup";

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
      // add key = change_amount in this object
      setCart(res.data.cart_items)
    } catch (error) {
      throw error
    }
  }
  const addCartData = async () => {
    
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
  const handleRemove = async (productDeleted) => {
    const req = {
      "shop_id" : productDeleted.shop_id,
      "product_title": productDeleted.product_title,
      "amount": productDeleted.amount,
      "price": productDeleted.price,
      "picture_url": productDeleted.picture_url,
      "product_detail": productDeleted.product_detail 
    }
    try {
      const res_remove = await deleteProduct(req)
      console.log(res_remove)
      Notification({type: 'success', message: 'Remove product success', desc: "Let's shopping"})
    } catch (error) {
      Notification({type: 'error', message: 'Remove product fail', desc: 'Please remove product again'})
      throw error
    }
  }
  const handleAddQuantity = async (product) => {
    //add quantity in checkedProduct
    cart['change_amount'] += 1
    try {
      const res = await updateCart()
      console.log(res);
      // setCart(res)
    } catch (error) {
      throw error
    }
  }
  const handleSubtractQuantity = (product) => {
    cart['change_amount'] += 1
    try {
      const res = await updateCart()
      console.log(res);
      // setCart(res)
    } catch (error) {
      throw error
    }
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
