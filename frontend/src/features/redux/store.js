import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/authUserReducer";
import { tutorListReducer, tutorDetailsReducer } from "./reducers/tutorReducer";
import { productListReducer, productDetailsReducer } from './reducers/productReducer';
import { subjectDetailReducer, subjectsListReducer } from "./reducers/subjectReducer";

const reducers = combineReducers({
    userState: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfle: userUpdateProfileReducer,
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