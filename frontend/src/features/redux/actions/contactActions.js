import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/contactConstants";
import * as userActionType from "../constants/authConstants";

export const addContact = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.CONTACT_ADD_REQUEST });

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/accounts/contacts/create/`,
      formData,
      config
    );

    console.log("I happened before the dispatch CONTACT_ADD_SUCCESS");

    dispatch({
      type: actionType.CONTACT_ADD_SUCCESS,
      payload: data,
    });

    console.log("I happened after the dispatch CONTACT_ADD_SUCCESS");
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({ type: userActionType.USER_LOGIN_FAIL });
      return;
    }

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: actionType.CONTACT_ADD_FAIL,
      payload: message,
    });
  }
};

export const listContacts = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.CONTACT_LIST_REQUEST });

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${BASE_URL}/api/accounts/contacts/`,
      config
    ); //fetch the products from rest api

    dispatch({
      type: actionType.CONTACT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.CONTACT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listContactDetails = (contactId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.CONTACT_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/accounts/contacts/${contactId}`
    ); //fetch the products from rest api

    dispatch({
      type: actionType.CONTACT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.CONTACT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateContact =
  (contactId, contact) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.CONTACT_UPDATE_REQUEST });

      const {
        userState: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/accounts/contacts/edit/${contactId}/`,
        contact,
        config
      );

      dispatch({
        type: actionType.CONTACT_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.CONTACT_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };


  
export const addSubject = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.SUBJECT_ADD_REQUEST });

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/accounts/subjects/`,
      formData,
      config
    );

    console.log("I happened before the dispatch SUBJECT_ADD_SUCCESS");

    dispatch({
      type: actionType.SUBJECT_ADD_SUCCESS,
      payload: data,
    });

    console.log("I happened after the dispatch SUBJECT_ADD_SUCCESS");
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch({ type: userActionType.USER_LOGIN_FAIL });
      return;
    }

    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: actionType.SUBJECT_ADD_FAIL,
      payload: message,
    });
  }
};