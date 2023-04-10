// IMPORTS THAT WILL CALL THE BACKEND DJANGO REST API
import axios from 'axios';
import { BASE_URL } from '../../../config';

// THESE ARE JUST CONSTANTS, FOR THE SAKE OF CALLING ACTIONS WITH THEIR PROPER NAMES
import * as actionType from '../constants/scheduleCartConstants';


export const addScheduleToCart = (scheduleId, quantity) => async (dispatch, getState) => {

    dispatch({ 
        type: actionType.SCHEDULE_CART_ADD_ITEM,
        payload: {
            schedule: scheduleId,
            quantity,
        },
     });

};

export const removeScheduleFromCart = (scheduleId) => (dispatch, getState) => {

    dispatch({
        type: actionType.SCHEDULE_CART_REMOVE_ITEM,
        payload: scheduleId,
    });

};

export const savePaymentMethod = (data) => (dispatch) => {

    dispatch({
        type: actionType.SCHEDULE_CART_SAVE_PAYMENT_METHOD,
        payload: data,
      });
      
};