import axios from "axios";
import authHeader from "./auth-header";

export const postShipment = async (data) => {
    try {
        return await axios.post(`/shipment`, data, {
          headers: {
            'Authorization': authHeader()
        }});
      } catch (error) {
        throw error;
      }
}

export const postReview = async (data) => {
  try {
    return await axios.post(`/reviews`, data, {
      headers: {
        'Authorization': authHeader()
    }});
  } catch (error) {
    throw error;
  }
}