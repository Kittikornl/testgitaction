import axios from "axios";
import authHeader from "./auth-header";

const header = {
  "Content-Type": "application/json",
  Authorization: authHeader(),
};

export const getHomeData = async () => {
  try {
    return await axios.get("/homepage", { headers: header });
  } catch (error) {
    console.log("error get homedata");
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    return await axios.get("/products", { headers: header });
  } catch (error) {
    console.log("error get all products");
    throw error;
  }
};

export const getAllShop = async () => {
  try {
    return await axios.get("/shops", { headers: header });
  } catch (error) {
    console.log("error get all shops");
    throw error;
  }
};

export const getRandomPromotion = async () => {
  try {
    return await axios.get("/payment/promotion", { headers: header });
  } catch (error) {
    console.log("error get promotion");
    throw error;
  }
};
