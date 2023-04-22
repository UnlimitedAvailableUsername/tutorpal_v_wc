import axios from 'axios';
import { BASE_URL } from '../../../config';
import * as actionType from '../constants/studentsConstants'


export const getStudentsByOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.STUDENTS_LIST_BY_SCHEDULE_ORDERS_REQUEST
    });

    const { userState: { userInfo } } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/accounts/users/tutors/students/`, config);

    dispatch({
      type: actionType.STUDENTS_LIST_BY_SCHEDULE_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.STUDENTS_LIST_BY_SCHEDULE_ORDERS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  };
};


export const getStudentDetailsAndOrderedSchedules = (studentId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: actionType.STUDENTS_DETAILS_AND_SCHEDULE_ORDERS_REQUEST
    });

    const { userState: { userInfo } } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${BASE_URL}/api/accounts/users/tutors/students/${studentId}/`, config);

    dispatch({
      type: actionType.STUDENTS_DETAILS_AND_SCHEDULE_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionType.STUDENTS_DETAILS_AND_SCHEDULE_ORDERS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  };
}