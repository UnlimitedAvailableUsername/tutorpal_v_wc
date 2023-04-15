// IMPORTS THAT WILL CALL THE BACKEND DJANGO REST API
import axios from "axios";
import { BASE_URL } from "../../../config";

// THESE ARE JUST CONSTANTS, FOR THE SAKE OF CALLING ACTIONS WITH THEIR PROPER NAMES
import * as actionType from "../constants/scheduleOrderConstants";

export const createOrderSchedule =
  (orderSchedule) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.SCHEDULE_ORDER_CREATE_REQUEST });

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
        `${BASE_URL}/api/accounts/schedule_orders/create/`,
        orderSchedule,
        config
      );

      dispatch({
        type: actionType.SCHEDULE_ORDER_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.SCHEDULE_ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listMyScheduleOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.SCHEDULE_ORDER_MY_LIST_REQUEST });

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
      `${BASE_URL}/api/schedule_orders/my_list/`,
      config
    );

    dispatch({
      type: actionType.SCHEDULE_ORDER_MY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.SCHEDULE_ORDER_MY_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listHasMeScheduleOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.SCHEDULE_ORDER_ME_ON_LIST_REQUEST });

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
      `${BASE_URL}/api/schedule_orders/me_included/`,
      config
    );

    dispatch({
      type: actionType.SCHEDULE_ORDER_ME_ON_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.SCHEDULE_ORDER_ME_ON_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrderScheduleDetails =
  (orderId) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.SCHEDULE_ORDER_DETAILS_REQUEST });

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
        `${BASE_URL}/api/orders/${orderId}/`,
        config
      );

      dispatch({
        type: actionType.SCHEDULE_ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.SCHEDULE_ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const payScheduleOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.SCHEDULE_ORDER_PAY_REQUEST });

      const {
        userState: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/accounts/schedule_orders/${orderId}/mark_as_paid/`,
        paymentResult,
        config
      );

      dispatch({
        type: actionType.SCHEDULE_ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.SCHEDULE_ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
