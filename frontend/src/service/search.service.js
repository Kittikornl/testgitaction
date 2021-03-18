import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

const header = {
  'Content-Type': 'application/json',
  'Authorization': authHeader()
}

export const postSearchProduct = async (values) => {
  try {
    return await axios.post(API_URL + `/search`, values, { headers: header });
  } catch (error) {
    console.log("error search");
    throw error;
  }
};
