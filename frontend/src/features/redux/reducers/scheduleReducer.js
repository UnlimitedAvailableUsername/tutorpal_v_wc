<<<<<<< HEAD
import {
    SCHEDULE_LIST_REQUEST,
    SCHEDULE_LIST_SUCCESS,
    SCHEDULE_LIST_FAIL,

    SCHEDULE_DETAILS_REQUEST,
    SCHEDULE_DETAILS_SUCCESS,
    SCHEDULE_DETAILS_FAIL,
} from '../constants/scheduleConstants'



export const scheduleListReducer = (state = {schedules:[]}, action) => {
    switch (action.type) {
        case SCHEDULE_LIST_REQUEST:
            return {loading:true, schedules: []};
        case SCHEDULE_LIST_SUCCESS:
            return {loading:false, schedules: action.payload};
        case SCHEDULE_LIST_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};

export const scheduleDetailsReducer = (state = {schedule:[]}, action) => {
    switch (action.type) {
        case SCHEDULE_DETAILS_REQUEST:
            return {loading:true, ...state};
        case SCHEDULE_DETAILS_SUCCESS:
            return {loading:false, schedule: action.payload};
        case SCHEDULE_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        
        default:
            return state;
    }
};
=======
import * as actionType from "../constants/scheduleConstants";

/* REDUCER USED IN SCHEDULEListScreen COMPONENT */
export const scheduleCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case actionType.SCHEDULE_CREATE_REQUEST:
			return {
				loading: true,
			};

		case actionType.SCHEDULE_CREATE_SUCCESS:
			return {
				loading: false,
				success: true,
				schedule: action.payload,
			};

		case actionType.SCHEDULE_CREATE_FAIL:
			return {
				loading: false,
				error: action.payload,
			};

		case actionType.SCHEDULE_CREATE_RESET:
			return {};

		default:
			return state;
	}
};

const scheduleListInitialState = {
	loading: false,
	success: null,
	schedules: null,
	error: null,
};

export const scheduleListReducer = (
	state = scheduleListInitialState,
	action
) => {
	switch (action.type) {
		case actionType.SCHEDULE_LIST_REQUEST:
			return {
				...state,
				loading: true,
			};

		case actionType.SCHEDULE_LIST_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				schedules: action.payload,
			};

		case actionType.SCHEDULE_LIST_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		case actionType.SCHEDULE_LIST_RESET:
			return scheduleListInitialState;

		default:
			return state;
	}
};

const scheduleDetailsInitialState = {
	loading: false,
	schedule: null,
	error: null,
};

/* REDUCER USED IN ProductScreen COMPONENT */
export const scheduleDetailsReducer = (
	state = scheduleDetailsInitialState,
	action
) => {
	switch (action.type) {
		case actionType.SCHEDULE_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case actionType.SCHEDULE_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				product: action.payload,
			};

		case actionType.SCHEDULE_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		default:
			return state;
	}
};
>>>>>>> master
