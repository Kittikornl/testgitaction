import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { useHistory } from 'react-router-dom'

const API_URL = 'http://localhost:8080/api'


export const login = async (email, password) => {
    return await axios
    .post(API_URL + '/users/login', {email, password})
    .then(response => {
        console.log(response);
        if (response.data.token) {
            sessionStorage.setItem('user', JSON.stringify(response.data))
        }
        return response.data
    })
}

export const getUserInfo = () => {
    try {
        const token = sessionStorage.getItem('user')
        const user_info = jwt_decode(token)
        const info = {}
        info['userId'] = user_info['userID']
        info['role'] = user_info['role']
        return info
    } catch (error) {
        return false
    }
    
}

export const logout = () => {
    sessionStorage.removeItem('user')
}

export const getCurrentUser = () => {
    return JSON.parse(sessionStorage.getItem('user'))
}
