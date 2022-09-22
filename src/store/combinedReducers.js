import { combineReducers } from "redux";

import userReducer from "./user";
import authReducer from "./authentication";

export default combineReducers({
    user: userReducer,
    auth: authReducer,
});
