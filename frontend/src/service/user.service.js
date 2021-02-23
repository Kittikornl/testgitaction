import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api'

export const postRegister = async (values) => {
    try {
        console.log(values);
        return await axios.post(API_URL + '/users', values)
    } catch (error) {
        console.log('error register')
        throw error
    }
}

export const postChangePassword = async (userId, values) => {
    try {
        return await axios.post(`/users/${userId}`, values, {
            headers: authHeader() 
        })
    } catch (error) {
        console.log('error change password')
        throw error
    }
}

export const patchEditProfile = async (userId, values) => {
    try {
        return await axios.patch(API_URL +`/users/${userId}`, values, {
            headers: authHeader() 
        })
    } catch (error) {
        console.log('error edit profile')
        throw error
    }
}

export const deleteProfile = async (userId) => {
    try {
        return await axios.delete(`/users/${userId}`, {
            headers: authHeader() 
        })
    } catch (error) {
        console.log('error delete profile')
        throw error
    }
}
 
export const postResetPassword = async (values) => {
    try {
        return await axios.post(API_URL + '/users/reset-pwd', values, {
            headers: authHeader() 
        })
    } catch (error) {
        console.log('error reset password')
        throw error
    }
}
