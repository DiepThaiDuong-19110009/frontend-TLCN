import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL } from "../constants/orderConstants";

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