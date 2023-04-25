import * as actionType from "../constants/adminConstants";
import * as reviewAction from "../constants/reviewsConstants";
import axios from "axios";
import { BASE_URL } from "../../../config";

 
export const listUsersAdmin = () => async (dispatch, getState) => {
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


  

export const deleteUser =
(userId) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.USER_DELETE_REQUEST });

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {
        // Optionally, you can include additional data to be sent along with the delete request
      }
    };

    const { data } = await axios.delete(
      `${BASE_URL}/api/accounts/users/${userId}/`,
      config
    );

    dispatch({
      type: actionType.USER_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};



export const editUser =
(userId, user) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.USER_UPDATE_REQUEST });

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
      `${BASE_URL}/api/accounts/users/${userId}/`,
      user,
      config
    );

    dispatch({
      type: actionType.USER_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const listUserDetails = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.USER_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/accounts/users/${userId}/`
    ); //fetch the products from rest api

    dispatch({
      type: actionType.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};



export const listReviewsAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.REVIEW_LIST_REQUEST,
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

    const { data } = await axios.get(`${BASE_URL}/api/accounts/reviews/`, config); //fetch the products from rest api

    dispatch({
      type: actionType.REVIEW_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.REVIEW_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const deleteReview =
(reviewId) => async (dispatch, getState) => {
  try {
    dispatch({ type: reviewAction.REVIEW_DELETE_REQUEST });

    const { userState: { userInfo }, } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      data: {
        // Optionally, you can include additional data to be sent along with the delete request
      }
    };

    const { data } = await axios.delete(
      `${BASE_URL}/api/accounts/reviews/${reviewId}/`,
      config
    );

    dispatch({
      type: reviewAction.REVIEW_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: reviewAction.REVIEW_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};




export const listAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.ALL_ORDER_LIST_REQUEST });

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
      `${BASE_URL}/api/accounts/schedule_orders/`,
      config
    );

    dispatch({
      type: actionType.ALL_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.ALL_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
