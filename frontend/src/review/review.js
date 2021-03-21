import React, { useState } from "react";
import "./review.scss";
import Navbar from "../components/navbar";
import Banner from "../components/static/banner";
import Scores from "../components/scores";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

const Review = () => {
  return (
    <div>
      <Navbar />
      <Banner title="Review your orders" bgClass="two" />
      <div className="review-container">
        <h2 className="text-center m-t-30">
          Please rate your experience with seller
        </h2>

        <Form className="form-container">
          <h2 className="">Shop Review</h2>
          <div className="review-stars">
            <Scores score={4.5} />
          </div>
          <TextArea rows={6} />

          <h2 className="m-t-30">Product Review</h2>
          <div className="review-stars">
            <Scores score={4.5} />
          </div>
          <TextArea rows={6} />

          <Form.Item className="btn-section m-t-30 text-center">
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Review;
