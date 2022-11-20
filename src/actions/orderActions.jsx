import axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, RESET_CART, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, SET_TOTAL_PAYPAL_ORDER_REQUEST, SET_TOTAL_PAYPAL_ORDER_SUCCESS, SET_TOTAL_PAYPAL_ORDER_FAIL } from "../constants/orderConstants";

export const createOrders = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/order', order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
        // console.log('==', data)

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
        console.log('==', error)
    }
}

export const setTotalOrderPayPal = (total) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SET_TOTAL_PAYPAL_ORDER_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        console.log('==tttt', total)
        var data = JSON.stringify({
            "total": (total / 25000).toString()
        });
        
        var config = {
            method: 'post',
            url: 'http://localhost:5000/api/pay',
            headers: {
                'Authorization': `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify('data', response.data));
                // console.log('===data', response.data);
                // dispatch({
                //     type: SET_TOTAL_PAYPAL_ORDER_SUCCESS,
                //     payload: response.data,
                // })
            })

        // console.log('==', data)

    } catch (error) {
        dispatch({
            type: SET_TOTAL_PAYPAL_ORDER_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
        console.log('==', error)
    }
}

export const resetCart = () => (dispatch) => {
    localStorage.removeItem('cartItems')
    dispatch({ type: RESET_CART })
}

export const getOrder = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_ORDER_REQUEST
        })

        const { data } = await axios.get('http://localhost:5000/api/order')

        dispatch({
            type: GET_ORDER_SUCCESS,
            payload: data,
        })

    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
    }
}

export const listOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST })

        const { data } = await axios.get(`http://localhost:5000/api/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.errMessage ? error.response.data.errMessage : error.message,
        })
    }
}

//Admin
// Admin Order
export const deleteOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`http://localhost:5000/api/order/${id}`, config)

        dispatch({
            type: ORDER_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: ORDER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateOrder = (id, status) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`http://localhost:5000/api/order/${id}`, { status }, config)
        // console.log('==', data);

        dispatch({
            type: ORDER_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ORDER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}