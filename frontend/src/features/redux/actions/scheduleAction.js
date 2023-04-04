import {
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_LIST_SUCCESS,
  SCHEDULE_LIST_FAIL,
  SCHEDULE_DETAILS_REQUEST,
  SCHEDULE_DETAILS_SUCCESS,
  SCHEDULE_DETAILS_FAIL,
  SCHEDULE_ADD_REQUEST,
  SCHEDULE_ADD_SUCCESS,
  SCHEDULE_ADD_FAIL,
} from "../constants/scheduleConstants";
import axios from "axios";

export const AddSchedule = (schedule) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHEDULE_ADD_REQUEST,
    });

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.access}`,
      },
    };

    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/accounts/schedules/create",
      schedule,
      config
    );

    dispatch({
      type: SCHEDULE_ADD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listSchedules = () => async (dispatch) => {
  try {
    dispatch({
      type: SCHEDULE_LIST_REQUEST,
    });

    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/accounts/schedules/"
    ); //fetch the products from rest api

    dispatch({
      type: SCHEDULE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listScheduleDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SCHEDULE_DETAILS_REQUEST,
    });

    const { data } = await axios.get(
      `http://127.0.0.1:8000/api/accounts/schedules/${id}`
    ); //fetch the products from rest api

    dispatch({
      type: SCHEDULE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
