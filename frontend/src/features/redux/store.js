import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userRegisterReducer, } from "./reducers/authUserReducer";
import { tutorListReducer, tutorDetailsReducer, admintutorListReducer } from "./reducers/tutorReducer";
import { scheduleListReducer, scheduleDetailsReducer, } from "./reducers/scheduleReducer";
import { addContactReducer } from "./reducers/contactReducer";
import { contactDetailsReducer, contactListReducer, } from "./reducers/contactReducer";
import { listReviewsReducer, reviewReducer } from "./reducers/reviewsReducer";
import { scheduleOrderDetailsReducer, scheduleOrderListMineReducer, scheduleOrderListWithMeReducer, scheduleOrderPayReducer } from "./reducers/scheduleOrderReducer";

const reducers = combineReducers({
  userState: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfle: userUpdateProfileReducer,
  userRegister: userRegisterReducer,

  tutorList: tutorListReducer,
  tutorDetails: tutorDetailsReducer,

  scheduleList: scheduleListReducer,
  scheduleDetails: scheduleDetailsReducer,

  reviewState: reviewReducer,
  reviewListState: listReviewsReducer,

  contactUsFormState: addContactReducer,
  contactList: contactListReducer,
  contactDetails: contactDetailsReducer,

  scheduleOrderState: scheduleOrderDetailsReducer,
  scheduleOrderPayState: scheduleOrderPayReducer,
  scheduleOrderListMineState: scheduleOrderListMineReducer,
  scheduleOrderListWithMeState: scheduleOrderListWithMeReducer,

  adminlistTutors: admintutorListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// const cartItemsFromStorage = localStorage.getItem('cartItems') ?
//     JSON.parse(localStorage.getItem('cartItems')) : []

const initialState = {
  userState: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];

const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
