import axios from "axios";
import { BASE_URL } from "../../../config";
import * as actionType from "../constants/scheduleConstants";


// REDUX: SO, YOU WANNA SEE YOUR SCHEDULES, USER? SURE, GIVE ME A MINUTE
export const listMySchedules = () => async (dispatch, getState) => {
    try {

        dispatch({ type: actionType.SCHEDULE_LIST_MINE_REQUEST, });

        const { userLoginState: { userInfo }, } = getState();

        const config = {
            headers: {
                //  AXIOS: HOW DO YOU LIKE TO SEND IT?
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 

        const { data } = await axios.get(`${BASE_URL}/api/accounts/schedules/my_list/`, config);

        dispatch({
            type: actionType.SCHEDULE_LIST_MINE_SUCCESS,
            payload: data,
        });

    } catch (error) {

        dispatch({
            type: actionType.SCHEDULE_LIST_MINE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });

    };
};


/* REDUX: WATCHU BRINGING USER? OH? YOU WANT ME TO CREATE AND SEND SOMETHING? ALRIGHT */
export const createSchedule = (formData) => async (dispatch, getState) => {
    try {

        dispatch({
            type: actionType.SCHEDULE_CREATE_REQUEST,
        });

        // AXIOS: WAIT, WHO THE HELL ARE YOU? SHOW ME YOUR ID (TOKEN)
        // ME <id>: AIGHT, WAIT
        // REDUX: YOU NEED YOUR ID? SURE HERE
        const { userLoginState: { userInfo }, } = getState();

        // AXIOS: AIGHT, I'LL GET 'EM FOR YOU
        const config = {
            headers: {
                //  AXIOS: HOW DO YOU LIKE TO SEND IT?
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        /* MAKING API CALL TO CREATE PRODUCT */
        const { data } = await axios.post(`${BASE_URL}/api/accounts/schedules/create/`, formData, config);

        /* IF POST REQUEST SUCCESSFULL WE DISPATCH & SEND THE PAYLOAD TO OUR REDUCER */
        dispatch({
            type: actionType.SCHEDULE_CREATE_SUCCESS,
            payload: data,
        });

    } catch (error) {

        dispatch({
            type: actionType.SCHEDULE_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};


// REDUX: SO, YOU WANT MODIFY THE SCHEDULE <id> YOU HAVE HUH?
export const editThisSchedule = (scheduleId, formData) => async (dispatch, getState) => {
    try {

        dispatch({ type: actionType.SCHEDULE_UPDATE_REQUEST })

        const { userLoginState: { userInfo }, } = getState();

        const config = {
            headers: {
                //  AXIOS: HOW DO YOU LIKE TO SEND IT?
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 

        const { data } = await axios.put(`${BASE_URL}/api/accounts/schedules/${scheduleId}/`, formData, config);

        dispatch({ 
            type: actionType.SCHEDULE_UPDATE_SUCCESS,
            payload: data,
         })

    } catch (error) {

        dispatch({
            type: actionType.SCHEDULE_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
        
    };
};


// REDUX: OH? YOU DON'T NEED YOUR SCHEDULE ANYMORE? FINE THEN I'LL GET RID OF 'EM FOR YOU
export const deleteThisSchedule = (scheduleId) => async (dispatch, getState) => {
    try {

        dispatch({ type: actionType.SCHEDULE_DELETE_REQUEST })

        const {
            userLoginState: { userInfo },
        } = getState();

        const config = {
            headers: {
                //  AXIOS: HOW DO YOU LIKE TO SEND IT?
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }; 

        const { data } = await axios.delete(`${BASE_URL}/api/accounts/schedules/${scheduleId}/`, config);

        dispatch({ 
            type: actionType.SCHEDULE_DELETE_SUCCESS,
            payload: data,
         })

    } catch (error) {

        dispatch({
            type: actionType.SCHEDULE_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
        
    };
};