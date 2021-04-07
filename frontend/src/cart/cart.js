import React, { useEffect, useState } from "react";
import "./cart.scss";
import { Checkbox, Button, Modal } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { getCart, updateCart, deleteProduct, checkout } from '../service/cart.service'
import Notification from '../components/notification'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  // const [addedItems, setAddItems] = useState('a')
  const [checkedProduct, setCheckedProduct] = useState([])
  const [cart, setCart] = useState([])
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [productDeleted, setProductDeleted] = useState({})
  const [priceTotal, setPriceTotal] = useState(0)
  const history = useHistory()
  const shopId = []
  const [shopMapProduct, setShopMapProduct] = useState({})
  const [shopMapName, setShopMapName] = useState({})

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
      const shopProduct = {}
      const shopName = {}
      res?.data.cart_items?.map(item => {
        if (shopProduct[item.shop_id]) {
          console.log('found',item);
          shopProduct[item.shop_id].push(item)
        }
        else {
          shopProduct[item.shop_id] = [item]
        }
      })
      res?.data.shop_info?.map(shop => {
        shopName[shop.ID] = shop.shopname
      })

      setShopMapProduct(shopProduct)
      setShopMapName(shopName)

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
    product['change_amount'] += 1
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
  const handleCheckout = async () => {
    console.log(cart)
    const cart_checkout = cart.map(({CreatedAt, DeletedAt, ID, UpdatedAt, user_id, change_amount, ...keepAttrs}) => keepAttrs)
    try {
      const res = await checkout(cart_checkout)
      console.log(res);
      Notification({type: 'success', message: 'Checkout cart success', desc: "Let's pay"})
      history.push('/home')
    } catch (error) {
      Notification({type: 'error', message: 'Checkout cart fail', desc: 'Please checkout cart again'})
      throw error
    }
  }

  const openModelDelete = (e, product) => {
    setVisibleDelete(true)
    setProductDeleted(product)
  }

  const handleCancelDelete = () => {
    setVisibleDelete(false)
  }
  console.log(shopMapProduct)
  console.log(shopMapName);

  return (
    <div>
      <div className="cart-container">
        <h2>My order</h2>
        <div className="item-list">
            {Object.keys(shopMapProduct).map(shopId => (
              <>
                <div><FontAwesomeIcon className="m-t-16 m-r-10" icon={faStore} />{shopMapName[shopId]}</div>
                {shopMapProduct[shopId].map(product => (
                  <div key={product.product_id} className="item">
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
              </>
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
