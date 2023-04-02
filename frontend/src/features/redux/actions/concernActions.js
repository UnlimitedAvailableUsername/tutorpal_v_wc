import {
    CONCERN_LIST_REQUEST,
    CONCERN_LIST_SUCCESS,
    CONCERN_LIST_FAIL,

    CONCERN_DETAILS_REQUEST,
    CONCERN_DETAILS_SUCCESS,
    CONCERN_DETAILS_FAIL,

} from '../constants/concernConstants';
import axios from 'axios';

export const listConcerns = () => async (dispatch) => {
    try {
        dispatch({
            type: CONCERN_LIST_REQUEST,
        });

        const {data} = await axios.get('http://127.0.0.1:8000/api/accounts/contacts/'); //fetch the products from rest api

        dispatch({
            type: CONCERN_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: CONCERN_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const listConcernDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: CONCERN_DETAILS_REQUEST,
        });

        const {data} = await axios.get(`http://127.0.0.1:8000/api/accounts/contacts/${id}`); 

        dispatch({
            type: CONCERN_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: CONCERN_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

