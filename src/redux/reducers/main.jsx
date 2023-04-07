import { combineReducers } from "redux";
import { cartReducer } from "./reducer";
import { productReducer } from "./reducer2";

const rootred=combineReducers({
    cartReducer,
    productReducer
});

export default rootred;