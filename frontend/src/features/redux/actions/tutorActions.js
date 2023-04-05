import * as actionType from '../constants/tutorConstants';
import axios from 'axios';
import { BASE_URL } from '../../../config';

// FOR LISTING ALL THE TUTORS

export const listTutors = () => async (dispatch) => {
    try {
        dispatch({
            type: actionType.TUTOR_LIST_REQUEST,
        });

        const {data} = await axios.get(`${BASE_URL}/api/accounts/tutors/`); //fetch the products from rest api

        dispatch({
            type: actionType.TUTOR_LIST_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: actionType.TUTOR_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

// FOR LISTING THE SPECIFIC TUTOR USER DETAILS

export const listTutorDetails = (tutorId) => async (dispatch) => {
    try {
        dispatch({
            type: actionType.TUTOR_DETAILS_REQUEST,
        });

        const {data} = await axios.get(`${BASE_URL}/api/accounts/users/${tutorId}`); //fetch the products from rest api

        dispatch({
            type: actionType.TUTOR_DETAILS_SUCCESS,
            payload: data,
        });
    }
    catch (error) {
        dispatch({
            type: actionType.TUTOR_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
        });
    }
}

