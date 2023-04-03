import {
   CONTACT_LIST_REQUEST,
   CONTACT_LIST_SUCCESS,
   CONTACT_LIST_FAIL,

   CONTACT_DETAILS_REQUEST,
   CONTACT_DETAILS_SUCCESS,
   CONTACT_DETAILS_FAIL,

} from '../constants/contactConstants';
import axios from 'axios';

export const listContacts = () => async (dispatch) => {
    try {
        dispatch({
            type: CONTACT_LIST_REQUEST,
        });

        const {data} = await axios.get('http://127.0.0.1:8000/api/accounts/contacts/'); //fetch the products from rest api

        dispatch({
            type: CONTACT_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: CONTACT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const listContactDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CONTACT_DETAILS_REQUEST,
        });

        const {data} = await axios.get(`http://127.0.0.1:8000/api/accounts/contacts/${id}`); 

        dispatch({
            type: CONTACT_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: CONTACT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

