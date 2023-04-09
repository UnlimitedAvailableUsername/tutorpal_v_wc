import * as actionType from '../constants/tutorConstants'


const tutorListInitialState = {
    loading: false,
    users: null,
    error: null,
}

export const tutorListReducer = (state = tutorListInitialState, action) => {
    switch (action.type) {

        case actionType.TUTOR_LIST_REQUEST:
            return {
                ...state, 
                loading:true
            };

        case actionType.TUTOR_LIST_SUCCESS:
            return {
                ...state, 
                loading:false, 
                users: action.payload
            };

        case actionType.TUTOR_LIST_FAIL:
            return {
                ...state, 
                loading:false, 
                error: action.payload
            };
        
        default:
            return state;

    }
};

const tutorDetailsInitialState = {
    loading: false,
    user: null,
    error: null,
}


export const tutorDetailsReducer = (state = tutorDetailsInitialState, action) => {
    switch (action.type) {

        case actionType.TUTOR_DETAILS_REQUEST:
            return {
                ...state,
                loading:true,
            };
            
        case actionType.TUTOR_DETAILS_SUCCESS:
            return {
                loading:false,
                user: action.payload,
            };

        case actionType.TUTOR_DETAILS_FAIL:
            return {
                loading:false, 
                error: action.payload,
            };
        
        default:
            return state;

    }
};

export const tutorReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case actionType.TUTOR_CREATE_REVIEW_REQUEST:
            return { loading: true }

        case actionType.TUTOR_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }

        case actionType.TUTOR_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }

        case actionType.TUTOR_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}
