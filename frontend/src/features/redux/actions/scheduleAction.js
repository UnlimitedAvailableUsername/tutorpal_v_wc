<<<<<<< HEAD
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
=======
import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/scheduleConstants";
import * as userActionType from "../constants/authConstants";



export const createSchedule = (formData) => async (dispatch, getState) => {
  try {dispatch({
          type: actionType.SCHEDULE_CREATE_REQUEST,
        });
>>>>>>> master

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
<<<<<<< HEAD
        Authorization: `Bearer ${userInfo.access}`,
=======
        Authorization: `Bearer ${userInfo.token}`,
>>>>>>> master
      },
    };

    const { data } = await axios.post(
<<<<<<< HEAD
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
=======
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
>>>>>>> master
    });
  }
};

<<<<<<< HEAD
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
=======
export const listSchedules = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.SCHEDULE_LIST_REQUEST });

    const {
      userState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
  
    const { data } = await axios.get(`${BASE_URL}/api/accounts/users/tutors/${userInfo.id}/schedules/`);
    
    dispatch({
      type: actionType.SCHEDULE_LIST_SUCCESS,
      payload: data,
    });

  } catch (error) {

    dispatch({
			type: actionType.SCHEDULE_LIST_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});

>>>>>>> master
  }
};
