import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_FAIL, ORDER_UPDATE_RESET, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, SET_TOTAL_PAYPAL_ORDER_REQUEST, SET_TOTAL_PAYPAL_ORDER_SUCCESS, SET_TOTAL_PAYPAL_ORDER_FAIL } from "../constants/orderConstants";

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const getOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return { loading: true, orders: [] }
        case GET_ORDER_SUCCESS:
            return { loading: false, orders: action.payload }
        case GET_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { loading: true, ...state }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const totalPayPalReducer = (state = { total: {} }, action) => {
    switch (action.type) {
        case SET_TOTAL_PAYPAL_ORDER_REQUEST:
            return { loading: true, ...state }
        case SET_TOTAL_PAYPAL_ORDER_SUCCESS:
            return { loading: false, total: action.payload }
        case SET_TOTAL_PAYPAL_ORDER_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//Admin - Order
export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true }
        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderUpdateReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case ORDER_UPDATE_REQUEST:
            return { loading: true }
        case ORDER_UPDATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_UPDATE_RESET:
            return { order: {} }
        default:
            return state
    }
}