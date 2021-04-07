import React, { useEffect, useState } from "react";
import "./review.scss";
import { postReview } from '../service/order.service'
import Notification from '../components/notification'
import Banner from "../components/static/banner";
import { Input, Button, Rate } from "antd";
import { useHistory } from "react-router";
const { TextArea } = Input;

const Review = (prop) => {
  const history = useHistory()
  const [rateShop, setRateShop] = useState(0)
  const [commentShop, setCommentShop] = useState("")
  const [rateProduct, setRateProduct] = useState(0)
  const [commentProduct, setCommentProduct] = useState("")

  console.log(prop.location.state)

  const listShopId = prop.location.state.shopIDs
  const listOrder = prop.location.state.orderList

  const [shopMapProduct] = useState({});

  useEffect(() => {
    listOrder.forEach(product => {
      if (shopMapProduct[product['shop_id']]) {
        shopMapProduct[product['shop_id']].push(product['product_id'])
      }
      else {
        shopMapProduct[product['shop_id']] = [product['product_id']]
      }
    });
    // object.keys(shopMapProduct.key.map(shop => {
    //   console.log('shop', shop);
    // })
  }, [])

  const review = async (data) => {
    try {
      const res = await postReview(data)
    }
    catch (error){
      console.log(error)
    }
    
  }
  
  const handleReview = async () => {
    try {
      Object.keys(shopMapProduct).forEach(shopId => {
        const data = {
          "products": shopMapProduct[shopId],
          "products_comment": commentProduct,
          "products_rating": rateProduct,
          "shop_comment": commentShop,
          "shop_rating": rateShop,
          "shop_id": parseInt(shopId)
        }
        review(data)
      })
      Notification({type: 'success', message:'Review successful', desc: "Thank you for your feedback!"})
      history.push("/home")
    } catch (error) {
      Notification({type: 'error', message:'Review error', desc: "Something went wrong!"})
    }
    
  }

  

  return (
    <div>
      <Banner title="Review your orders" bgClass="two" />
      <div className="review-container">
        <h2 className="text-center m-t-30">
          Please rate your experience with seller
        </h2>
        <div className="form-container">
          <h2 className="">Shop Review</h2>
          <div className="review-stars">
            <Rate allowClear value={rateShop} onChange={(e) => setRateShop(e)}/>
          </div>
          <TextArea rows={6} value={commentShop} onChange={(e) => setCommentShop(e.target.value)} />

          <h2 className="m-t-30">Product Review</h2>
          <div className="review-stars">
            <Rate value={rateProduct} onChange={(e) => setRateProduct(e)}/>
          </div>
          <TextArea rows={6} allowClear value={commentProduct} onChange={(e) => setCommentProduct(e.target.value)}/>

          <div className="btn-section m-t-30 text-center">
            <Button onClick={handleReview}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
