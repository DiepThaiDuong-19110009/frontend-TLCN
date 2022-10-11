import axios from "axios";
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, RESET_CART, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL } from "../constants/orderConstants";

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
        console.log('==',data)

    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.error,
        })
        console.log('==',error)
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