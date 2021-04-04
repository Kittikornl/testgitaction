import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Form, Input, Button, DatePicker, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Editprofile.scss";
import visa from "../img/visa.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import moment from "moment";
import { uploadUserPic } from "../service/firebase.service";
import {
  getUserData,
  putEditProfile,
  deleteProfile,
  patchChangePassword,
} from "../service/user.service";
import { getUserInfo } from "../service/auth.service";
import Notification from "../components/notification";
import profileThumb from "../img/profile_thumb.png";

const Editprofile = (props) => {
  const [data, setData] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [url, setUrl] = useState("");
  const [form] = Form.useForm();
  const [userId, setUserID] = useState(getUserInfo()["userId"]);
  const dateFormat = "DD-MM-YYYY";
  const monthFormat = "MM/YYYY";

  useEffect(() => {
    fetchdata(userId);
  }, []);

  const fetchdata = async (user_id) => {
    const result = await getUserData(user_id);
    const userData = result.data.Userdata;
    setData(userData);
    setUrl(userData.url_profile_pic);
    form.setFieldsValue({
      firstname: `${userData.firstname}`,
      lastname: `${userData.lastname}`,
      phone: `${userData.phoneNo}`,
      houseNo: `${userData.houseNo}`,
      street: `${userData.street}`,
      subDistrict: `${userData.subDistrict}`,
      district: `${userData.district}`,
      city: `${userData.city}`,
      zipcode: `${userData.zipcode}`,
      birthdate: moment(userData.birthdate, dateFormat),
    });
    console.log(userData);
  };

  const CardInfo = (props) => {
    const deleteCard = () => {
      data.credit = data.credit.filter((card) => {
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
    const values = {
      ...fieldsValue,
      "date-picker": fieldsValue["birthdate"].format(dateFormat),
    };
    console.log("Received values of form: ", fieldsValue);
    let paylaod = {};

    paylaod.firstname = fieldsValue.firstname;
    paylaod.lastname = fieldsValue.lastname;
    paylaod.phoneNo = fieldsValue.phone;
    paylaod.url_profile_pic = url;
    paylaod.birthdate = fieldsValue.birthdate.format(dateFormat);
    paylaod.houseNo = fieldsValue.houseNo;
    paylaod.street = fieldsValue.street;
    paylaod.subDistrict = fieldsValue.subDistrict;
    paylaod.district = fieldsValue.district;
    paylaod.city = fieldsValue.city;
    paylaod.zipcode = fieldsValue.zipcode;

    putEditProfile(userId, paylaod);
    console.log(paylaod);

    Notification({
      type: "success",
      message: "Success",
      desc: "Your information have been saved",
    });
  };

  const propsUpload = {
    maxCount: 1,
    beforeUpload: () => false,
    onChange: async (info) => {
      const type = info.file.name.split(".")[1];
      if (type === "png" || type === "jpg") {
        console.log("image", info.file);
        uploadUserPic(info.file, userId, setUrl);
        pageRefresh();
      } else {
        console.error("Type error!");
      }
    },
    showUploadList: false,
  };

  const renderCreditCard = (card, index) => {
    return <CardInfo card={card} pageRefresh={pageRefresh} />;
  };

  const [visibleCredit, setVisibleCredit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleChange, setVisibleChange] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModalCredit = () => {
    setVisibleCredit(true);
  };

  const showModalDelete = () => {
    setVisibleDelete(true);
  };

  const showModalChangePassword = () => {
    setVisibleChange(true);
  };

  const modalCreditLayout = {
    labelCol: { span: 6 },
    wrapperCol: { offset: 1, span: 12 },
  };

  const modalChangePasswordLayout = {
    labelCol: { span: 9 },
    wrapperCol: { offset: 1, span: 12 },
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

  const handleCancelChange = () => {
    setVisibleChange(false);
  };

  const onFinishChangePassword = async (e) => {
    let payload = {};
    if (e.newPassword !== e.confirmNewPassword) {
      Notification({
        type: "error",
        message: "Fail to change password",
        desc: "Confirm Password doesn't match",
      });
    } else {
      try {
        payload["old-pwd"] = e.currentPassword;
        payload["new-pwd"] = e.newPassword;
        const res = await patchChangePassword(userId, payload);
        setVisibleChange(false);
        Notification({
          type: "success",
          message: "Change password success",
          desc: "Your password have been changed",
        });
      } catch {
        Notification({
          type: "error",
          message: "Fail to change password",
          desc: "Current Password incorrect",
        });
      }
    }
  };

  const handleYes = () => {
    setVisibleDelete(false);
    deleteProfile(userId);
  };

  const handleNo = () => {
    setVisibleDelete(false);
  };

  return (
    <div className="editprofile-container flex-col">
      <div className="empty-box"></div>
      <div className="editprofile-page">
        <div className="edit-info">
          <div className="profile flex-row">
            <div className="img-col flex-col">
              {console.log(url)};
              <img src={url === "" ? `${profileThumb}` : `${url}`} />
              <div className="uploadButton">
                <Upload {...propsUpload}>
                  <Button icon={<UploadOutlined />}>Upload photo</Button>
                </Upload>
              </div>
            </div>
            <div className="info-container">
              <Form form={form} name="basic" onFinish={onFinishInfo}>
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
                  <Input className="inputEdit" allowClear />
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
                  <Input className="inputEdit" allowClear />
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
                  <Input className="inputEdit" allowClear />
                </Form.Item>
                <Form.Item label="Address">
                  <div className="flex-row" style={{ columnGap: "20px" }}>
                    <Form.Item name="houseNo">
                      <Input
                        className="input-address m-t-10"
                        placeholder="House number"
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item name="street">
                      <Input
                        className="input-address"
                        placeholder="Street"
                        allowClear
                      />
                    </Form.Item>
                  </div>
                  <div className="flex-row" style={{ columnGap: "20px" }}>
                    <Form.Item name="subDistrict">
                      <Input
                        className="input-address"
                        placeholder="Sub-district"
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item name="district">
                      <Input
                        className="input-address"
                        placeholder="District"
                        allowClear
                      />
                    </Form.Item>
                  </div>
                  <div className="flex-row" style={{ columnGap: "20px" }}>
                    <Form.Item name="city">
                      <Input
                        className="input-address"
                        placeholder="City"
                        allowClear
                      />
                    </Form.Item>
                    <Form.Item name="zipcode">
                      <Input
                        className="input-address"
                        placeholder="Zipcode"
                        allowClear
                      />
                    </Form.Item>
                  </div>
                </Form.Item>
                <Form.Item
                  label="Birth date"
                  name="birthdate"
                  {...configBirthdate}
                  style={{ marginTop: "-20px" }}
                >
                  <DatePicker format={dateFormat} />
                </Form.Item>
                <div className="button-align">
                  <Button htmlType="submit" className="button-green">
                    Save
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>

        <div className="payment-management-container">
          <div className="header">Payment card management</div>
          <div className="warning">* We will kept this part secret</div>
          {/* <div className="credit-card">{data.credit.map(renderCreditCard)}</div> */}
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
              footer={false}
            >
              <div className="add-creditcard-modal">
                <Form
                  {...modalCreditLayout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinishChangePassword}
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
                    <DatePicker format={monthFormat} picker="month" />
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
          <div className="button-group flex-row">
            <Button
              htmlType="submit"
              className="button-green"
              onClick={showModalChangePassword}
            >
              Change password
            </Button>
            <Modal
              visible={visibleChange}
              centered
              onCancel={handleCancelChange}
              footer={false}
              width={600}
            >
              <div className="change-password-modal flex-col">
                <Form
                  {...modalChangePasswordLayout}
                  name="basic"
                  initialValues={{ remember: true }}
                  onFinish={onFinishChangePassword}
                >
                  <div className="change-password-header flex-row">
                    <p>Change Password</p>
                  </div>
                  <Form.Item
                    label="Current Password"
                    name="currentPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your current password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your new password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    label="Confirm New Password"
                    name="confirmNewPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <div className="button-container">
                    <Button htmlType="submit" className="button-green">
                      Change Password
                    </Button>
                  </div>
                </Form>
              </div>
            </Modal>

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
    </div>
  );
};

export default Editprofile;
