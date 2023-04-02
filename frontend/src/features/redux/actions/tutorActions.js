import {
    TUTOR_LIST_REQUEST,
    TUTOR_LIST_SUCCESS,
    TUTOR_LIST_FAIL,

    TUTOR_DETAILS_REQUEST,
    TUTOR_DETAILS_SUCCESS,
    TUTOR_DETAILS_FAIL,

} from '../constants/tutorConstants';
import axios from 'axios';


// FOR LISTING ALL THE TUTORS

export const listTutors = () => async (dispatch) => {
    try {
        dispatch({
            type: TUTOR_LIST_REQUEST,
        });

        const {data} = await axios.get('http://127.0.0.1:8000/api/accounts/users'); //fetch the products from rest api

        dispatch({
            type: TUTOR_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: TUTOR_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// FOR LISTING THE SPECIFIC TUTOR USER DETAILS

export const listTutorDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: TUTOR_DETAILS_REQUEST,
        });

        const {data} = await axios.get(`http://127.0.0.1:8000/api/accounts/users/${id}`); //fetch the products from rest api

        dispatch({
            type: TUTOR_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: TUTOR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

