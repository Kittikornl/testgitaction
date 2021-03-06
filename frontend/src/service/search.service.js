import axios from "axios";
import authHeader from "./auth-header";

export const postSearchProduct = async (values) => {
  try {
    return await axios.post(`/search`, values, { 
      headers: {
          'Authorization': authHeader()
      }});
  } catch (error) {
    console.log("error search");
    throw error;
  }
};
