import { legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootred from "./redux/reducers/main";

const store=createStore(rootred,composeWithDevTools());

export default store;