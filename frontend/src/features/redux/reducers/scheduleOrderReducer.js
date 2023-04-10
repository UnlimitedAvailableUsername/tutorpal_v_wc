import * as actionType from '../constants/scheduleOrderConstants'


const scheduleOrderListMineInitialState = {
    loading: false,
    error: null,
    scheduleOrders: [],
}

export const scheduleOrderListMineReducer = (state = scheduleOrderListMineInitialState, action) => {
    switch (action.type) {
      case actionType.SCHEDULE_ORDER_MY_LIST_REQUEST:
        return {
            ...state,
          loading: true,
          error: false,
        };
  
      case actionType.SCHEDULE_ORDER_MY_LIST_SUCCESS:
        return {
            ...state,
          loading: false,
          orders: action.payload,
        };
  
      case actionType.SCHEDULE_ORDER_MY_LIST_FAIL:
        return {
            ...state,
          loading: false,
          error: action.payload,
        };
  
      // WHEN USER LOGS OUT WE WANT ALL DATA REGARDING ORDERS TO BE RESET AS WELL
      case actionType.SCHEDULE_ORDER_MY_LIST_RESET:
        return { 
            ...scheduleOrderListMineInitialState,
         };
  
      default:
        return state;
    };
};


const scheduleOrderDetailsInitialState = {
    loading: false,
    error: null,
    success: null,
    orderScheduleItems: [],
}

export const scheduleOrderDetailsReducer = (state = scheduleOrderDetailsInitialState, action) => {
    switch (action.type) {
        case actionType.SCHEDULE_ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
                success: null,
            };

        case actionType.SCHEDULE_ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                scheduleOrder: action.payload,
            };

        case actionType.SCHEDULE_ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state
    };
};


const scheduleOrderPayInitialState = {
    loading: false,
    error: null,
    success: null,
}

export const scheduleOrderPayReducer = (state = scheduleOrderPayInitialState, action) => {
    switch (action.type) {
        case actionType.SCHEDULE_ORDER_PAY_REQUEST:
            return {
                ...state,
                loading: true,
                error: false,
            }

        case actionType.SCHEDULE_ORDER_PAY_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true
            }

        case actionType.SCHEDULE_ORDER_PAY_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case actionType.SCHEDULE_ORDER_PAY_RESET:
            return {
                ...scheduleOrderPayInitialState,
            }

        default:
            return state
    };
};

