/* eslint-disable default-case */
import * as actionType from '../constants/contactConstants';

const addContactInitialState = {
    loading: false,
    success: null,
    error: null,
};

export const addContactReducer = (state = addContactInitialState, action) => {
    switch (action.type) {
        case actionType.CONTACT_ADD_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case actionType.CONTACT_ADD_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
            };

        case actionType.CONTACT_ADD_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload
            };

        case actionType.CONTACT_ADD_RESET:
            return {
                ...addContactInitialState,
            }

        default:
            return state;
    }
};

const listContactInitialState = {
    loading: false,
    error: null,
    success: null,
    contacts: null,
};

export const listContactReducer = (state = listContactInitialState, action) => {
    switch (action.type) {
        case actionType.CONTACT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        
        case actionType.CONTACT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                contacts: action.payload,
            };

        case actionType.CONTACT_LIST_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            }

        default:
            return state;
    }
};

const contactDetailsInitialState = {
    loading: false,
    contact: null,
    error: null,
}

export const listContactDetailsReducer = (state = contactDetailsInitialState, action) => {
    switch (action.type) {
        case actionType.CONTACT_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
            
        case actionType.CONTACT_DETAIL_SUCCESS:
            return {
                loading: false,
                contact: action.payload,
            };

        case actionType.CONTACT_DETAIL_FAIL:
            return {
                loading: false, 
                error: action.payload,
            };
        
        default:
            return state;

    }
};