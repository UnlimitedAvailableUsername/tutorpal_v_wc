import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/subjectConstants";
import * as userActionType from "../constants/authConstants";

 
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
  
  
  
  export const listSubjects = () => async (dispatch) => {
    try {
      dispatch({ type: actionType.SUBJECT_LIST_REQUEST });
  
      const { data } = await axios.get(
        `${BASE_URL}/api/accounts/subjects/`
      );
  
      dispatch({
        type: actionType.SUBJECT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.SUBJECT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  
  
  export const listSubjectDetails =
    (subjectId) => async (dispatch, getState) => {
      try {
        dispatch({
          type: actionType.SUBJECT_DETAILS_REQUEST,
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
          `${BASE_URL}/api/accounts/subjects/${subjectId}/`,
          config
        ); //fetch the products from rest api
  
        dispatch({
          type: actionType.SUBJECT_DETAILS_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: actionType.SUBJECT_DETAILS_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  
  
  
  export const updateSubject =
    (subjectId, subject) => async (dispatch, getState) => {
      try {
        dispatch({ type: actionType.SUBJECT_UPDATE_REQUEST });
  
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
          `${BASE_URL}/api/accounts/subjects/${subjectId}/`,
          subject,
          config
        );
  
        dispatch({
          type: actionType.SUBJECT_UPDATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: actionType.SUBJECT_UPDATE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  
    
  
    export const deleteSubject =
    (subjectId) => async (dispatch, getState) => {
      try {
        dispatch({ type: actionType.SUBJECT_DELETE_REQUEST });
  
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
          `${BASE_URL}/api/accounts/subjects/${subjectId}/`,
          config
        );
  
        dispatch({
          type: actionType.SUBJECT_DELETE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: actionType.SUBJECT_DELETE_FAIL,
          payload:
            error.response && error.response.data.detail
              ? error.response.data.detail
              : error.message,
        });
      }
    };
  
  
  