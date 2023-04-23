import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer, userUpdateProfileReducer, userRegisterReducer, initialLoginState, } from "./reducers/authUserReducer";

import { adminUserListReducer, adminReviewListReducer, userDetailsReducer} from "./reducers/adminReducer";
import { tutorListReducer, tutorDetailsReducer, admintutorListReducer} from "./reducers/tutorReducer";
import { scheduleListReducer, scheduleDetailsReducer, } from "./reducers/scheduleReducer";
import { addContactReducer } from "./reducers/contactReducer";
import { contactDetailsReducer, contactListReducer, } from "./reducers/contactReducer";
import { listReviewsReducer, reviewReducer } from "./reducers/reviewsReducer";
import { scheduleOrderDetailsReducer, scheduleOrderListReducer, scheduleOrderPayReducer } from "./reducers/scheduleOrderReducer";
import { studentsListReducer, studentDetailsReducer } from "./reducers/studentsReducer"
import {addSubjectReducer, subjectDetailsReducer, subjectListReducer, subjecttutorListReducer } from "../redux/reducers/subjectReducer";

const reducers = combineReducers({
  userState: userLoginReducer,
  userUpdateProfileState: userUpdateProfileReducer,
  userRegisterState: userRegisterReducer,

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
  userList: adminUserListReducer,
  reviewList: adminReviewListReducer,
  adminuserdetails : userDetailsReducer,

  addSubject : addSubjectReducer,
  subjectList : subjectListReducer,
  subjectDetails: subjectDetailsReducer,
  subjectTutorList: subjecttutorListReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userState: {
    ...initialLoginState,
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
