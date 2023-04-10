import * as actionType from "../constants/authUserConstants";

const userInitialState = {
    loading: false,
    error: null,
    success: null,
    authenticated: null,
    userInfo: null,
};

export const userReducer = (state = userInitialState, action) => {
    switch (action.type) {
        case actionType.USER_LOGIN_REQUEST:
        case actionType.USER_REGISTER_REQUEST:
        case actionType.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                success: false,
            };

        case actionType.USER_LOGIN_SUCCESS:
        case actionType.USER_REGISTER_SUCCESS:
        case actionType.USER_DETAILS_SUCCESS:
            return {
                ...state,
                authenticated: true,
                loading: false,
                success: true,
                userInfo: action.payload,
            };

        case actionType.USER_LOGIN_FAIL:
        case actionType.USER_REGISTER_FAIL:
        case actionType.USER_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        case actionType.USER_LOGOUT:
            return {
                ...userInitialState,
            };

        case actionType.USER_UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                success: null,
            };

        case actionType.USER_UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                authenticated: true,
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
                success: null,
            };

        default:
            return state;
    }
};
