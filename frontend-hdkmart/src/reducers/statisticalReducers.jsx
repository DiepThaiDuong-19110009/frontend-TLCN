import { STATISTICAL_INCOME_FAIL, STATISTICAL_INCOME_REQUEST, STATISTICAL_INCOME_SUCCESS } from "../constants/statisticalConstants"

export const incomeListReducer = (state = { income: [] }, action) => {
    switch (action.type) {
        case STATISTICAL_INCOME_REQUEST:
            return { loadings: true, income: [] }
        case STATISTICAL_INCOME_SUCCESS:
            return { loadings: false, income: action.payload }
        case STATISTICAL_INCOME_FAIL:
            return { loadings: false, errors: action.payload }
        default:
            return state
    }
}