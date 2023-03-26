import {
    SUBJECT_LIST_REQUEST,
    SUBJECT_LIST_SUCCESS,
    SUBJECT_LIST_FAIL,

    SUBJECT_DETAILS_REQUEST,
    SUBJECT_DETAILS_SUCCESS,
    SUBJECT_DETAILS_FAIL,

} from '../constants/subjectConstants';
import axios from 'axios';

export const listsubjects = () => async (dispatch) => {
    try {
        dispatch({
            type: SUBJECT_LIST_REQUEST,
        });

        const {data} = await axios.get('http://127.0.0.1:8000/api/accounts/subjects/'); //fetch the products from rest api

        dispatch({
            type: SUBJECT_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: SUBJECT_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

export const listSubjectDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: SUBJECT_DETAILS_REQUEST,
        });

        const {data} = await axios.get(`http://127.0.0.1:8000/api/accounts/subject/${id}`); //fetch the products from rest api

        dispatch({
            type: SUBJECT_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: SUBJECT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

