import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

const header = {
  "Content-Type": "application/json",
  Authorization: authHeader(),
};

export const getOrderHistory = async () => {
  try {
    console.log("data", header);
    return await axios.get(API_URL + "/history", {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get order history");
    throw error;
  }
};

export const postUsePromotion = async (values) => {
  try {
    return await axios.post(API_URL + "/payment/promotion", values, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error use promotions");
    throw error;
  }
};

export const postPaymentByCredit = async (values) => {
  try {
    return await axios.post(API_URL + "/payment/creditcard", values, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error payment by credit card");
    throw error;
  }
};

export const postPaymentByQR = async (values) => {
  try {
    return await axios.post(API_URL + "/payment/qr", values, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error payment by qr");
    throw error;
  }
};

export const postCancelOrder = async (values) => {
  try {
    return await axios.post(API_URL + "/payment/cancel", values, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error cancel order");
    throw error;
  }
};
