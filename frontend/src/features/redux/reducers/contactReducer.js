import {
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_FAIL,

    CONTACT_DETAILS_REQUEST,
    CONTACT_DETAILS_SUCCESS,
    CONTACT_DETAILS_FAIL,
} from '../constants/contactConstants'

export const contactListReducer = (state = {contacts:[]}, action) => {
    switch (action.type) {
        case CONTACT_LIST_REQUEST:
            return {loading:true, contacts: []};
        case CONTACT_LIST_SUCCESS:
            return {loading:false, contacts: action.payload};
        case CONTACT_LIST_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};

export const contactDetailsReducer = (state = {contact:[]}, action) => {
    switch (action.type) {
        case CONTACT_DETAILS_REQUEST:
            return {loading:true, ...state};
        case CONTACT_DETAILS_SUCCESS:
            return {loading:false, contact: action.payload};
        case CONTACT_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};