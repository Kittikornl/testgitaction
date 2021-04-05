import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

import "./historyDesc.scss";

const HistoryDesc = (props) => {
  const history = useHistory();
  const [orderList, setOrderList] = useState(undefined);
  const [shopList, setShopList] = useState([]);
  const [orderId, setOrderId] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [userData, setUserData] = useState();

  const [orderMap] = useState({});

  useEffect(() => {
    const receiveProps = props.location.state
    console.log(receiveProps)
    setOrderList(receiveProps.orderList)
    setShopList(receiveProps.shopList)
    setOrderId(receiveProps.orderId)
    setUserData(receiveProps.userData)
    let totalPrice = 0
    receiveProps.orderList.forEach(order => {
      totalPrice += order.total_price
    })
    setTotalPrice(totalPrice)
    renderShopMap(receiveProps.orderList, receiveProps.shopIDs)
  }, []);

  const handleMakePayment = () => {
    history.push("/checkout", {
      order_id : orderId
    });
  };

  const handleTrack= () => {
    history.push("/shipment", {
      order_id : orderId
    });
  };

  const handleReview= () => {
    history.push("/review", {
      order_id : orderId
    });
  };

  const getShopName = (shop_id) => {
    const shopdata = shopList.find((item) => item.ID === shop_id)
    return (shopdata? shopdata.shopname : "")
  }
  const renderShopMap = (oList, shopSet) => {
    shopSet.forEach((id)=> {
      orderMap[id] = []
      oList.forEach((order)=> {
        if(order.shop_id === id) {
          orderMap[id].push(order)
        }
      })
    })
    console.log(orderMap)
  }

  const renderProduct = (item, idx) => {
    return <div key={idx}>
      <div className="product-item flex-row">
        <img src={item.picture_url} />
        <div className="product-content flex-col">
          <div>{item.product_title}</div>
          <div>Amount : {item.amount} kg</div>
          <div>Price : {item.total_price} TH</div>
        </div>
      </div>
    </div>
  }
  const renderShop = (item, idx) => {
    return <div className="shop-wrapper">
      <div><FontAwesomeIcon className="store-icon m-t-16" icon={faStore} /> {getShopName(orderMap[item][0].shop_id)}</div>
      {orderMap[item].map(renderProduct)}
    </div>
  }

  if (orderList === undefined) return <div></div>;
  return (
    <div className="history-desc-container flex-col">
      <div className="order-title flex-row">
        <h1>Order Id : {orderId}</h1>
        {orderList[0].status !== 1 && orderList[0].status !== 6 && <div className="success-paid flex-row">
          <Button onClick={() => handleTrack()}>Track your order</Button>
          <Button onClick={() => handleReview()}>Review</Button>
        </div>}
        
        {orderList[0].status === 1 && <div className="unsuccess-paid">
          <Button onClick={() => handleMakePayment()}>Make a payment</Button>
        </div>}
        
      </div>
      <div className="order-content flex-col">
        <div className="content-warpper flex-row">
          <div className="title flex-col">
            <div>Name : </div>
            <div>Address : </div>
            <div>Tel : </div>
          </div>
          <div className="content flex-col">
            <div>{`${userData.firstname} ${userData.lastname}`}</div>
            <div>{
              `${userData.houseNo} ${userData.street} ${userData.subDistrict} ${userData.district} ${userData.city} ${userData.zipcode}`.trim() === "" ? "No address data"
                : `${userData.houseNo} ${userData.street} ${userData.subDistrict} ${userData.district} ${userData.city} ${userData.zipcode}`.replace("-", "")
            }</div>
            <div>{`${userData.phoneNo}`}</div>
          </div>
        </div>
        <div className="content-warpper flex-row">
          <div className="title flex-col">
            <div>Tracking number : </div>
            <div>Shipping : </div>
          </div>
          <div className="content flex-col">
            <div>
              {orderList[0].tracking_number === ""
                ? "-"
                : orderList[0].tracking_number}
            </div>
            <div>Kerry</div>
          </div>
        </div>
        <div className="content-warpper flex-col">
          <div className="title-product">Product</div>
            {Object.keys(orderMap).map(renderShop)}
        </div>
        <div className="content-warpper flex-row">
          <div className="title flex-col">
            <div>Total : </div>
            {orderList[0].status === 2 && <div>Payment method : </div>}
            {orderList[0].status === 2 && <div>Payment status : </div>}
          </div>
          <div className="content flex-col">
            <div>{totalPrice} TH</div>
            {orderList[0].status === 2 && <div>Credit card</div>}
            {orderList[0].status === 2 && <div>Already</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryDesc;
