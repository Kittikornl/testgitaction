import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const getShopData = async (id) => {
  try {
    return await axios.get(API_URL + `/shops/${id}`, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get shopdata");
    throw error;
  }
};

export const getShopOrder = async () => {
  try {
    return await axios.get(API_URL + `/orders`, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get shoporder");
    throw error;
  }
};

export const postShop = async (values) => {
  try {
    return await axios.post(API_URL + "/shops", values, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error create shop");
    throw error;
  }
};

export const editShop = async (id, data) => {
  try {
    return await axios.put(API_URL + `/shops/${id}`, data, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error create shop");
    throw error;
  }
};

export const deleteShop = async (id) => {
  try {
    return await axios.delete(API_URL + `/shops/${id}`, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get shopdata");
    throw error;
  }
};

export const getReviewShop = async (id) => {
  try {
    return await axios.get(API_URL + `/shops/${id}/reviews`, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get shop product");
    throw error;
  }
};
