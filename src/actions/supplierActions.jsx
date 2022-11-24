import axios from "axios"
import { PRODUCT_SUPPLIER_DETAILS_FAIL, PRODUCT_SUPPLIER_DETAILS_REQUEST, PRODUCT_SUPPLIER_DETAILS_SUCCESS, PRODUCT_SUPPLIER_FAIL, PRODUCT_SUPPLIER_REQUEST, PRODUCT_SUPPLIER_SUCCESS, SUPPLIER_CREATE_FAIL, SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_SUCCESS, SUPPLIER_DELETE_FAIL, SUPPLIER_DELETE_REQUEST, SUPPLIER_DELETE_SUCCESS, SUPPLIER_UPDATE_FAIL, SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_SUCCESS } from "../constants/supplierConstants"

export const listSupplier = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_SUPPLIER_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/organizer`)

        dispatch({
            type: PRODUCT_SUPPLIER_SUCCESS,
            payload: data   
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_SUPPLIER_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const listSuppllierDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_SUPPLIER_DETAILS_REQUEST })

        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/organizer/${id}`)

        dispatch({
            type: PRODUCT_SUPPLIER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_SUPPLIER_DETAILS_FAIL,
            payload: error.response && error.response.data.errMessage ? error.response.data.errMessage : error.message,
        })
    }
}

// Admin Category
export const deleteSupplier = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUPPLIER_DELETE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`${process.env.REACT_APP_API_URL}/organizer/${id}`, config)

        dispatch({
            type: SUPPLIER_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: SUPPLIER_DELETE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const createSupplier = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUPPLIER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/organizer`, {name: "new SUPPLIER"}, config)

        dispatch({
            type: SUPPLIER_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUPPLIER_CREATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const updateSupplier = (supplier) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SUPPLIER_UPDATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/organizer/${supplier._id}`, supplier, config)

        dispatch({
            type: SUPPLIER_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUPPLIER_UPDATE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}
