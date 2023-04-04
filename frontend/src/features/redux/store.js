import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userRegisterReducer, } from "./reducers/authUserReducer";
import { tutorListReducer, tutorDetailsReducer } from "./reducers/tutorReducer";
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import { subjectDetailReducer, subjectsListReducer } from "./reducers/subjectReducer";
import { contactDetailsReducer, contactListReducer } from "./reducers/contactReducer";
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from '../redux/reducers/orderReducers'
 
const reducers = combineReducers({
    userState: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfle: userUpdateProfileReducer,
    userRegister: userRegisterReducer,
    tutorList: tutorListReducer,
    tutorDetails: tutorDetailsReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    subjectList: subjectsListReducer,
    subjectDetails: subjectDetailReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    contactList: contactListReducer,
    contactDetails: contactDetailsReducer,
    
    
});

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

// const cartItemsFromStorage = localStorage.getItem('cartItems') ?
//     JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = { 

    // cart: {
    //     cartItems: cartItemsFromStorage,
    // },

    userState: {
        userInfo: userInfoFromStorage,
      }
}


const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;