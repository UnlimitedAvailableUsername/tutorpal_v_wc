import * as actionType from '../constants/authConstants';
// Pls wag nyo na galawin ito if di niyo gets

const userInitialState = {
    loading: false,
    error: null,
    userInfo: null,
    success: null
};

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case actionType.USER_LOGIN_REQUEST:
        case actionType.USER_REGISTER_REQUEST:
        case actionType.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case actionType.USER_LOGIN_SUCCESS:
        case actionType.USER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                userInfo: action.payload
            };

        case actionType.USER_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            };

        case actionType.USER_LOGIN_FAIL:
        case actionType.USER_REGISTER_FAIL:
        case actionType.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        case actionType.USER_LOGOUT:
            return {};

        case actionType.USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                success: null
            };

        case actionType.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                userInfo: action.payload
            };

        case actionType.USER_UPDATE_PROFILE_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            };

        case actionType.USER_UPDATE_PROFILE_RESET:
            return {
                ...state,
                success: null
            };

        default:
            return state;
    }
};
