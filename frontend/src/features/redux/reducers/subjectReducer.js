import {
    SUBJECT_LIST_REQUEST,
    SUBJECT_LIST_SUCCESS,
    SUBJECT_LIST_FAIL,

    SUBJECT_DETAILS_REQUEST,
    SUBJECT_DETAILS_SUCCESS,
    SUBJECT_DETAILS_FAIL,

} from '../constants/subjectConstants'


export const subjectsListReducer = (state = {subjects:[]}, action) => {
    switch (action.type) {
        case SUBJECT_LIST_REQUEST:
            return {loading:true, subjects: []};
        case SUBJECT_LIST_SUCCESS:
            return {loading:false, subjects: action.payload};
        case SUBJECT_LIST_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};


export const subjectDetailReducer = (state = {subject: {}}, action) => {
    switch (action.type) {
        case SUBJECT_DETAILS_REQUEST:
            return {loading:true, subject: {}};
        case SUBJECT_DETAILS_SUCCESS:
            return {loading:false, subject: action.payload};
        case SUBJECT_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};