import axios from 'axios';
import * as actionType from '../constants/constants';
import {
    
    USER_LOGIN_SUCCESS,
    
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL, 
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,} from "../constants/constants"

export const loginUser = ( email, password ) => async(dispatch) => {

    try {
        
        dispatch( { type: actionType.USER_LOGIN_REQUEST } );

        // this is where we'll put our data, and 
        // we will just convert it to JSON
        const body = JSON.stringify( { email, password } );

        // this is what dictates what type of
        // data will be sent
        const config = { headers: { 'Content-Type': 'application/json' } };

        // we're gonna post the data we input to this url,
        // with our configuration
        const { data } = await axios.post('http://127.0.0.1:8000/api/accounts/users/login/', body, config);

        // after we post our input, we'll get the 
        // 'data' from what we have post and then
        // use it as our payload for our LOGIN_SUCCESS
        dispatch( { type: actionType.USER_LOGIN_SUCCESS, payload: data } );

        // we're going to store it on our redux store
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        
        dispatch( { 
            type: actionType.USER_LOGIN_FAIL, 
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message 
        } );
    };
};

export const logoutUser = () => (dispatch) => {
    dispatch({ type: actionType.USER_LOGOUT })
};

 


/* ACTION CREATOR USED IN GETTING USER DETAILS IN ProfileScreen COMPONENT  */
export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionType.USER_DETAILS_REQUEST,
      });
  
      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
      const {
        userState: { userInfo },
      } = getState();
  
      /* MAKE GET REQUEST TO GET BACK THE USER DATA */
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
          // Authorization: `Bearer ${userInfo.access && userInfo.token ? userInfo.access + ' ' + userInfo.token : userInfo.access || userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
        },
      };
  
      // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
      const { data } = await axios.get(`http://127.0.0.1:8000/api/accounts/users/profile/`, config);
  
      /* IF GET REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
      dispatch({
        type: actionType.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: actionType.USER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

/* ACTION CREATOR USED IN UPDATING USER DETAILS IN ProfileScreen COMPONENT  */
export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actionType.USER_UPDATE_PROFILE_REQUEST,
      });
  
      // PULLING OUT THE CURRENT USER WE ARE LOGGED IN AS
      const {
        userState: { userInfo },
      } = getState();
      
      /* MAKE PUT REQUEST TO SET THE THE USER DATA */
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${userInfo.token}` /* PASSING IN USER TOKEN AND IF THE USER IN AUTHORISED HE'LL HAVE FULL ACCESS TO HIS PROFILE INFORMATION */,
        },
      };
  
      // USING ${id} BECAUSE WHILE ACCESSING NORMAL USER WE'LL PASS STRING 'profile' BUT WHILE ACCESSING ADMIN PANEL WE'LL PASS THE 'id' SO LINK HAS TO BE DYNAMIC
      const { data } = await axios.put(`http://127.0.0.1:8000/api/accounts/users/profile/update/`, user, config);
  
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
    }
  };


  /* ACTION CREATOR USED IN USER REGISTRATION IN RegisterScreen COMPONENT & HEADER */
  export const register =(form)=> async(dispatch)=>{
    try{
  
       dispatch({
           type:USER_REGISTER_REQUEST
       })
  
       const config = {
           headers:{
               'Content-type':'application/json'
           }
       }
       console.log(form)
       const {data}= await axios.post('http://127.0.0.1:8000/api/accounts/users/register/',
       
       
       form, config )
  
       dispatch({
           type:USER_REGISTER_SUCCESS,
           payload:data
       })
       dispatch({
           type:USER_LOGIN_SUCCESS,
           payload:data
       })
  
       localStorage.setItem('userInfo',JSON.stringify(data))
  
    }
    catch(error){
  
       dispatch({
           type:USER_REGISTER_FAIL,
           payload:error.response && error.response.data.detail
           ? error.response.data.detail
           :error.message,
       })
       console.log(error)
    }
  }
