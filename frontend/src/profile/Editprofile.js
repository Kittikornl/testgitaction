import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import bg from "../img/vegetables.jpg";
import { Form, Input, Button, DatePicker, Modal, Popconfirm } from "antd";
import "./Editprofile.scss";
import visa from "../img/visa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";

const initData = {
  name: "siras",
  surname: "jaroenpoj",
  mail: "siras_2543@hotmail.com",
  Tel: "0931459894",
  Addr: "123 abc street",
  Birthdate: "12/02/2020",
  credit: [
    "1234 5678 9012 1234",
    "4567 8901 1234 5678",
    "4567 8901 2345 6789",
    "9999 9999 9999 9999",
  ],
};

const CardInfo = (props) => {
  const deleteCard = () => {
    initData.credit = initData.credit.filter((card) => {
      return card !== props.card;
    });
    props.pageRefresh();
  };
  return (
    <div className="credit-card flex-row">
      {`xxxx xxxx xxxx ${props.card.slice(15, 19)}`}
      <a onClick={() => deleteCard()}>
        <FontAwesomeIcon className="trash-icon" icon={faTrash} />
      </a>
    </div>
  );
};

const Editprofile = (props) => {
  const [data, setData] = useState(initData);
  const [refresh, setRefresh] = useState(true);
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];

  useEffect(() => {
    setData(initData);
  }, []);

  const configBirthdate = {
    rules: [
      {
        type: "object",
        required: true,
        message: "Please select your birthdate!",
      },
    ],
  };

  const pageRefresh = () => {
    setRefresh(!refresh);
  };

  const onFinishInfo = (fieldsValue) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue["range-picker"];
    const rangeTimeValue = fieldsValue["range-time-picker"];
    const values = {
      ...fieldsValue,
      "date-picker": fieldsValue["date-picker"].format("YYYY-MM-DD"),
    };
    console.log("Received values of form: ", values);
  };

  const renderCreditCard = (card, index) => {
    return <CardInfo card={card} pageRefresh={pageRefresh} />;
  };

  const [visibleCredit, setVisibleCredit] = React.useState(false);
  const [visibleDelete, setVisibleDelete] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const showModalCredit = () => {
    setVisibleCredit(true);
  };

  const showModalDelete = () => {
    setVisibleDelete(true);
  };

  const modalCreditLayout = {
    labelCol: { span: 6 },
    wrapperCol: { offset: 1, span: 12 },
  };

  const handleSave = () => {
    console.log("save");
  };

  const handleSubmitCard = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleCredit(false);
      setConfirmLoading(false);
    }, 200);
  };

  const handleCancelCredit = () => {
    setVisibleCredit(false);
  };

  const handleCancelDelete = () => {
    setVisibleDelete(false);
  };

  const handleYes = () => {
    setVisibleDelete(false);
  };

  const handleNo = () => {
    setVisibleDelete(false);
  };

  // const handleClear = () => {
  //   document.getElementById("firstname").value = " ";
  //   document.getElementById("lastname").value = "";
  //   document.getElementById("email").value = "";
  //   document.getElementById("phone").value = "";
  //   document.getElementById("address").value = "";
  //   document.getElementById("birthdate").value = "";
  // };

  return (
    <div className="editprofile-container">
      <div className="edit-info">
        <img className="bg" preview={false} src={bg} />
        <div className="profile flex-row">
          <div className="img-col">
            <img src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          </div>
          <div className="info-container">
            <Form
              name="basic"
              // initialValues={{ remember: true }}
              onFinish={onFinishInfo}
            >
              <div className="info-header">Edit Information</div>
              <Form.Item
                label="First name"
                name="firstname"
                rules={[
                  {
                    required: true,
                    message: "Please input your first name!",
                  },
                ]}
              >
                <Input
                  className="input"
                  defaultValue={data.name}
                  id="firstname"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label="Last name"
                name="lastname"
                rules={[
                  {
                    required: true,
                    message: "Please enter your last name!",
                  },
                ]}
              >
                <Input
                  className="input"
                  defaultValue={data.surname}
                  id="lastname"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "Invalid email format",
                  },
                ]}
              >
                <Input
                  className="input"
                  defaultValue={data.mail}
                  id="email"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  type="tel"
                  className="input"
                  defaultValue={data.Tel}
                  id="phone"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input
                  className="input"
                  defaultValue={data.Addr}
                  id="address"
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label="Birth date"
                name="birthdate"
                {...configBirthdate}
              >
                <DatePicker
                  defaultValue={moment(`${data.Birthdate}`, dateFormatList[0])}
                  format={dateFormatList}
                  id="birthdate"
                  allowClear
                />
              </Form.Item>
              <Button
                htmlType="submit"
                className="button-green"
                onClick={handleSave}
              >
                Save
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <div className="payment-management-container flex-col">
        <div className="header">Payment card management</div>
        <div className="warning">* We will kept this part secret</div>
        <div className="credit-card">{data.credit.map(renderCreditCard)}</div>
        <div className="add-card flex-row">
          <Button
            htmlType="submit"
            className="button-green"
            onClick={showModalCredit}
          >
            Add payment card
          </Button>
          <Modal
            visible={visibleCredit}
            centered
            confirmLoading={confirmLoading}
            onCancel={handleCancelCredit}
            //width={800}
            footer={false}
          >
            <div className="add-creditcard-modal flex-col">
              <Form
                {...modalCreditLayout}
                name="basic"
                initialValues={{ remember: true }}
              >
                <div className="creditcard-header flex-row">
                  <p>Credit card</p>
                  <img src={visa} />
                </div>
                <Form.Item label="Card Number" name="Card Number">
                  <Input />
                </Form.Item>
                <Form.Item label="Card Name" name="Card Name">
                  <Input />
                </Form.Item>
                <Form.Item label="Expiry Date" name="Expiry Date">
                  <Input />
                </Form.Item>
                <Form.Item label="CVV" name="CVV">
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
          <img src={visa} />
        </div>
      </div>
      <div className="account-management flex-col">
        <div className="header">Account management</div>
        <div className="warning">* This part will affect your account</div>
        <div className="button group flex-row">
          <Link to="/password/reset">
            <Button htmlType="submit" className="button-green">
              Change password
            </Button>
          </Link>
          <Button
            htmlType="submit"
            className="button-red"
            onClick={showModalDelete}
          >
            Delete account
          </Button>
          <Modal
            visible={visibleDelete}
            centered
            onCancel={handleCancelDelete}
            footer={false}
          >
            <div className="delete-account-modal flex-col">
              <div className="header flex-row">
                <FontAwesomeIcon
                  className="alert-icon"
                  icon={faExclamationCircle}
                />
                <p>Are you sure you want to delete this account ?</p>
              </div>
              <div className="button-group flex-row">
                <Link to="/login">
                  <Button
                    htmlType="submit"
                    className="button-yes"
                    onClick={handleYes}
                  >
                    Yes
                  </Button>
                </Link>
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

export default Editprofile;
