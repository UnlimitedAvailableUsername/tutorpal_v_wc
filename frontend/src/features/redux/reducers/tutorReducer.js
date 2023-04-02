import {
    TUTOR_LIST_REQUEST,
    TUTOR_LIST_SUCCESS,
    TUTOR_LIST_FAIL,

    TUTOR_DETAILS_REQUEST,
    TUTOR_DETAILS_SUCCESS,
    TUTOR_DETAILS_FAIL,
} from '../constants/tutorConstants'

const initialState = {
    loading: false,
    users: [],
    error: null,
}

export const tutorListReducer = (state = initialState, action) => {
    switch (action.type) {
        case TUTOR_LIST_REQUEST:
            return {...state, loading:true};
        case TUTOR_LIST_SUCCESS:
            return {...state, loading:false, users: action.payload};
        case TUTOR_LIST_FAIL:
            return {...state, loading:false, error: action.payload};
        
        default:
            return state;
    }
};

export const tutorDetailsReducer = (state = {user:[]}, action) => {
    switch (action.type) {
        case TUTOR_DETAILS_REQUEST:
            return {loading:true, ...state};
        case TUTOR_DETAILS_SUCCESS:
            return {loading:false, user: action.payload};
        case TUTOR_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};