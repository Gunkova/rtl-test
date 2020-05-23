import { applyMiddleware, createStore } from "redux";
import { reducer, initialState } from "./reducer";
import thunkMiddleware from "redux-thunk";

const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));

export default store;
