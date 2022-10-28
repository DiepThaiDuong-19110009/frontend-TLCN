import { combineReducers, legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer, productDetailsReducer, categoryListReducer, cateogryDetailsReducer,
    productDeleteReducer, productCreateReducer, productUpdateReducer,
    categoryDeleteReducer, categoryCreateReducer, categoryUpdateReducer,
    commentCreateReducer
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
    userLoginReducer, userRegisterReducer, userDetailsReducer,
    userUpdateProfileReducer, userChangePasswordReducer, userForgotPasswordReducer,
    userListReducer, userDeleteReducer, userUpdateReducer
} from './reducers/userReducers'
import { orderCreateReducer, getOrderReducer, orderDeleteReducer, orderUpdateReducer, orderDetailsReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    categoryList: categoryListReducer,
    categoryDetails: cateogryDetailsReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    commentCreate: commentCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userChangePassword: userChangePasswordReducer,
    userForgotPassword: userForgotPasswordReducer,
    orderCreate: orderCreateReducer,
    orderList: getOrderReducer,
    orderDetails: orderDetailsReducer,
    // Admin
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    categoryDelete: categoryDeleteReducer,
    categoryCreate: categoryCreateReducer,
    categoryUpdate: categoryUpdateReducer,
    orderDelete: orderDeleteReducer,
    orderUpdate: orderUpdateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store