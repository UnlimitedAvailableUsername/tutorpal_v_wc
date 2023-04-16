import * as actionType from "../constants/tutorConstants";
import axios from "axios";
import { BASE_URL } from "../../../config";

// FOR LISTING ALL THE TUTORS

export const listTutors = () => async (dispatch) => {
  try {
    dispatch({
      type: actionType.TUTOR_LIST_REQUEST,
    });

    const { data } = await axios.get(`${BASE_URL}/api/accounts/users/tutors/`); //fetch the products from rest api

    dispatch({
      type: actionType.TUTOR_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.TUTOR_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// FOR LISTING THE  TUTORS THAT IS NOT ACTIVE YET FOR ADMIN

export const listTutorsAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.ADMIN_LIST_REQUEST,
    });

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/accounts/users/`, config); //fetch the products from rest api

    dispatch({
      type: actionType.ADMIN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ADMIN_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// FOR LISTING THE SPECIFIC TUTOR USER DETAILS

export const listTutorDetails = (tutorId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.TUTOR_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/accounts/users/${tutorId}/`
    ); //fetch the products from rest api

    dispatch({
      type: actionType.TUTOR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.TUTOR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//creating review
export const createTutorReview =
  (tutorId, review) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionType.TUTOR_CREATE_REVIEW_REQUEST,
      });

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
        `${BASE_URL}api/accounts/reviews/create/`,
        review,
        config
      );
      dispatch({
        type: actionType.TUTOR_CREATE_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.TUTOR_CREATE_REVIEW_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  
export const updateTutor =
(tutorId, tutor) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.TUTOR_UPDATE_REQUEST });

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
      `${BASE_URL}/api/accounts/users/${tutorId}/`,
      tutor,
      config
    );

    dispatch({
      type: actionType.TUTOR_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.TUTOR_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};