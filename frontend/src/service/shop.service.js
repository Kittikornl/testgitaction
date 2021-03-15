import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api";

export const getTopSelling = async () => {
  try {
    return await axios.get(API_URL + `/products/top-selling`);
  } catch (error) {
    console.log("error get topselling");
    throw error;
  }
};

export const getNewArrival = async () => {
  try {
    return await axios.get(API_URL + `/products/new-arrival`);
  } catch (error) {
    console.log("error get newarrival");
    throw error;
  }
};
