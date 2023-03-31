import * as actionType from '../constants/constants';

import {
    
    USER_LOGIN_SUCCESS,
    
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET} from "../constants/constants"



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

/* REDUCER USED IN GETTING USER DETAILS IN ProfileScreen COMPONENT */
export const userDetailsReducer = (state =  { user: {} }, action) => {
    switch (action.type) {
      case USER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case USER_DETAILS_SUCCESS:
        return {
          loading: false,
          user: action.payload,
        };
  
      case USER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case USER_DETAILS_RESET:
        return {
          user: {},
        };
  
      default:
        return state;
    }
  };
  
  /* REDUCER USED IN UPDATING USER DETAILS IN ProfileScreen COMPONENT */
  export const userUpdateProfileReducer = (state = {}, action) => {
    switch (action.type) {
      case USER_UPDATE_PROFILE_REQUEST:
        return {
          loading: true,
        };
  
      case USER_UPDATE_PROFILE_SUCCESS:
        return {
          loading: false,
          success: true,
          user: action.payload,
        };
  
      case USER_UPDATE_PROFILE_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case USER_UPDATE_PROFILE_RESET:
        return {}; /* RESET STATE */
  
      default:
        return state;
    }
  };