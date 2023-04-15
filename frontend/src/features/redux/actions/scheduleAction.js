import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/scheduleConstants";
import * as userActionType from "../constants/authConstants";

export const createSchedule = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.SCHEDULE_CREATE_REQUEST,
    });
  try {
    dispatch({
      type: actionType.SCHEDULE_CREATE_REQUEST,
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
      `${BASE_URL}/api/accounts/schedules/create/`,
      formData,
      config
    );

    console.log("I happened before the dispatch SCHEDULE_CREATE_SUCCESS");

    dispatch({
      type: actionType.SCHEDULE_CREATE_SUCCESS,
      payload: data,
    });

    console.log("I happened after the dispatch SCHEDULE_CREATE_SUCCESS");
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
      type: actionType.SCHEDULE_CREATE_FAIL,
      payload: message,
    });
  }
};

export const listSchedules = (tutorId) => async (dispatch) => {
  try {
    dispatch({
      type: actionType.SCHEDULE_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/accounts/users/tutors/${tutorId}/schedules/`
    );

    dispatch({
      type: actionType.SCHEDULE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.SCHEDULE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMySchedules = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.SCHEDULE_LIST_MINE_REQUEST });

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
      `${BASE_URL}/api/accounts/schedules/my_list/`,
      config
    );

    dispatch({
      type: actionType.SCHEDULE_LIST_MINE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.SCHEDULE_LIST_MINE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateSchedule =
  (schedule, scheduleId) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.SCHEDULE_UPDATE_REQUEST });
export const updateSchedule =
  (scheduleId, schedule) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.SCHEDULE_UPDATE_REQUEST });

   
    const { userState: { userInfo }, } = getState();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${BASE_URL}/api/accounts/schedules/${scheduleId}/`,
        schedule,
        config
      );

      dispatch({
        type: actionType.SCHEDULE_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.SCHEDULE_UPDATE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const listScheduleDetails =
  (scheduleId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionType.SCHEDULE_DETAILS_REQUEST,
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

      const { data } = await axios.get(
        `${BASE_URL}/api/accounts/schedules/${scheduleId}/`,
        config
      ); //fetch the products from rest api

      dispatch({
        type: actionType.SCHEDULE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.SCHEDULE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };


  export const deleteSchedule =
  (scheduleId) => async (dispatch, getState) => {
    try {
      dispatch({ type: actionType.SCHEDULE_DELETE_REQUEST });

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
        `${BASE_URL}/api/accounts/schedules/${scheduleId}/`,
        config
      );

      dispatch({
        type: actionType.SCHEDULE_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.SCHEDULE_DELETE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

