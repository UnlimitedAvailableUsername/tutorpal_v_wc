// IMPORTS THAT WILL CALL THE BACKEND DJANGO REST API
import axios from 'axios';
import { BASE_URL } from '../../../config';

// THESE ARE JUST CONSTANTS, FOR THE SAKE OF CALLING ACTIONS WITH THEIR PROPER NAMES
import * as actionType from '../constants/authConstants';


// THIS ACTION IS RESPONSIBLE FOR THE LOGGING IN FOR USER
export const loginUser = (email, password) => async (dispatch) => {

  try {

    dispatch({ type: actionType.USER_LOGIN_REQUEST });

    const body = JSON.stringify({ email, password });

// SINCE WE DON"T
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(`${BASE_URL}/api/accounts/users/login/`, body, config);

    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));


  } catch (error) {

    dispatch({
			type: actionType.USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});

  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({
    type: actionType.USER_LOGOUT
  });

};


export const registerUser = (formData) => async (dispatch) => {
  try {

    dispatch({ type: actionType.USER_REGISTER_REQUEST });

    const body = JSON.stringify(formData)
    console.log("Body:", body)

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    console.log("Config:", config)

    const { data } = await axios.post(`${BASE_URL}/api/accounts/users/register/`, body, config);

    dispatch({
      type: actionType.USER_REGISTER_SUCCESS,
      payload: data
    });

    /* WE ALSO LOGIN THE REGISTERED USER */
    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    
    dispatch({
			type: actionType.USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.detail
					? error.response.data.detail
					: error.message,
		});

  }
}




/* ACTION CREATOR USED IN GETTING USER DETAILS IN ProfileScreen COMPONENT  */

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {

    dispatch({ type: actionType.USER_DETAILS_REQUEST, });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const { userState: { userInfo } } = getState();

    /* MAKE GET REQUEST TO GET BACK THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      }
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.get(`${BASE_URL}/api/accounts/users/profile/`, config);

    /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: actionType.USER_DETAILS_SUCCESS,
      payload: data
    });


  } catch (error) {

    dispatch({
      type: actionType.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });


  };
};

/* ACTION CREATOR USED IN UPDATING USER DETAILS IN ProfileScreen COMPONENT  */
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionType.USER_UPDATE_PROFILE_REQUEST, });

    // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
    const { userState: { userInfo }, } = getState();

    /* MAKE PUT REQUEST TO SET THE THE USER DATA */
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
      },
    };

    // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
    const { data } = await axios.put(`${BASE_URL}/api/accounts/users/profile/update/`, user, config);

    /* IF PUT REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
    dispatch({
      type: actionType.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });

    /* AFTER UPDATING PROFILE INFORMATION WE WANT TO LOG THE USER IN WITH THE UPDATED INFO */
    dispatch({
      type: actionType.USER_LOGIN_SUCCESS,
      payload: data,
    });

    /* SETTING UPDATED VALUE OF USER INFO IN LOCAL STORAGE */
    localStorage.setItem("userInfo", JSON.stringify(data));


  } catch (error) {

    dispatch({
      type: actionType.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });


  };
};