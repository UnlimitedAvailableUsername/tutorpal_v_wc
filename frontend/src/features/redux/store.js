import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userReducer } from "./reducers/authUserReducer";
import { tutorListReducer, tutorDetailsReducer } from "./reducers/tutorReducer";
import { addContactReducer, listContactDetailsReducer, listContactReducer } from "./reducers/contactReducer";
import { scheduleListMineReducer, scheduleReducer } from "./reducers/scheduleReducer";
import { listReviewsOfTutor } from "./actions/reviewsActions";
import { reviewReducer } from "./reducers/reviewsReducer";


const reducers = combineReducers({
    userAuthenticatedState: userReducer,

    contactUsFormState: addContactReducer,
    contactListState: listContactReducer,
    contactDetailsState: listContactDetailsReducer,

    tutorList: tutorListReducer,
    tutorDetails: tutorDetailsReducer,

    scheduleListMineState: scheduleListMineReducer,
    scheduleState: scheduleReducer,

    reviewsListState: listReviewsOfTutor,
    reviewsState: reviewReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = { 
    userAuthenticatedState: {
        loading: null,
        error: null,
        success: null,
        authenticated: !!userInfoFromStorage,
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