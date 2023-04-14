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
				schedule: action.payload,
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
