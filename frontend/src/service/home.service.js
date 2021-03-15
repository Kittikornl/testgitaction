import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const getHomeData = async () => {
  try {
    return await axios.get(API_URL + "/homepage");
  } catch (error) {
    console.log("error get homedata");
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    return await axios.get(API_URL + "/products");
  } catch (error) {
    console.log("error get allprpducts");
    throw error;
  }
};
