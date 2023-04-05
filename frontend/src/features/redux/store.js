import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from "./reducers/authUserReducer";
import { tutorListReducer, tutorDetailsReducer } from "./reducers/tutorReducer";
import { scheduleListReducer, scheduleDetailsReducer } from './reducers/scheduleReducer';
import { addContactReducer } from "./reducers/contactReducer";


const reducers = combineReducers({
    userLoginState: userLoginReducer,
    userRegisterState: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfileState: userUpdateProfileReducer,

    contactUsFormState: addContactReducer,

    tutorList: tutorListReducer,
    tutorDetails: tutorDetailsReducer,

    scheduleListState: scheduleListReducer,
    scheduleDetailsState: scheduleDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState = { 
    userLoginState: { userInfo: userInfoFromStorage, }
}

const middleware = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;