import * as actionType from "../constants/adminConstants";
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
