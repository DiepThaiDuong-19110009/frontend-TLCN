import { PRODUCT_SUPPLIER_DETAILS_FAIL, PRODUCT_SUPPLIER_DETAILS_REQUEST, PRODUCT_SUPPLIER_DETAILS_SUCCESS, PRODUCT_SUPPLIER_FAIL, PRODUCT_SUPPLIER_REQUEST, PRODUCT_SUPPLIER_SUCCESS, SUPPLIER_CREATE_FAIL, SUPPLIER_CREATE_REQUEST, SUPPLIER_CREATE_RESET, SUPPLIER_CREATE_SUCCESS, SUPPLIER_DELETE_FAIL, SUPPLIER_DELETE_REQUEST, SUPPLIER_DELETE_SUCCESS, SUPPLIER_UPDATE_FAIL, SUPPLIER_UPDATE_REQUEST, SUPPLIER_UPDATE_RESET, SUPPLIER_UPDATE_SUCCESS } from "../constants/supplierConstants"

export const supplierListReducer = (state = { suppliers: [] }, action) => {
    switch (action.type) {
        case PRODUCT_SUPPLIER_REQUEST:
            return { loadings: true, suppliers: [] }
        case PRODUCT_SUPPLIER_SUCCESS:
            return { loadings: false, suppliers: action.payload }
        case PRODUCT_SUPPLIER_FAIL:
            return { loadings: false, errors: action.payload }
        default:
            return state
    }
}

export const supllierDetailsReducer = (state = { supplier: {} }, action) => {
    switch (action.type) {
        case PRODUCT_SUPPLIER_DETAILS_REQUEST:
            return { loading: true, ...state }
        case PRODUCT_SUPPLIER_DETAILS_SUCCESS:
            return { loading: false, supplier: action.payload }
        case PRODUCT_SUPPLIER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

//Admin - Supplier
export const supplierDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case SUPPLIER_DELETE_REQUEST:
            return { loading: true }
        case SUPPLIER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case SUPPLIER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const supplierCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case SUPPLIER_CREATE_REQUEST:
            return { loading: true }
        case SUPPLIER_CREATE_SUCCESS:
            return { loading: false, success: true, supplier: action.payload }
        case SUPPLIER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case SUPPLIER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const supplierUpdateReducer = (state = { supplier: {} }, action) => {
    switch (action.type) {
        case SUPPLIER_UPDATE_REQUEST:
            return { loading: true }
        case SUPPLIER_UPDATE_SUCCESS:
            return { loading: false, success: true, supplier: action.payload }
        case SUPPLIER_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case SUPPLIER_UPDATE_RESET:
            return { supplier: {} }
        default:
            return state
    }
}