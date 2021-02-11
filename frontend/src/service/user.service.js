import axios from 'axios'

export const register = async (values) => {
    try {
        return await axios.post('/users', values)
    } catch (error) {
        console.log('error register')
        throw error
    }
}

export const login = async (values) => {
    try {
        return await axios.post('/users/login', values)
    } catch (error) {
        console.log('error login')
        throw error
    }
}

export const changePassword = async (userId, values) => {
    try {
        return await axios.post(`/users/${userId}`, values)
    } catch (error) {
        console.log('error change password')
        throw error
    }
}

export const editProfile = async (userId, values) => {
    try {
        return await axios.patch(`/users/${userId}`, values)
    } catch (error) {
        console.log('error edit profile')
        throw error
    }
}

export const deleteProfile = async (userId) => {
    try {
        return await axios.delete(`/users/${userId}`)
    } catch (error) {
        console.log('error delete profile')
        throw error
    }
}
 
export const resetPassword = async (values) => {
    try {
        return await axios.post('/users/reset-pwd', values)
    } catch (error) {
        console.log('error reset password')
        throw error
    }
}