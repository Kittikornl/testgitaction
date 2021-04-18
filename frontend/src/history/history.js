import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import OrderSearchbar from "../components/orderSearchBar";
import { getHistory } from "../service/cart.service";

import "./history.scss";

const HistoryItem = ({ orderList, orderId, shopList, userData }) => {
  const history = useHistory();

  const [shopIDs] = useState(new Set())

  const handleClick = () => {
    history.push("order/description", {
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
        return "Paid";
      case 3:
        return "Delivering";
      case 4:
        return "Received";
      case 5:
        return "Cancel";
      case 6:
        return "Sold out";
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
          <div>Total Price : {orderList[0].total_price}</div>
          <div className="status">{renderStatus(orderList[0] ?.status)}</div>
          <Button onClick={() => handleClick()}>{"Click >"}</Button>
        </div>
        <div className="button-wrapper-mobile flex-col">
          <div className="status">{renderStatus(orderList[0] ?.status)}</div>
          <Button onClick={() => handleClick()}>{">"}</Button>
        </div>
      </div>
    </div>
  );
};

const History = () => {
  const [orderData, setOrderData] = useState({});
  const [shopList, setShopList] = useState([]);
  const [userData, setUserData] = useState({});
  const [sortComplete, setSortComplete] = useState(false);

  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    fetchdata(0, null, "");
  }, []);

  const fetchdata = async (type, data, id) => {
    setSortComplete(false)
    let result = {}
    setOrderId(id)
    if (type === 0) {
      result = await getHistory();
      setShopList(result.data.shop_info)
      setUserData(result.data.user_info)
    }
    else {
      result = data
      setOrderData({})
    }
    sortOrderID(result.data.order_info)
  };

  const sortOrderID = (order_data) => {
    let order_dict = {}
    order_data.forEach(item => {
      order_dict[item.order_id] = []
    });
    
    order_data.forEach(item => {
      order_dict[item.order_id].push(item)
    });
    setOrderData(order_dict)
    setSortComplete(true)
  }

  const renderHistoryItem = (item, idx) => {
    return <HistoryItem key={idx} orderList={orderData[item]} orderId={item} shopList={shopList} userData={userData}/>;
  };

  if (!sortComplete) return <div></div>;
  return (
    <div className="history-page-container flex-col">
      <OrderSearchbar setData={fetchdata} />
      <div className="history-container">
        <h1>My orders</h1>
        <div className="history-item-container flex-col">
          {console.log(orderData)}
          {orderId!==""? 
            <HistoryItem orderList={orderData[orderId]} orderId={orderId} shopList={shopList} userData={userData}/>
            :
            Object.keys(orderData).map(renderHistoryItem)
          }
        </div>
      </div>
    </div>
  );
};

export default History;
