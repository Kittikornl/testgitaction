import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const postShipment = async (data) => {
    try {
        return await axios.post(API_URL + `/shipment`, data, {
          headers: {
            'Authorization': authHeader()
        }});
      } catch (error) {
        throw error;
      }
}

export const postReview = async (data) => {
  try {
    return await axios.post(API_URL + `/reviews`, data, {
      headers: {
        'Authorization': authHeader()
    }});
  } catch (error) {
    throw error;
  }
}