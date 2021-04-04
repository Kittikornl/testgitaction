import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

const header = {
  'Content-Type': 'application/json',
  'Authorization': authHeader()
}

export const getProduct = async (id) => {
  try {
    return await axios.get(API_URL + `/products/${id}`, { 
      headers: {
          'Authorization': authHeader()
      }});
  } catch (error) {
    console.log("error get product");
    throw error;
  }
};

export const postAddProduct = async (values) => {
  try {
    return await axios.post(API_URL + "/products", values, { 
      headers: {
          'Authorization': authHeader()
      }});
  } catch (error) {
    console.log("error add product");
    throw error;
  }
};

export const putEditProduct = async (values, id) => {
  try {
    return await axios.put(API_URL + `/products/${id}`, values, { 
      headers: {
          'Authorization': authHeader()
      }});
  } catch (error) {
    console.log("error add product");
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    return await axios.delete(API_URL + `/products/${id}`, { 
      headers: {
          'Authorization': authHeader()
      }});
  } catch (error) {
    console.log("error delete product");
    throw error;
  }
};
