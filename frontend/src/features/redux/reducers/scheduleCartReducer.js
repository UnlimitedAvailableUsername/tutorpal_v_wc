import * as actionType from '../constants/scheduleCartConstants'


const initialState = {
    items: [null],
    payment_method: null,
}

export const scheduleCartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.SCHEDULE_CART_ADD_ITEM:

            const  thisSchedule = action.payload;

            const existingSchedule = state.items.find((amongSchedules) => amongSchedules.schedule === thisSchedule.schedule);

            if (existingSchedule) {
                return {
                    ...state,
                    items: state.items.map(
                        (amongSchedules) => amongSchedules.schedule ? {
                            ...amongSchedules,
                            quantity: amongSchedules.quantity + thisSchedule.qty
                        } : amongSchedules
                    ),
                };
            } else {
                return {
                    ...state,
                    items: [...state.items, thisSchedule],
                };
            };

        case actionType.SCHEDULE_CART_REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter((amongSchedules) => amongSchedules.schedule !== action.payload),
            };

        case actionType.SCHEDULE_CART_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                payment_method: action.payload,
            };

        case actionType.SCHEDULE_CART_RESET:
            return {
                ...initialState
            };
        
        default:
            return state
    };
};