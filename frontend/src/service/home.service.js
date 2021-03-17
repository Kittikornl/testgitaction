import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

const header = {
  'Content-Type': 'application/json',
  'Authorization': authHeader()
}

export const getHomeData = async () => {
  try {
    return await axios.get(API_URL + "/homepage", { headers: header });
  } catch (error) {
    console.log("error get homedata");
    throw error;
  }
};

export const getAllProduct = async () => {
  try {
    return await axios.get(API_URL + "/products", { headers: header });
  } catch (error) {
    console.log("error get allprpducts");
    throw error;
  }
};
