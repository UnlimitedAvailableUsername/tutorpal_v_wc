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

const admintutorListInitialState = {
    loading: false,
    users: null,
    error: null,
}

export const admintutorListReducer = (state = admintutorListInitialState, action) => {
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



const MyStudentListInitialState = {
    loading: false,
    error: null,
    success: null,
    students: [],
  }
  
  export const MyStudentListReducer = (state = MyStudentListInitialState, action) => {
    switch (action.type) {
      case actionType.MY_STUDENTS_LIST_REQUEST:
        return {
          ...state,
          loading: true,
          error: false,
        };
  
      case actionType.MY_STUDENTS_LIST_SUCCESS:
          return {
          ...state,
          loading: false,
          success: true,
          students: action.payload,
        };
  
      case actionType.MY_STUDENTS_LIST_FAIL:
        return {
          ...state,
          loading: false,
          success: false,
          error: action.payload,
        };
  
      // WHEN USER LOGS OUT WE WANT ALL DATA REGARDING ORDERS TO BE RESET AS WELL
      case actionType.MY_STUDENTS_LIST_RESET:
        return {
          ...MyStudentListInitialState,
        };
  
      default:
        return state;
    };
  };


  const studentOrderDetailsInitialState = {
    loading: false,
    error: null,
    success: null,
    order: null,
  }
  
  export const studentOrderDetailsReducer = (state = studentOrderDetailsInitialState, action) => {
    switch (action.type) {
      case actionType.STUDENT_ORDER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
          error: false,
          success: null,
        };
  
      case actionType.STUDENT_ORDER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          success: true,
          order: action.payload,
        };
  
      case actionType.STUDENT_ORDER_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case actionType.STUDENT_ORDER_DETAILS_RESET:
        return {
          ...studentOrderDetailsInitialState,
        }
  
      default:
        return state
    };
  };
  