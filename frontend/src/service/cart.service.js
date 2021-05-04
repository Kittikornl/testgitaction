import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "api";

export const getCart = async () => {
    try {
        return await axios.get(`/carts`, {
          headers: {
            'Authorization': authHeader()
        }});
      } catch (error) {
        throw error;
      }
}

export const addCart = async (data) => {
    try {
    return await axios.post(`/carts/add`, data, {
        headers: {
            'Authorization': authHeader()
        }});
    } catch (error) {
        throw error 
    }
}

export const updateCart = async (data) => {
    try {
    return await axios.post(`/carts/update`, data, { 
        headers: {
            'Authorization': authHeader()
        }});
    } catch (error) {
        throw error 
    }
}

export const deleteProduct = async (product_id) => {
  try {
    return await axios.delete(`/carts/delete/${product_id}`, {
        headers: {
            'Authorization': authHeader()
        }});
  } catch (error) {
      throw error 
  }
}

export const checkout = async (data) => {
    try {
        return await axios.post('/checkout', {'items':data}, {
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
        return await axios.get('/history', {
            headers: {
                'Authorization': authHeader()
            }
        })
    } catch (error) {
        throw error
    }
}

export const getHistoryFilter = async (status) => {
    try {
        return await axios.get(`/history/filter/${status}`, {
            headers: {
                'Authorization': authHeader()
            }
        })
    } catch (error) {
        throw error
    }
}

