import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userRegisterReducer, } from "./reducers/authUserReducer";
import { tutorListReducer, tutorDetailsReducer, tutorReviewCreateReducer } from "./reducers/tutorReducer";
import { scheduleListReducer, scheduleDetailsReducer } from './reducers/scheduleReducer';
import { addContactReducer} from "./reducers/contactReducer";
import { contactDetailsReducer, contactListReducer } from "./reducers/contactReducer";
 
const reducers = combineReducers({
    userState: userLoginReducer,
    userDetails: userDetailsReducer,
    userUpdateProfle: userUpdateProfileReducer,
    userRegister: userRegisterReducer,
    tutorList: tutorListReducer,
    tutorDetails: tutorDetailsReducer,
    tutorReviewCreate: tutorReviewCreateReducer,
    scheduleList: scheduleListReducer,
    scheduleDetails: scheduleDetailsReducer,
    contactUsFormState: addContactReducer, 
    contactList:contactListReducer,
    contactDetails:contactDetailsReducer 
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