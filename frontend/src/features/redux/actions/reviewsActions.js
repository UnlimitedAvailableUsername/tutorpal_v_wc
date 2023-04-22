import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/reviewsConstants";

export const listReviewsOfTutor = (tutorId) => async (dispatch) => {
  try {
    dispatch({ type: actionType.REVIEW_LIST_TUTOR_REQUEST });

    const { data } = await axios.get(
      `${BASE_URL}/api/accounts/reviews/tutors/${tutorId}/`
    );

    dispatch({
      type: actionType.REVIEW_LIST_TUTOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.REVIEW_LIST_TUTOR_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getReviewDetails = (reviewId) => async (dispatch) => {
  try {
    dispatch({ type: actionType.REVIEW_DETAIL_REQUEST });

    const { data } = await axios.get(
      `${BASE_URL}/api/accounts/reviews/${reviewId}/`
    );

    dispatch({
      type: actionType.REVIEW_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.REVIEW_DETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addReview = (formData) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.REVIEW_ADD_REQUEST });

    const { userState: { userInfo }, } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/accounts/reviews/create/`,
      formData,
      config
    );

    dispatch({
      type: actionType.REVIEW_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.REVIEW_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editThisReview =
  (reviewId, formData) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.REVIEW_EDIT_REQUEST });

      const {
        userLoginState: { userInfo },
      } = getState();

      const config = {
        headers: {
          //  AXIOS: HOW DO YOU LIKE TO SEND IT?
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/accounts/reviews/${reviewId}/`,
        formData,
        config
      );

      dispatch({
        type: actionType.REVIEW_EDIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.REVIEW_EDIT_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
