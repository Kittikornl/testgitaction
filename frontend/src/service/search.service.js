import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const postSearchProduct = async (values) => {
  try {
    return await axios.post(API_URL + `/search`, values);
  } catch (error) {
    console.log("error search");
    throw error;
  }
};
