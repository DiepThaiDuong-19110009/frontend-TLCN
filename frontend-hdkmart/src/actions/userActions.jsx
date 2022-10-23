import {
    USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS,
    USER_CHANGEPASSWORD_REQUEST, USER_CHANGEPASSWORD_SUCCESS, USER_CHANGEPASSWORD_FAIL,
    USER_FORGOTPASSWORD_REQUEST, USER_FORGOTPASSWORD_SUCCESS, USER_FORGOTPASSWORD_FAIL,
    USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL,
    USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_LIST_RESET, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

import axios from 'axios'

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/signin', { email, password }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
    }
}

// Logout
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
    dispatch({ type: USER_LIST_RESET })
}

// Register
export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/signup', { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
    }
}

//user Detail
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/user/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

//Update Info
export const updateUserProfile = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/user/${id}`, user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

// Change Password
export const changePassword = (email, oldPassword, newPassword) => async (dispatch) => {
    try {
        dispatch({
            type: USER_CHANGEPASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/change-password', { email, oldPassword, newPassword }, config)

        dispatch({
            type: USER_CHANGEPASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_CHANGEPASSWORD_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.response.data.message,
        })
        console.log('==', error.response);
    }
}

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: USER_FORGOTPASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/forgot-password', { email }, config)

        dispatch({
            type: USER_FORGOTPASSWORD_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_FORGOTPASSWORD_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
// Admin
//List user Admin
export const listUsers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get('http://localhost:5000/api/user', config)

        dispatch({
            type: USER_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

//Delete user Admin
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`http://localhost:5000/api/user/${id}`, config)

        dispatch({
            type: USER_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

//Update user Admin
export const updateUser = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/user/${user._id}`, user, config)

        dispatch({
            type: USER_UPDATE_SUCCESS
        })

        dispatch({
            type: USER_DELETE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}