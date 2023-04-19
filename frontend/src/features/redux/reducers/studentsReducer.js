import * as actionType from '../constants/studentsConstants'


const studentsListInitialState = {
  loading: false,
  success: null,
  error: null,
  users: null,
};

export const studentsListReducer = (state = studentsListInitialState, action) => {
  switch (action.type) {
    case actionType.STUDENTS_LIST_BY_SCHEDULE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      }

    case actionType.STUDENTS_LIST_BY_SCHEDULE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        users: action.payload,
      }

    case actionType.STUDENTS_LIST_BY_SCHEDULE_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case actionType.STUDENTS_LIST_BY_SCHEDULE_ORDERS_RESET:
      return {
        ...studentsListInitialState,
      }
    default:
      return state
  };
};


const studentDetailsInitialState = {
  loading: false,
  error: null,
  success: null,
  student: null,
};

export const studentDetailsReducer = (state = studentDetailsInitialState, action) => {
  switch (action.type) {
    case actionType.STUDENTS_DETAILS_AND_SCHEDULE_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      }

    case actionType.STUDENTS_DETAILS_AND_SCHEDULE_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        student: action.payload,
      }

    case actionType.STUDENTS_DETAILS_AND_SCHEDULE_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }

    case actionType.STUDENTS_DETAILS_AND_SCHEDULE_ORDERS_RESET:
      return {
        ...studentDetailsInitialState
      }
    default:
      return state
  };
};