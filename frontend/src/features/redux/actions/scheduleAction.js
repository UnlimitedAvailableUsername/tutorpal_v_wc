import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/scheduleConstants";


/* ACTION CREATOR USED IN CREATING PRODUCTS IN ProductListScreen COMPONENT */
export const createSchedule = () => async (formData, dispatch, getState) => {
  try {
    dispatch({
      type: actionType.SCHEDULE_CREATE_REQUEST,
    });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const {
      userLoginState: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    /* MAKING API CALL TO CREATE PRODUCT */
    const { data } = await axios.post(`${BASE_URL}/api/accounts/schedules/create/`, formData, config);

    /* IF POST REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: actionType.SCHEDULE_CREATE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: actionType.SCHEDULE_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};