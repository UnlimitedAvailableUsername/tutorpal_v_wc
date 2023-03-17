import * as constant from '../constants';


// this is just our initial state. This is almost the same as
// typing (state = {}, action)
const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    userInfo: null,
    error: null,
}

export const userLoginReducer = (state = initialState, action) => {

    switch(action.type) {
        case constant.USER_LOGIN_REQUEST:
            return { ...state, loading: true };

        case constant.USER_LOGIN_SUCCESS:
            return { ...state, isAuthenticated: true, userInfo: action.payload };

        case constant.USER_LOGIN_FAIL:
            localStorage.removeItem('token')
            return { ...state, token: null, error: action.payload };

        default:
            return state;
            
    }
}