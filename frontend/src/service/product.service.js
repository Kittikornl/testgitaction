import axios from "axios";
import authHeader from "./auth-header";

const header = {
  'Content-Type': 'application/json',
  'Authorization': authHeader()
}

export const getProduct = async (id) => {
  try {
    return await axios.get(`/products/${id}`, { 
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
    return await axios.post("/products", values, { 
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
    return await axios.put(`/products/${id}`, values, { 
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
    return await axios.delete(`/products/${id}`, { 
      headers: {
          'Authorization': authHeader()
      }});
  } catch (error) {
    console.log("error delete product");
    throw error;
  }
};

export const getReviewProduct = async (id) => {
  try {
    return await axios.get(`/products/${id}/reviews`, { 
      headers: {
          'Authorization': authHeader()
      }});
  } catch (error) {
    console.log("error get review product");
    throw error;
  }
}

