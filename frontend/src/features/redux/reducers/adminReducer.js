import * as actionType from '../constants/adminConstants'

const adminUserListInitialState = {
    loading: false,
    users: null,
    error: null,
}

export const adminUserListReducer = (state = adminUserListInitialState, action) => {
    switch (action.type) {

        case actionType.ADMIN_LIST_REQUEST:
            return {
                ...state, 
                loading:true
            };

        case actionType.ADMIN_LIST_SUCCESS:
            return {
                ...state, 
                loading:false, 
                users: action.payload
            };

        case actionType.ADMIN_LIST_FAIL:
            return {
                ...state, 
                loading:false, 
                error: action.payload
            };
        
        default:
            return state;

    }
};

export const userDetailsReducer = (state = adminUserListInitialState, action) => {
    switch (action.type) {

        case actionType.USER_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
            };
            
        case actionType.USER_DETAILS_SUCCESS:
            return {
                loading:false,
                user: action.payload,
            };

        case actionType.USER_DETAILS_FAIL:
            return {
                loading:false, 
                error: action.payload,
            };
        
        default:
            return state;

    }
};

