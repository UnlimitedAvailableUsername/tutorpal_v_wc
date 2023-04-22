import * as actionType from "../constants/authUserConstants";


export const initialLoginState = {
  loading: false,
  userInfo: null,
  error: null,
};

export const userLoginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case actionType.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };

    case actionType.USER_LOGIN_FAIL:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case actionType.USER_LOGOUT:
      localStorage.removeItem("userInfo");
      return {
        ...initialLoginState,
      };

    default:
      return state;
  }
};

const userUpdateInitialState = {
  loading: false,
  error: null,
  success: null,
}


export const userUpdateProfileReducer = (state = userUpdateInitialState, action) => {
  switch (action.type) {
    case actionType.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
      };

    case actionType.USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case actionType.USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case actionType.USER_UPDATE_PROFILE_RESET:
      return {
        ...userUpdateInitialState,
      };
    
    case actionType.USER_UPDATE_PROFILE_RESET_SUCCESS:
      return {
        ...state,
        success: null,
      }

    default:
      return state;
  }
};


const registerInitialState = {
  loading: false,
  error: null,
  success: null,
  valid: null,
  userRegistered: null,
  registerFormData: null,
}

export const userRegisterReducer = (state = registerInitialState, action) => {
  switch (action.type) {
    case actionType.USER_REGISTER_REQUEST:
    case actionType.USER_REGISTER_UNIQUE_VALIDATE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: null,
        valid: null,
      };

    case actionType.USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        userRegistered: action.payload,
      };

    case actionType.USER_REGISTER_FAIL:
    case actionType.USER_REGISTER_UNIQUE_VALIDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        valid: false,
      };
    
    case actionType.USER_REGISTER_SET_FORM_DATA:
      return {
        ...state,
        registerFormData: action.payload,
      };

    case actionType.USER_REGISTER_UNIQUE_VALIDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        valid: true,
      };

    case actionType.USER_REGISTER_UNIQUE_VALIDATE_RESET:
      return {
        ...state,
        loading: false,
      };
    
    case actionType.USER_REGISTER_RESET:
      return {
        ...registerInitialState,
      }

    default:
      return state;
  }
};
