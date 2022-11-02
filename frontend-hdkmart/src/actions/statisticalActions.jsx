import axios from 'axios'
import { STATISTICAL_INCOME_FAIL, STATISTICAL_INCOME_REQUEST, STATISTICAL_INCOME_SUCCESS } from "../constants/statisticalConstants"

export const getIncome = () => async (dispatch) => {
    try {
        dispatch({ type: STATISTICAL_INCOME_REQUEST })

        const { data } = await axios.get('http://localhost:5000/api/income')

        dispatch({
            type: STATISTICAL_INCOME_SUCCESS,
            payload: data   
        })
    } catch (error) {
        dispatch({
            type: STATISTICAL_INCOME_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}