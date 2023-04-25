import * as actionType from '../constants/adminConstants'
import * as reviewAction from "../constants/reviewsConstants";


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

const adminUserInitialState = {
    loading: false,
    user: null,
    error: null,
}

export const userDetailsReducer = (state = adminUserInitialState, action) => {
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


const InitialState = {
    loading: false,
    data: {},
    error: null,
}


export const adminReviewListReducer = (state = InitialState, action) => {
    switch (action.type) {

        case actionType.REVIEW_LIST_REQUEST:
            return {
                ...state, 
                loading:true
            };

        case actionType.REVIEW_LIST_SUCCESS:
            return {
                ...state, 
                loading:false, 
                reviews: action.payload
            };

        case actionType.REVIEW_LIST_FAIL:
            return {
                ...state, 
                loading:false, 
                error: action.payload
            };
        
        default:
            return state;

    }
};

const reviewDeleteInitialState = {
    loading: false,
    success: null,
    error: null,
}


export const adminReviewDeleteReducer = (state = reviewDeleteInitialState, action) => {
    switch (action.type) {

        case reviewAction.REVIEW_DELETE_REQUEST:
            return {
                ...state, 
                loading: true,
                success: null,
                error: null,
            };

        case reviewAction.REVIEW_DELETE_SUCCESS:
            return {
                ...state, 
                loading: false,
                succes: true,
            };

        case reviewAction.REVIEW_DELETE_FAIL:
            return {
                ...state, 
                loading: false,
                error: action.payload
            };

        case reviewAction.REVIEW_DELETE_RESET:
            return {
                ...reviewDeleteInitialState,
            }
        
        default:
            return state;

    }
};



const AllOrderListInitialState = {
    loading: false,
    error: null,
    success: null,
    AllOrders: [],
  }
  
  export const AllOrderListReducer = (state = AllOrderListInitialState, action) => {
    switch (action.type) {
      case actionType.ALL_ORDER_LIST_REQUEST:
    
        return {
          ...state,
          loading: true,
          error: false,
        };
  
      case actionType.ALL_ORDER_LIST_SUCCESS:

          return {
          ...state,
          loading: false,
          success: true,
          AllOrders: action.payload,
        };
  
      case actionType.ALL_ORDER_LIST_FAIL:

        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
  
 // WHEN USER LOGS OUT WE WANT ALL DATA REGARDING ORDERS TO BE RESET AS WELL
 case actionType.ALL_ORDER_LIST_RESET:
      return {
        ...AllOrderListInitialState,
      };

    default:
      return state;
  };
};