import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const getShopData = async (id) => {
  try {
    return await axios.get(API_URL + `/shops/${id}`, { headers: authHeader() });
  } catch (error) {
    console.log("error get shopdata");
    throw error;
  }
};
