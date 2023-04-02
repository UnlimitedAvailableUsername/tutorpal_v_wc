import {
    CONCERN_LIST_REQUEST,
    CONCERN_LIST_SUCCESS,
    CONCERN_LIST_FAIL,

    CONCERN_DETAILS_REQUEST,
    CONCERN_DETAILS_SUCCESS,
    CONCERN_DETAILS_FAIL,
} from '../constants/concernConstants'

export const ConcernListReducer = (state = {concerns:[]}, action) => {
    switch (action.type) {
        case CONCERN_LIST_REQUEST:
            return {loading:true, concerns: []};
        case CONCERN_LIST_SUCCESS:
            return {loading:false, concerns: action.payload};
        case CONCERN_LIST_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};

export const ConcernDetailsReducer = (state = {concern:[]}, action) => {
    switch (action.type) {
        case CONCERN_DETAILS_REQUEST:
            return {loading:true, ...state};
        case CONCERN_DETAILS_SUCCESS:
            return {loading:false, concern: action.payload};
        case CONCERN_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};