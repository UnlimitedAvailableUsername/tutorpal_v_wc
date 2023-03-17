import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from "./reducers/authUserReducer";

// const initialState = {};

const reducers = combineReducers({
    userState: userLoginReducer,
});

const middleware = [thunk];

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;