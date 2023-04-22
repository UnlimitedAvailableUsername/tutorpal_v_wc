// IMPORTS THAT WILL CALL THE BACKEND DJANGO REST API
import axios from "axios";
import { BASE_URL } from "../../../config";

// THESE ARE JUST CONSTANTS, FOR THE SAKE OF CALLING ACTIONS WITH THEIR PROPER NAMES
import * as actionType from "../constants/authUserConstants";


export const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: actionType.USER_LOGIN_REQUEST });

    const body = JSON.stringify({ email, password });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/accounts/users/login/`,
      body,
      config
    );

    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionType.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: actionType.USER_LOGOUT,
  });
};

export const registerUser = (updatedFormData) => async (dispatch) => {
  try {
    dispatch({ type: actionType.USER_REGISTER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/accounts/users/register/`,
      updatedFormData,
      config
    );

    dispatch({
      type: actionType.USER_REGISTER_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: actionType.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const validateUsernameEmailRegister = (formData) => async (dispatch) => {
  try {
    dispatch({ type: actionType.USER_REGISTER_UNIQUE_VALIDATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/accounts/users/validate_email_or_username/`,
      formData,
      config
    );

    dispatch({
      type: actionType.USER_REGISTER_UNIQUE_VALIDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: actionType.USER_REGISTER_UNIQUE_VALIDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const setRegisterFormData = (formData) => ({
  type: actionType.USER_REGISTER_SET_FORM_DATA,
  payload: formData,
});

export const USER_PROFILE_UPDATE_SUCCESS_DELAY = 4000

export const updateUserProfile = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.USER_UPDATE_PROFILE_REQUEST });

    const { userState: { userInfo }, } = getState();

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `${BASE_URL}/api/accounts/users/profile/`,
      formData,
      config
    );

    dispatch({
      type: actionType.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));

    // Delay the action by USER_PROFILE_UPDATE_SUCCESS_DELAY seconds
    setTimeout(() => {
      dispatch({
        type: actionType.USER_UPDATE_PROFILE_RESET_SUCCESS
      });
    }, USER_PROFILE_UPDATE_SUCCESS_DELAY);
  } catch (error) {
    dispatch({
      type: actionType.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
