import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const getCart = async () => {
    try {
        return await axios.get(API_URL + `/carts`, {
          headers: {
            'Authorization': authHeader()
        }});
      } catch (error) {
        throw error;
      }
}

export const addCart = async (data) => {
    try {
    return await axios.post(API_URL + `/carts/add`, data, {
        headers: {
            'Authorization': authHeader()
        }});
    } catch (error) {
        throw error 
    }
}

export const updateCart = async (data) => {
    try {
    return await axios.post(API_URL + `/carts/update`, data, { 
        headers: {
            'Authorization': authHeader()
        }});
    } catch (error) {
        throw error 
    }
}

export const deleteProduct = async (product_id) => {
  try {
    return await axios.delete(API_URL + `/carts/delete/${product_id}`, {
        headers: {
            'Authorization': authHeader()
        }});
  } catch (error) {
      throw error 
  }
}

export const checkout = async (data) => {
    try {
        return await axios.post(API_URL + '/checkout', {'items':data}, {
            headers: {
                'Authorization': authHeader()
            }
        })
    } catch (error) {
        throw error
    }
}

export const getHistory = async () => {
    try {
        return await axios.get(API_URL + '/history', {
            headers: {
                'Authorization': authHeader()
            }
        })
    } catch (error) {
        throw error
    }
}

