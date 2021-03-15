import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const getProduct = async (id) => {
    try {
      return await axios.get(API_URL + `/products/${id}`);
    } catch (error) {
      console.log("error get product");
      throw error;
    }
};

export const postAddProduct = async (values) => {
    try {
      return await axios.post(API_URL + "/products", values, {
        headers: authHeader(),
      });
    } catch (error) {
      console.log("error add product");
      throw error;
    }
};


