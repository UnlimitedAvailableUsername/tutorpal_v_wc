import axios from 'axios';
import * as actionType from '../constants';

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
        const { data } = await axios.post('http://127.0.0.1:8000/api/accounts/auth/login/', body, config);

        // after we post our input, we'll get the 
        // 'data' from what we have post and then
        // use it as our payload for our LOGIN_SUCCESS
        dispatch( { type: actionType.USER_LOGIN_SUCCESS, payload: data } );

        // we're going to store it on our redux store
        localStorage.setItem('userInfo', data)

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