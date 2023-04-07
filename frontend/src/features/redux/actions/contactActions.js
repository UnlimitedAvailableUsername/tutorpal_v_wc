import axios from 'axios';
import { BASE_URL } from '../../../config';
import * as actionType from '../constants/contactConstants';
import * as userActionType from '../constants/authConstants';

export const addContact = (formData) => async (dispatch, getState) => {
    try {
        dispatch({ type: actionType.CONTACT_ADD_REQUEST });

        const { userLoginState: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.post(`${BASE_URL}/api/accounts/contacts/create/`, formData, config);

        console.log("I happened before the dispatch CONTACT_ADD_SUCCESS")

        dispatch({
            type: actionType.CONTACT_ADD_SUCCESS,
            payload: data,
        });

        console.log("I happened after the dispatch CONTACT_ADD_SUCCESS")

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
            type: actionType.CONTACT_ADD_FAIL,
            payload: message,
        });
    };
};