import axios from "axios";
import authHeader from "./auth-header";

<<<<<<< HEAD
const API_URL = "http://localhost:8080/api";

=======
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
const header = {
  "Content-Type": "application/json",
  Authorization: authHeader(),
};

export const getUserData = async (id) => {
  try {
<<<<<<< HEAD
    return await axios.get(API_URL + `/users/${id}`, {
=======
    return await axios.get(`/users/${id}`, {
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
      headers: {
        Authorization: authHeader(),
      },
    });
  } catch (error) {
    console.log("error get userdata");
    throw error;
  }
};

export const postRegister = async (values) => {
  try {
<<<<<<< HEAD
    return await axios.post(API_URL + "/users", values);
=======
    return await axios.post("/users", values);
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
  } catch (error) {
    console.log("error register");
    throw error;
  }
};

export const postResetPassword = async (values) => {
  try {
<<<<<<< HEAD
    return await axios.post(API_URL + "/users/reset-pwd", values);
=======
    return await axios.post("/users/reset-pwd", values);
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
  } catch (error) {
    console.log("error reset password");
    throw error;
  }
};

export const patchChangePassword = async (userId, values) => {
  try {
<<<<<<< HEAD
    return await axios.patch(API_URL + `/users/${userId}/change-pwd`, values, {
=======
    return await axios.patch(`/users/${userId}/change-pwd`, values, {
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
      headers: header,
    });
  } catch (error) {
    console.log("error change password");
    throw error;
  }
};

export const putEditProfile = async (userId, values) => {
  try {
<<<<<<< HEAD
    return await axios.put(API_URL + `/users/${userId}`, values, {
=======
    return await axios.put(`/users/${userId}`, values, {
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
      headers: header,
    });
  } catch (error) {
    console.log("error edit profile");
    throw error;
  }
};

export const deleteProfile = async (userId) => {
  try {
<<<<<<< HEAD
    return await axios.delete(API_URL + `/users/${userId}`, {
=======
    return await axios.delete(`/users/${userId}`, {
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
      headers: header,
    });
  } catch (error) {
    console.log("error delete profile");
    throw error;
  }
};

export const getShopByUserID = async (userId) => {
  try {
<<<<<<< HEAD
    const result = await axios.get(API_URL + `/users/${userId}`, {
=======
    const result = await axios.get(`/users/${userId}`, {
>>>>>>> 3ec06303f517f95a64a143339d6433509ca51f93
      headers: header,
    });
    const userData = result.data;
    return userData.shop_information;
  } catch (error) {
    console.log("error delete profile");
    throw error;
  }
};
