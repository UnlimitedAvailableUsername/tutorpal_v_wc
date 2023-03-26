import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from "./reducers/authUserReducer";
import {tutorListReducer, tutorDetailsReducer } from "./reducers/tutorReducer";
import {productListReducer, productDetailsReducer } from './reducers/productReducer';
import { subjectDetailReducer, subjectsListReducer } from "./reducers/subjectReducer";

const reducers = combineReducers({
    userState: userLoginReducer,
    tutorList: tutorListReducer,
    tutorDetails: tutorDetailsReducer,
    productList: productListReducer,
    productDetails: productDetailsReducer,
    subjectList: subjectsListReducer,
    subjectDetails: subjectDetailReducer,
    
});

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = { 
    userState: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: false,
        userInfo: userInfoFromStorage,
        error: null,
      }
}


const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;