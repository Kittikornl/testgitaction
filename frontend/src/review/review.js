import React, { useState } from "react";
import "./review.scss";
import { postReview } from '../service/order.service'
import Notification from '../components/notification'
import Banner from "../components/static/banner";
import { Input, Button, Rate } from "antd";
const { TextArea } = Input;

const Review = () => {
  const orderId = 1
  const shopId = 2
  const productId = 2
  const [rateShop, setRateShop] = useState(0)
  const [commentShop, setCommentShop] = useState("")
  const [rateProduct, setRateProduct] = useState(0)
  const [commentProduct, setCommentProduct] = useState("")

  const handleReview = async () => {
    try {
      const data = {
        "products": [productId],
        "products_comment": commentProduct,
        "products_rating": rateProduct,
        "shop_comment": commentShop,
        "shop_rating": rateShop,
        "shop_id": shopId
      }
      console.log(data);
      const res = await postReview(data)
      Notification({type: 'success', message:'Edit shop successful', desc: "Shop is edited"})
    } catch (error) {
      Notification({type: 'error', message:'Edit shop error', desc: "Please edit your shop again"})
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
