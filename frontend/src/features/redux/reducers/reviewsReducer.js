import * as actionType from '../constants/reviewsConstants';


const reviewListInitialState = {
    loading: false,
    error: null,
    reviews: null,
};

export const listReviewsReducer = (state = reviewListInitialState, action) => {
    switch (action.type) {
        case actionType.REVIEW_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            };

        case actionType.REVIEW_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload,
            };

        case actionType.REVIEW_LIST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state
    };
};


const reviewInitialState = {
    loading: false,
    error: null,
    success: null,
    review: null,
};

export const reviewReducer = (state = reviewInitialState, action) => {
    switch (action.type) {
        case actionType.REVIEW_ADD_REQUEST:
        case actionType.REVIEW_EDIT_REQUEST:
        case actionType.REVIEW_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                success: null,
            };

        case actionType.REVIEW_ADD_SUCCESS:
        case actionType.REVIEW_EDIT_SUCCESS:
        case actionType.REVIEW_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                review: action.payload,
            };

        case actionType.REVIEW_ADD_FAIL:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
            };

        default:
            return state
    };
};