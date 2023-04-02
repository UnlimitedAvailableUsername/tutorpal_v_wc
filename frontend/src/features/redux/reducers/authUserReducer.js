import * as actionType from '../constants/constants';
// Pls wag nyo na galawin ito if di niyo gets

import {USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL, USER_LOGOUT,} from "../constants/constants"


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    userInfo: null,
    error: null,
}

export const userLoginReducer = (state = initialState, action) => {

    switch(action.type) {
        case actionType.USER_LOGIN_REQUEST:
            return { 
                ...state, 
                loading: true,
                error: null
            };

        case actionType.USER_LOGIN_SUCCESS:
            return { 
                ...state, 
                loading: false,
                isAuthenticated: true, 
                userInfo: action.payload 
            };

        case actionType.USER_LOGIN_FAIL:
            localStorage.removeItem('token')
            return { 
                ...state, 
                loading: false, 
                token: null, 
                error: action.payload 
            };

        case actionType.USER_LOGOUT:
            localStorage.removeItem('userInfo', 'token')
            return {
                ...state
            };

        default:
            return state;
            
    }
}

/* REDUCER USED IN UPDATING USER DETAILS IN ProfileScreen COMPONENT */
export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.USER_UPDATE_PROFILE_REQUEST:
            return {
                loading: true,
            };

        case actionType.USER_UPDATE_PROFILE_SUCCESS:
            return {
                loading: false,
                success: true,
                user: action.payload,
            };

        case actionType.USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case actionType.USER_UPDATE_PROFILE_RESET:
            return {}; /* RESET STATE */

        default:
            return state;
    }
};

/* REDUCER USED IN GETTING USER DETAILS IN ProfileScreen COMPONENT */
export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case actionType.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case actionType.USER_DETAILS_SUCCESS:
            return {
                loading: false,
                user: action.payload,
            };

        case actionType.USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case actionType.USER_DETAILS_RESET:
            return {
                user: {},
            };

        default:
            return state;
    }
};


/* REDUCER USED IN USER REGISTRATION IN RegisterScreen COMPONENT */
export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_REGISTER_REQUEST:
        return {
          loading: true,
        };
  
      case USER_REGISTER_SUCCESS:
        return {
          loading: false,
          userInfo: action.payload,
        };
  
      case USER_REGISTER_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
        case actionType.USER_LOGOUT:
            localStorage.removeItem('userInfo', 'token')
            return {
                ...state
            };

      default:
        return state;
    }
  };