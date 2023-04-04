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