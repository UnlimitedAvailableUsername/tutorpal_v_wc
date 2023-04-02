import * as actionType from '../constants/authConstants';
// Pls wag nyo na galawin ito if di niyo gets


const loginInitialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    userInfo: null,
    error: null,
}

export const userLoginReducer = (state = loginInitialState, action) => {

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

const profileInitialState = {
    loading: false,
    success: null,
    userInfo: null,
    error: null,
}

export const userUpdateProfileReducer = (state = profileInitialState, action) => {

    switch (action.type) {
        case actionType.USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case actionType.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: action.payload,
            };

        case actionType.USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };

        case actionType.USER_UPDATE_PROFILE_RESET:
            return {
                ...state,
            }; /* RESET STATE */

        default:
            return state;
    }
};

/* REDUCER USED IN GETTING USER DETAILS IN ProfileScreen COMPONENT */

export const userDetailsReducer = (state = profileInitialState, action) => {

    switch (action.type) {
        case actionType.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case actionType.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };

        case actionType.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionType.USER_DETAILS_RESET:
            return {
                ...state,
            };

        default:
            return state;
    }
};
