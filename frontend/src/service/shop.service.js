import axios from "axios";
import authHeader from "./auth-header";

export const getShopData = async (id) => {
  try {
    return await axios.get(`/shops/${id}`, {
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
    return await axios.get(`/orders`, {
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
    return await axios.post("/shops", values, {
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
    return await axios.put(`/shops/${id}`, data, {
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
    return await axios.delete(`/shops/${id}`, {
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
    return await axios.get(`/shops/${id}/reviews`, {
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get shop product");
    throw error;
  }
};
