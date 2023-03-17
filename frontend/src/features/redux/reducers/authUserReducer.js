import * as actionType from '../constants';


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

        default:
            return state;
            
    }
}