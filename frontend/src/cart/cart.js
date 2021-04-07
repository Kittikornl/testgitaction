import React, { useEffect, useState } from "react";
import "./cart.scss";
import Navbar from "../components/navbar";
import Searchbar from "../components/searchbar";
import { Checkbox, Button, Form, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getCart, updateCart, deleteProduct, checkout } from '../service/cart.service'
import Notification from '../components/notification'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useHistory } from "react-router";

const Cart = () => {
  // const [addedItems, setAddItems] = useState('a')
  const [checkedProduct, setCheckedProduct] = useState([])
  const [cart, setCart] = useState([])
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [productDeleted, setProductDeleted] = useState({})
  const [priceTotal, setPriceTotal] = useState(0)
  const history = useHistory()

  useEffect(() => {
    getCartData()
  }, [])

  const getCartData = async () => {
    try {
      const res = await getCart()
      console.log('res',res.data.cart_items);
      let eachPrice = 0
      res.data.cart_items.map(c => {
        eachPrice += c['amount']*c['price']
      })
      setPriceTotal(eachPrice)
      setCart(res.data.cart_items)
    } catch (error) {
      throw error
    }
  }

  const handleRemove = async (e, productDeleted) => {
    try {
      const res_remove = await deleteProduct(productDeleted['product_id'])
      console.log(res_remove)
      window.location.reload()
      Notification({type: 'success', message: 'Remove product success', desc: "Let's shopping"})
    } catch (error) {
      Notification({type: 'error', message: 'Remove product fail', desc: 'Please remove product again'})
      throw error
    }
  }
  const handleAddQuantity = async (product) => {
    //add quantity in checkedProduct
    product['change_amount'] += 1
    console.log(product);
    try {
      const res = await updateCart(product)
      console.log(res)
      window.location.reload()
    } catch (error) {
      throw error
    }
  }
  const handleSubtractQuantity = async (product) => {
    product['change_amount'] -= 1
    console.log(product);
    if (product['amount'] + product['change_amount'] == 0) {
      try {
        const res_remove = await deleteProduct(product['product_id'])
        console.log(res_remove)
        Notification({type: 'success', message: 'Remove product success', desc: "Let's shopping"})

      } catch (error) {
        Notification({type: 'error', message: 'Remove product fail', desc: 'Please remove product again'})
        throw error
      }
    }
    else {
      try {
      const res = await updateCart(product)
      console.log(res)
      
      } catch (error) {
        throw error
      }
    }
    window.location.reload()

  }
  const handleCheckbox = (e, product) => {
    if (e.target.checked) {
      console.log("product", product);
      setCheckedProduct([...checkedProduct, product])
      
    }
  }
  const handleCheckout = async () => {
    const cart_checkout = cart.map(({CreatedAt, DeletedAt, ID, UpdatedAt, user_id, change_amount, ...keepAttrs}) => keepAttrs)
    console.log(cart_checkout);
    try {
      const res = await checkout(cart_checkout)
      console.log(res);
      Notification({type: 'success', message: 'Remove product success', desc: "Let's shopping"})
      history.push('/home')
    } catch (error) {
      Notification({type: 'error', message: 'Remove product fail', desc: 'Please remove product again'})
      throw error
    }
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
            {cart.map(product => (
              <div key={product.ID} className="item">
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
                      <Button onClick={() => handleSubtractQuantity(product)}><MinusOutlined /></Button>
                      {product.amount} kg
                      <Button onClick={() => handleAddQuantity(product)}><PlusOutlined /></Button>
                    </h4>
                    <h4>price: {product.price} THB</h4>
                    <h4>total: {product.price*product.amount} THB</h4>
                  </div>
                </div>
                <Button onClick={(e) => openModelDelete(e, product)}>
                  <DeleteOutlined/>
                </Button>
              </div>
            ))}
        </div>
        <hr />
        <div className="summary">
          <h2>Total</h2>
          <h1>{priceTotal}</h1>
        </div>
        <div className="text-center">
          <Button htmlType="submit" className="submit" onClick={handleCheckout}>Checkout</Button>
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
                    <Button className="red-btn m-r-10" onClick={(e) => handleRemove(e, productDeleted)}>remove</Button>
                    <Button className="gray-btn" onClick={handleCancelDelete}>Cancel</Button>
                </div>
            </div>
      </Modal>
    </div>
  );
};

export default Cart;
