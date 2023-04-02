// FOR ACCESSING API DJANGO BACKEND
import axios from 'axios';
import { BASE_URL } from '../../../config';

// CONSTANTS
import * as actionType from '../constants/orderConstants';


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: actionType.ORDER_DETAILS_REQUEST });

        const { userLogin: { userInfo } } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.get(`${BASE_URL}/api/orders/${id}/`, config);

        dispatch({ 
            type: actionType.ORDER_DETAILS_SUCCESS, 
            payload: data 
        });


    } catch (error) {

        dispatch({
            type: actionType.ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};



export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {

        dispatch({ type: actionType.ORDER_PAY_REQUEST });

        const { userLogin: { userInfo }, } = getState();

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        };

        const { data } = await axios.put(`${BASE_URL}/api/orders/${id}/pay/`, paymentResult, config);

        dispatch({
            type: actionType.ORDER_PAY_SUCCESS,
            payload: data
        });


    } catch (error) {

        dispatch({
            type: actionType.ORDER_PAY_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
};

