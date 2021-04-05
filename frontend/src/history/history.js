import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Searchbar from "../components/searchbar";
import { getHistory } from "../service/cart.service";

import "./history.scss";

const HistoryItem = ({ orderList, orderId, shopList, userData }) => {
  const history = useHistory();

  const [shopIDs] = useState(new Set())

  const handleClick = () => {
    history.push("history/description", {
      orderList: orderList,
      shopList: shopList,
      orderId: orderId,
      userData: userData,
      shopIDs: shopIDs
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case 0:
        return "Wait for checkout";
      case 1:
        return "Wait for payment";
      case 2:
        return "paid";
      case 3:
        return "delivering";
      case 4:
        return "received";
      case 5:
        return "cancel";
    }
  };

  const renderItem = (item, idx) => {
    shopIDs.add(item.shop_id)
    return <div key={idx} className="history-content-wrapper flex-row">
      <img src={item.picture_url} />
      <div className="history-content flex-col">
        <div className="seller">Name : {item.product_title}</div>
        <div className="seller">Shop : {getShopName(item.shop_id)}</div>
        <div className="discount">Price : {item.price} TH</div>
        <div className="discount">Amount : {item.amount} </div>
        <div className="total">Total : {item.total_price} TH</div>
      </div>
    </div>
  }

  const getShopName = (shop_id) => {
    const shopdata = shopList.find((item) => item.ID === shop_id)
    return (shopdata? shopdata.shopname : "")
  }

  return (
    <div className="history-item flex-col">
      <div className="order-id">{`Order Id : ${orderId}`}</div>
      <div className="history-item-wrapper flex-row">
        <div className="order-wrapper flex-col">
          {orderList.map(renderItem)}
        </div>
        <div className="button-wrapper flex-col">
          <div className="status">{renderStatus(orderList[0].status)}</div>
          <Button onClick={() => handleClick()}>{"Click >"}</Button>
        </div>
        <div className="button-wrapper-mobile flex-col">
          <div className="status">{renderStatus(orderList[0].status)}</div>
          <Button onClick={() => handleClick()}>{">"}</Button>
        </div>
      </div>
    </div>
  );
};

const History = () => {
  const [orderData] = useState({});
  const [shopList, setShopList] = useState([]);
  const [userData, setUserData] = useState({});
  const [sortComplete, setSortComplete] = useState(false);

  useEffect(() => {
    fetchdata();
  }, []);

  const fetchdata = async () => {
    const result = await getHistory();
    console.log(result.data);
    sortOrderID(result.data.order_info)
    setShopList(result.data.shop_info)
    setUserData(result.data.user_info)
  };

  const sortOrderID = (order_data) => {
    order_data.forEach(item => {
      orderData[item.order_id] = []
    });
    order_data.forEach(item => {
      orderData[item.order_id].push(item)
    });
    setSortComplete(true)
  }

  const renderHistoryItem = (item, idx) => {
    return <HistoryItem key={idx} orderList={orderData[item]} orderId={item} shopList={shopList} userData={userData}/>;
  };

  if (!sortComplete) return <div></div>;
  return (
    <div className="history-page-container flex-col">
      <Searchbar />
      <div className="history-container">
        <h1>My history</h1>
        <div className="history-item-container flex-col">
          {Object.keys(orderData).map(renderHistoryItem)}
        </div>
      </div>
    </div>
  );
};

export default History;
