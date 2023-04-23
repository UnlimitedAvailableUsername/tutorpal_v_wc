import * as actionType from '../constants/scheduleOrderConstants'


const scheduleOrderListInitialState = {
  loading: false,
  error: null,
  success: null,
  scheduleOrders: [],
}

export const scheduleOrderListReducer = (state = scheduleOrderListInitialState, action) => {
  switch (action.type) {
    case actionType.SCHEDULE_ORDER_MY_LIST_REQUEST:
    case actionType.SCHEDULE_ORDER_ME_ON_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };

    case actionType.SCHEDULE_ORDER_MY_LIST_SUCCESS:
    case actionType.SCHEDULE_ORDER_ME_ON_LIST_SUCCESS:
        return {
        ...state,
        loading: false,
        success: true,
        scheduleOrders: action.payload,
      };

    case actionType.SCHEDULE_ORDER_MY_LIST_FAIL:
    case actionType.SCHEDULE_ORDER_ME_ON_LIST_FAIL:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload,
      };

    // WHEN USER LOGS OUT WE WANT ALL DATA REGARDING ORDERS TO BE RESET AS WELL
    case actionType.SCHEDULE_ORDER_MY_LIST_RESET:
    case actionType.SCHEDULE_ORDER_ME_ON_LIST_RESET:
      return {
        ...scheduleOrderListInitialState,
      };

    default:
      return state;
  };
};


const scheduleOrderDetailsInitialState = {
  loading: false,
  error: null,
  success: null,
  scheduleOrder: null,
}

export const scheduleOrderDetailsReducer = (state = scheduleOrderDetailsInitialState, action) => {
  switch (action.type) {
    case actionType.SCHEDULE_ORDER_CREATE_REQUEST:
    case actionType.SCHEDULE_ORDER_DETAILS_REQUEST:
    case actionType.SCHEDULE_ORDER_PAY_REQUEST:
    case actionType.SCHEDULE_ORDER_MARK_DONE_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: null,
      };

    case actionType.SCHEDULE_ORDER_CREATE_SUCCESS:
    case actionType.SCHEDULE_ORDER_DETAILS_SUCCESS:
    case actionType.SCHEDULE_ORDER_PAY_SUCCESS:
    case actionType.SCHEDULE_ORDER_MARK_DONE_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        scheduleOrder: action.payload,
      };

    case actionType.SCHEDULE_ORDER_CREATE_FAIL:
    case actionType.SCHEDULE_ORDER_DETAILS_FAIL:
    case actionType.SCHEDULE_ORDER_PAY_FAIL:
    case actionType.SCHEDULE_ORDER_MARK_DONE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionType.SCHEDULE_ORDER_CREATE_RESET:
    case actionType.SCHEDULE_ORDER_DETAILS_RESET:
      return {
        ...scheduleOrderDetailsInitialState,
      }

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

