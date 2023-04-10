import * as actionType from "../constants/scheduleConstants";

/* REDUCER USED IN SCHEDULEListScreen COMPONENT */
const scheduleInitialState = {
	loading: false,
	error: null,
	success: null,
	schedule: null,
}

export const scheduleReducer = (state = scheduleInitialState, action) => {
	switch (action.type) {
		case actionType.SCHEDULE_CREATE_REQUEST:
		case actionType.SCHEDULE_DETAILS_REQUEST:
		case actionType.SCHEDULE_UPDATE_REQUEST:
			return {
				...state,
				loading: true,
				success: null,
				error: null,
			};

		case actionType.SCHEDULE_CREATE_SUCCESS:
		case actionType.SCHEDULE_DETAILS_SUCCESS:
		case actionType.SCHEDULE_UPDATE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				schedule: action.payload,
			};

		case actionType.SCHEDULE_CREATE_FAIL:
		case actionType.SCHEDULE_DETAILS_FAIL:
		case actionType.SCHEDULE_UPDATE_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		case actionType.SCHEDULE_CREATE_RESET:
		case actionType.SCHEDULE_UPDATE_RESET:
			return {
				...scheduleListInitialState
			};

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

export const scheduleListMineReducer = ( state = scheduleListInitialState, action ) => {
	switch (action.type) {
		case actionType.SCHEDULE_LIST_MINE_REQUEST:
			return {
				...state,
				loading: true,
			};

		case actionType.SCHEDULE_LIST_MINE_SUCCESS:
			return {
				...state,
				loading: false,
				success: true,
				schedules: action.payload,
			};

		case actionType.SCHEDULE_LIST_MINE_FAIL:
			return {
				...state,
				loading: false,
				success: false,
				error: action.payload,
			};

		case actionType.SCHEDULE_LIST_MINE_RESET:
			return scheduleListInitialState;

		default:
			return state;
	};
};