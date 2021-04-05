import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Input, Select, Button, Modal, Form, DatePicker } from "antd";
import { getUserInfo } from "../service/auth.service";
import { getUserData } from "../service/user.service";
import {
  getOrderHistory,
  postUsePromotion,
  postPaymentByCredit,
  postPaymentByQR,
  postCancelOrder,
} from "../service/checkout.service";
import visa from "../img/visa.png";
import qr from "../img/QR for payment.jpg";
import "./checkout.scss";
import { Link } from "react-router-dom";
import Notification from "../components/notification";

const Checkout = (props) => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showQr, setShowQr] = useState(false);
  const [visibleQR, setVisibleQR] = useState(false);
  const [visibleCancel, setVisibleCancel] = useState(false);
  const [visibleCredit, setVisibleCredit] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userID, setUserID] = useState(getUserInfo().userId);
  const [userData, setUserData] = useState("");
  const [payMethod, setPayMethod] = useState("");
  const [cardNo, setCardNo] = useState("");
  const [data, setData] = useState([]);
  const [price, setPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [shipmentPrice, setShipmentPrice] = useState("");
  const [orderID, setOrderID] = useState("");
  const [shopList, setShopList] = useState(new Set());
  const [discount, setDiscount] = useState("");
  const [THB, setTHB] = useState("");
  const [orders, setOrders] = useState(new Set());
  const [shippingMethod, setShippingMethod] = useState("");
  const initdata = [];
  const monthFormat = "MM/YYYY";

  useEffect(async () => {
    fetchUserData(userID);
    fetchHistory();
  }, []);

  const fetchUserData = async () => {
    const data = await getUserData(userID);
    setUserData(data.data.Userdata);
  };

  const fetchHistory = async () => {
    const history = await getOrderHistory();
    const receiveProps = props.location.state;

    console.log(history);
    setOrderID(parseInt(receiveProps.order_id));
    for (let i = 0; i < history.data.shop_info.length; i++) {
      let temp = [];
      for (let j = 0; j < history.data.order_info.length; j++) {
        history.data.shop_info[i].ID === history.data.order_info[j].shop_id
          ? temp.push(history.data.order_info[j])
          : (temp = temp);
        initdata[i] = {
          shop_id: history.data.shop_info[i].ID,
          shop_name: history.data.shop_info[i].shopname,
          orders: temp,
        };
      }
    }
    setData(initdata);
  };

  const modalCreditLayout = {
    labelCol: { span: 6 },
    wrapperCol: { offset: 1, span: 12 },
  };

  const Product = (props) => {
    orders.add(props.product);
    setPrice(props.product.total_price);
    setShipmentPrice(props.product.shipping_charge);
    setTotalPrice(
      props.product.total_price + props.product.shipping_charge - discount
    );
    return (
      <div className="product flex-row">
        <img src={props.product.picture_url}></img>
        <div className="info">
          <div>{props.product.product_title}</div>
          <div>Amount: {props.product.amount}</div>
          <div>Price: {props.product.price}</div>
        </div>
      </div>
    );
  };

  const renderProduct = (product, index) => {
    return product.order_id === orderID ? <Product product={product} /> : null;
  };

  const Shop = (props) => {
    let c = 0;
    props.shop.orders.forEach((o) => {
      if (o.order_id === orderID) {
        c++;
      }
    });

    if (c > 0) {
      shopList.add(props.shop.shop_id);
      return (
        <div>
          <div className="flex-row">
            <FontAwesomeIcon className="store-icon m-t-16" icon={faStore} />
            <div className="shopName">{props.shop.shop_name}</div>
          </div>
          {props.shop.orders.map(renderProduct)}
        </div>
      );
    } else {
      return null;
    }
  };

  const renderShop = (shops, index) => {
    return <Shop shop={shops} />;
  };

  const handleShippingMethod = (value) => {
    setShippingMethod(value);
  };

  const handleChangePayment = (value) => {
    if (value === "card") {
      setShowAddCard(true);
      setShowQr(false);
      setPayMethod("card");
    } else if (value === "qr") {
      setShowAddCard(false);
      setShowQr(true);
      setPayMethod("qr");
    }
  };

  const showModalCredit = () => {
    setVisibleCredit(true);
  };

  const handleCancelCredit = () => {
    setVisibleCredit(false);
  };

  const handleClear = () => {
    if (document.getElementById("card-no").value === "") {
      setShowCard(false);
    }
  };

  const handleChangeCard = () => {
    setCardNo(document.getElementById("card-number").value);
  };

  const onFinishAddCreditCard = () => {
    setShowAddCard(false);
    setShowCard(true);
  };

  const handleSubmitCard = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleCredit(false);
      setConfirmLoading(false);
    }, 200);
  };

  const showModalCancel = () => {
    setVisibleCancel(true);
  };

  const handleCancel = () => {
    setVisibleCancel(false);
  };

  const handleYesCancel = async () => {
    setVisibleCancel(false);
    Notification({
      type: "success",
      message: "Cancel successful",
      desc: "Your order have been canceled",
    });
    let payload = {};
    let tmp = [];
    orders.forEach((e) => {
      tmp.push(e);
    });
    payload["order"] = tmp;
    console.log(payload);
    const res = await postCancelOrder(payload);
  };

  const handleNoCancel = () => {
    setVisibleCancel(false);
  };

  const handleMakePaymentCredit = async () => {
    let payload = {};
    let tmp = [];
    orders.forEach((e) => {
      tmp.push(e);
    });
    payload["order"] = tmp;
    payload["shipping_method"] = shippingMethod;
    console.log(payload);
    try {
      const res = await postPaymentByCredit(payload);
    } catch {
      Notification({
        type: "error",
        message: "Unable to proceed the order",
        desc: "The product's amount is exceeding the stock's",
      });
    }
  };

  const handleMakePaymentQr = () => {
    setVisibleQR(true);
  };

  const handleCancelPaymentByQR = () => {
    setVisibleQR(false);
  };

  const handleSubmitPaymentByQR = async () => {
    setVisibleQR(false);
    let payload = {};
    let tmp = [];
    orders.forEach((e) => {
      tmp.push(e);
    });
    payload["order"] = tmp;
    payload["shipping_method"] = shippingMethod;
    console.log(payload);
    try {
      const res = await postPaymentByQR(payload);
    } catch {
      Notification({
        type: "error",
        message: "Unable to proceed the order",
        desc: "The product's amount is exceeding the stock's",
      });
    }
  };

  const onChangePromoCode = async () => {
    let payload = {};
    let tmp = [];
    shopList.forEach((s) => {
      tmp.push(s);
    });
    payload["order_id"] = orderID;
    payload["price"] = price;
    payload["promotion_code"] = document.getElementById("promo-code").value;
    payload["shop_id"] = tmp;

    console.log(payload);
    const res = await postUsePromotion(payload);
    console.log(res);

    setDiscount(res.data.discount_amount);
    setTHB(" THB");
    setTotalPrice(totalPrice - discount);
    console.log(res.data.discount_amount);
  };

  return (
    <div className="checkout-container">
      <div className="header m-t-10">My order</div>
      <div className="order-container m-t-10">
        <div className="order">
          <div className="name flex-row">
            <div className="left">Name:</div>
            <div>
              {userData.firstname} {userData.lastname}
            </div>
          </div>
          <div className="address flex-row">
            <div className="left">Address:</div>
            <div>
              {userData.houseNo} {userData.street} {userData.subDistrict}{" "}
              {userData.district} {userData.city} {userData.zipcode}
            </div>
          </div>
          <div className="tel flex-row">
            <div className="left">Tel:</div>
            <div>{userData.phoneNo}</div>
          </div>
        </div>
        <div className="product-container">{data.map(renderShop)}</div>
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
          {showAddCard ? (
            <div className="add-card flex-row">
              <div className="payment"></div>
              <Button
                htmlType="submit"
                className="button-add"
                onClick={showModalCredit}
              >
                Add credit card
              </Button>
              <Modal
                visible={visibleCredit}
                centered
                confirmLoading={confirmLoading}
                onCancel={handleCancelCredit}
                footer={false}
              >
                <div className="add-creditcard-modal">
                  <Form
                    {...modalCreditLayout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinishAddCreditCard}
                  >
                    <div className="creditcard-header flex-row">
                      <p>Credit card</p>
                      <img src={visa} />
                    </div>
                    <Form.Item
                      label="Card Number"
                      name="Card Number"
                      rules={[
                        {
                          required: true,
                          message: "Please input your card number!",
                        },
                      ]}
                    >
                      <Input id="card-number" onChange={handleChangeCard} />
                    </Form.Item>
                    <Form.Item
                      label="Card Name"
                      name="Card Name"
                      rules={[
                        {
                          required: true,
                          message: "Please input your card name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="Expiry Date"
                      name="Expiry Date"
                      rules={[
                        {
                          required: true,
                          message: "Please input an expire date!",
                        },
                      ]}
                    >
                      <DatePicker format={monthFormat} picker="month" />
                    </Form.Item>
                    <Form.Item
                      label="CVV"
                      name="CVV"
                      rules={[
                        {
                          required: true,
                          message: "Please input cvv!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <div className="card-button flex-row">
                      <Button
                        htmlType="submit"
                        className="button-green"
                        onClick={handleSubmitCard}
                      >
                        Submit
                      </Button>
                      <Button
                        htmlType="cancle"
                        className="button-red"
                        onClick={handleCancelCredit}
                      >
                        Cancel
                      </Button>
                    </div>
                  </Form>
                </div>
              </Modal>
            </div>
          ) : null}
          {showCard ? (
            <div className="credit flex-row">
              <div className="payment">Credit card : </div>
              <Input
                id="card-no"
                className="inputEdit"
                allowClear
                defaultValue={cardNo}
                onChange={handleClear}
              />
            </div>
          ) : null}
          <div className="ship-method flex-row">
            <div className="payment">Shipment method : </div>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Choose shipment"
              onChange={handleShippingMethod}
            >
              <Select value="kerry">Kerry</Select>
              <Select value="EMS">EMS</Select>
              <Select value="Register">Register</Select>
            </Select>
          </div>
          <div className="promocode flex-row">
            <div className="payment">Promotion code : </div>
            <Input
              className="inputEdit"
              id="promo-code"
              allowClear
              placeholder="Enter code"
            />
            <Button className="use-promo-button" onClick={onChangePromoCode}>
              use code
            </Button>
          </div>
        </div>
        <div className="conclude-container m-t-16">
          <div className="price flex-row">
            <div className="conclude">Price :</div>
            <div>{price} THB</div>
          </div>
          {discount === "" ? null : (
            <div className="discount flex-row">
              <div className="conclude">Discount :</div>
              <div>
                {discount} {THB}
              </div>
            </div>
          )}
          <div className="shipmentprice flex-row">
            <div className="conclude">Shipment price :</div>
            <div>{shipmentPrice} THB</div>
          </div>
          <div className="total flex-row">
            <div className="conclude">Total :</div>
            <div>{totalPrice} THB</div>
          </div>
        </div>
        <div className="button-group flex-row">
          {payMethod === "" ? (
            <Button htmlType="submit" className="button-green">
              Make a payment
            </Button>
          ) : payMethod === "card" ? (
            <Link to="/history">
              <Button
                htmlType="submit"
                className="button-green"
                onClick={handleMakePaymentCredit}
              >
                Make a payment
              </Button>
            </Link>
          ) : (
            <div>
              <Button
                htmlType="submit"
                className="button-green"
                onClick={handleMakePaymentQr}
              >
                Make a payment
              </Button>
              <Modal
                visible={visibleQR}
                centered
                onCancel={handleCancelPaymentByQR}
                footer={false}
              >
                <div className="QR-payment-modal flex-col">
                  <div className="header">QR Code</div>
                  <img src={qr} />
                  <div className="button-group flex-row">
                    <Link to="/history">
                      <Button
                        htmlType="submit"
                        className="button-green"
                        onClick={handleSubmitPaymentByQR}
                      >
                        Submit
                      </Button>
                    </Link>
                    <Button
                      htmlType="cancle"
                      className="button-red"
                      onClick={handleCancelPaymentByQR}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
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
                <Link to="/history">
                  <Button
                    htmlType="submit"
                    className="button-yes"
                    onClick={handleYesCancel}
                  >
                    Yes
                  </Button>
                </Link>
                <Button
                  htmlType="cancle"
                  className="button-no"
                  onClick={handleNoCancel}
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
