import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Input, Select, Button, Modal } from "antd";
import { getUserInfo } from "../service/auth.service";
import { getUserData } from "../service/user.service";
import "./checkout.scss";

const profile = {
  name: "book",
  card: ["1234 5678 9012 1234", "4567 8901 2345 6789"],
};

const initData = [
  {
    shopName: "mint land",
    productInfo: [
      {
        pic_url:
          "https://www.errenskitchen.com/wp-content/uploads/2014/04/broccoli.jpg",
        name: "Mango",
        amount: "3 Kg",
        price: "100",
      },
      {
        pic_url:
          "https://www.errenskitchen.com/wp-content/uploads/2014/04/broccoli.jpg",
        name: "Collaard",
        amount: "2 Kg",
        price: "50",
      },
    ],
  },
  {
    shopName: "mint landd2",
    productInfo: [
      {
        pic_url:
          "https://www.errenskitchen.com/wp-content/uploads/2014/04/broccoli.jpg",
        name: "Durian",
        amount: "4 Kg",
        price: "200",
      },
    ],
  },
];

const Checkout = () => {
  const [data, setData] = useState(initData);
  const [showCard, setShowCard] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [creditCard, setCreditCard] = useState(profile);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [userID, setUserID] = useState(getUserInfo().userId);
  const [userData, setUserData] = useState("");

  useEffect(async () => {
    fetchUserData(userID);
  }, []);

  const fetchUserData = async () => {
    const data = await getUserData(userID);
    setUserData(data.data.Userdata);
    console.log(data.data.Userdata);
  };

  const Product = (props) => {
    return (
      <div className="product flex-row">
        <img src={props.product.pic_url}></img>
        <div className="info">
          <div>{props.product.name}</div>
          <div>Amount: {props.product.amount}</div>
          <div>Price: {props.product.price}</div>
        </div>
      </div>
    );
  };

  const renderProduct = (product, index) => {
    return <Product product={product} />;
  };

  const Order = (props) => {
    return (
      <div>
        <div className="flex-row">
          <FontAwesomeIcon className="store-icon m-t-16" icon={faStore} />
          <div className="shopName">{props.order.shopName}</div>
        </div>
        {props.order.productInfo.map(renderProduct)}
      </div>
    );
  };

  const renderOrder = (order, index) => {
    return <Order order={order} />;
  };

  //why ค่าไม่ออก??????
  const Credit = (props) => {
    console.log(props);
    return <Select>{props.card}</Select>;
  };

  const renderCredit = (credit, index) => {
    console.log(credit);
    return (
      <Select>
        <Credit credit={credit} />
      </Select>
    );
  };

  const showHiddenCredit = (props) => {
    console.log(props.card);
    return (
      <div className="credit flex-row">
        <div className="payment">Credit card : </div>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Choose credit card"
        >
          {props.card.map(renderCredit)}
        </Select>
      </div>
    );
  };

  const handleChangePayment = (value) => {
    if (value === "card") {
      setShowCard(true);
      setShowQr(false);
    } else if (value === "qr") {
      setShowCard(false);
      setShowQr(true);
    }
  };

  const showModalCancel = () => {
    setVisibleCancel(true);
  };

  const handleCancel = () => {
    setVisibleCancel(false);
  };

  const handleYes = () => {
    setVisibleCancel(false);
  };

  const handleNo = () => {
    setVisibleCancel(false);
  };

  return (
    <div className="checkout-container">
      <div className="header m-t-10">My order</div>
      <div className="order-container m-t-10">
        <div className="order">
          <div className="name flex-row">
            <div className="left">Name:</div>
            <div>
              {/* {userData === undefined ? null : userData.Userdata.firstname} */}
            </div>
          </div>
          <div className="address flex-row">
            <div className="left">Address:</div>
            <div>287 ถนนลาดพร้าว</div>
          </div>
          <div className="tel flex-row">
            <div className="left">Tel:</div>
            <div>0931459894</div>
          </div>
        </div>
        <div className="product-container">{data.map(renderOrder)}</div>
        <div className="payment-container m-t-16">
          <div className="pay-method flex-row">
            <div className="payment">Payment method : </div>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Choose payment"
              onChange={handleChangePayment}
            >
              <Select value="card">Credit Card</Select>
              <Select value="qr">QR Code</Select>
            </Select>
          </div>
          {showCard ? showHiddenCredit(creditCard) : null}
          <div className="ship-method flex-row">
            <div className="payment">Shipment method : </div>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Choose shipment"
            >
              <Select>Kerry</Select>
              <Select>EMS</Select>
            </Select>
          </div>
          <div className="promocode flex-row">
            <div className="payment">Promotion code : </div>
            <Input className="inputEdit" allowClear placeholder="Enter code" />
          </div>
        </div>
        <div className="conclude-container m-t-16">
          <div className="price flex-row">
            <div className="conclude">Price :</div>
            <div>400 THB</div>
          </div>
          <div className="discount flex-row">
            <div className="conclude">Discount :</div>
            <div>40 THB</div>
          </div>
          <div className="shipmentprice flex-row">
            <div className="conclude">Shipment price :</div>
            <div>20 THB</div>
          </div>
          <div className="total flex-row">
            <div className="conclude">Total :</div>
            <div>380 THB</div>
          </div>
        </div>
        <div className="button-group flex-row">
          <Button htmlType="submit" className="button-green">
            Make a payment
          </Button>
          <Button
            htmlType="cancle"
            className="button-red"
            onClick={showModalCancel}
          >
            Cancel order
          </Button>
          <Modal
            visible={visibleCancel}
            centered
            onCancel={handleCancel}
            footer={false}
          >
            <div className="cancel-checkout-modal flex-col">
              <div className="header flex-row">
                <FontAwesomeIcon
                  className="alert-icon"
                  icon={faExclamationCircle}
                />
                <p>Are you sure you want to cancel this order ?</p>
              </div>
              <div className="button-group flex-row">
                <Button
                  htmlType="submit"
                  className="button-yes"
                  onClick={handleYes}
                >
                  Yes
                </Button>

                <Button
                  htmlType="cancle"
                  className="button-no"
                  onClick={handleNo}
                >
                  No
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
