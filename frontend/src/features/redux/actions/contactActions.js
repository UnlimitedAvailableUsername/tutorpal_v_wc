import axios from 'axios';
import { BASE_URL } from '../../../config';
import * as actionType from '../constants/contactConstants';
import * as userActionType from '../constants/authUserConstants';

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

        dispatch({
            type: actionType.CONTACT_ADD_SUCCESS,
            payload: data,
        });

    } catch (error) {

        if (error.response && error.response.status === 401) {
            dispatch({ type: userActionType.USER_LOGIN_FAIL });
            return;
        }

        dispatch({
            type: actionType.CONTACT_ADD_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });

    };
};


export const listContact = () => async (dispatch, getState) => {
    try {

        dispatch({ type: actionType.CONTACT_LIST_REQUEST })

        const { userLoginState: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${BASE_URL}/api/accounts/contacts/`, config);

        dispatch({
            type: actionType.CONTACT_LIST_SUCCESS,
            payload: data,
        });

    } catch (error) {

        dispatch({
            type: actionType.CONTACT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });

    };
};

export const getContactDetails = (contactId) => async (dispatch, getState) => {
    try {

        dispatch({ type: actionType.CONTACT_DETAIL_REQUEST });

        const { userLoginState: { userInfo } } = getState();

        const config = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        const { data } = await axios.get(`${BASE_URL}/api/accounts/contacts/${contactId}`, config);

        dispatch({
            type: actionType.CONTACT_DETAIL_SUCCESS,
            payload: data,
        });
        
    } catch (error) {

        dispatch({
            type: actionType.CONTACT_DETAIL_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        });

    };
};