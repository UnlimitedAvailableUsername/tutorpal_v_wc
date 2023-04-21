import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userDetailsReducer, userUpdateProfileReducer, userRegisterReducer, } from "./reducers/authUserReducer";
import { tutorListReducer, tutorDetailsReducer, admintutorListReducer } from "./reducers/tutorReducer";
import { adminUserListReducer } from "./reducers/adminReducer";
import { scheduleListReducer, scheduleDetailsReducer, } from "./reducers/scheduleReducer";
import { addContactReducer } from "./reducers/contactReducer";
import { contactDetailsReducer, contactListReducer, } from "./reducers/contactReducer";
import { listReviewsReducer, reviewReducer } from "./reducers/reviewsReducer";
import { scheduleOrderDetailsReducer, scheduleOrderListReducer, scheduleOrderPayReducer } from "./reducers/scheduleOrderReducer";
import { studentsListReducer, studentDetailsReducer } from "./reducers/studentsReducer"
import {addSubjectReducer, subjectDetailsReducer, subjectListReducer } from "../redux/reducers/subjectReducer";



const reducers = combineReducers({
  userState: userLoginReducer,
  userDetails: userDetailsReducer,
  userUpdateProfle: userUpdateProfileReducer,
  userRegister: userRegisterReducer,

  studentsListState: studentsListReducer,
  studentDetailsState: studentDetailsReducer,
  
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
  scheduleOrderListState: scheduleOrderListReducer,

  adminlistTutors: admintutorListReducer,
  userDetails: userDetailsReducer,
  userList: adminUserListReducer,

  addSubject : addSubjectReducer,
  subjectList : subjectListReducer,
  subjectDetails: subjectDetailsReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

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
