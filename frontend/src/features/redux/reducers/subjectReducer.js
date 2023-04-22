
import * as actionType from '../constants/subjectConstants';

const initialState ={
    loading: false,
    data: {},
    error: null,
}

export const addSubjectReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.SUBJECT_ADD_REQUEST:
        return { ...state, loading: true };
        
      case actionType.SUBJECT_ADD_SUCCESS:
        return { ...state, loading: false, data: action.payload };

      case actionType.SUBJECT_ADD_FAIL:
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
};

export const subjectListReducer = (state = initialState, action) => {
    switch (action.type) {
  
        case actionType.SUBJECT_LIST_REQUEST:
            return {
                ...state, 
                loading:true
            };
  
        case actionType.SUBJECT_LIST_SUCCESS:
            return {
                ...state, 
                loading:false, 
                subjects: action.payload
            };
  
        case actionType.SUBJECT_LIST_FAIL:
            return {
                ...state, 
                loading:false, 
                error: action.payload
            };
        
        default:
            return state;
  
    }
  };
  
  
  const subjectDetailsInitialState = {
      loading: false,
      subject: null,
      error: null,
  };
  
  /* REDUCER USED IN ProductScreen COMPONENT */
  export const subjectDetailsReducer = ( state = subjectDetailsInitialState, action ) => {
      switch (action.type) {
          case actionType.SUBJECT_DETAILS_REQUEST:
              return {
                  ...state,
                  loading: true,
              };
  
          case actionType.SUBJECT_DETAILS_SUCCESS:
              return {
                  ...state,
                  loading: false,
                  subject: action.payload,
              };
  
          case actionType.SUBJECT_DETAILS_FAIL:
              return {
                  ...state,
                  loading: false,
                  error: action.payload,
              };
  
          default:
              return state;
      };
  };