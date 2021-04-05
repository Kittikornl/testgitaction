import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import "./historyDesc.scss";

const HistoryDesc = (props) => {
  const history = useHistory();
  const [orderData, setOrderData] = useState();
  const [shopdata, setShopData] = useState();

  useEffect(() => {
    const receiveProps = props.location.state;
    console.log(receiveProps);
    setOrderData(receiveProps.orderData);
    setShopData(receiveProps.shopData);
  }, []);

  const handleMakePayment = () => {
    history.push("/checkout", {
      orderData: orderData,
      shopData: shopdata,
    });
  };

  if (!orderData) return <div></div>;
  return (
    <div className="history-desc-container flex-col">
      <div className="order-title flex-row">
        <h1>Order Id : {orderData.order_id}</h1>
        {1 === 0 ? (
          <div className="success-paid flex-row">
            <Button>Track your order</Button>
            <Button>Review</Button>
          </div>
        ) : (
          <div className="unsuccess-paid">
            <Button onClick={() => handleMakePayment()}>Make a payment</Button>
          </div>
        )}
      </div>
      <div className="order-content flex-col">
        <div className="content-warpper flex-row">
          <div className="title flex-col">
            <div>Shop : </div>
            <div>Tel : </div>
          </div>
          <div className="content  flex-col">
            <div>{shopdata.shopname}</div>
            <div>0614807734</div>
          </div>
        </div>
        <div className="content-warpper flex-row">
          <div className="title flex-col">
            <div>Name : </div>
            <div>Address : </div>
            <div>Tel : </div>
          </div>
          <div className="content flex-col">
            <div>Tinnapop Pratheep</div>
            <div>Chulalongkorn University</div>
            <div>0614807734</div>
          </div>
        </div>
        <div className="content-warpper flex-row">
          <div className="title flex-col">
            <div>Tracking number : </div>
            <div>Shipping : </div>
          </div>
          <div className="content flex-col">
            <div>
              {orderData.tracking_number === ""
                ? "-"
                : orderData.tracking_number}
            </div>
            <div>Kerry</div>
          </div>
        </div>
        <div className="content-warpper flex-col">
          <div className="title-product">Product</div>
          <div className="product-item flex-row">
            <img src={orderData.picture_url} />
            <div className="product-content flex-col">
              <div>{orderData.product_title}</div>
              <div>Amount : {orderData.amount} kg</div>
              <div>Price : {orderData.total_price} TH</div>
            </div>
          </div>
        </div>
        <div className="content-warpper flex-row">
          <div className="title flex-col">
            <div>Subtotal : </div>
            <div>Discount : </div>
            <div>Total : </div>
            {1 === 1 && <div>Payment method : </div>}
            {1 === 1 && <div>Payment status : </div>}
          </div>
          <div className="content flex-col">
            <div>{orderData.total_price} TH</div>
            <div>40 TH</div>
            <div>50 TH</div>
            {1 === 1 && <div>Credit card</div>}
            {1 === 1 && <div>Already</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDesc;
