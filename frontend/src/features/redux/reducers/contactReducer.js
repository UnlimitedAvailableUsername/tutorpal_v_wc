import * as actionType from '../constants/contactConstants';

const initialState ={
    loading: false,
    data: {},
    error: null,
}

export const addContactReducer = (state = initialState, action) => {
    switch (action.type) {
      case actionType.CONTACT_ADD_REQUEST:
        return { ...state, loading: true };
        
      case actionType.CONTACT_ADD_SUCCESS:
        return { ...state, loading: false, data: action.payload };

      case actionType.CONTACT_ADD_FAIL:
        return { ...state, loading: false, error: action.payload };

      default:
        return state;
    }
};