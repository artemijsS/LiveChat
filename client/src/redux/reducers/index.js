import { combineReducers } from "redux";
import user from "./user"
import loading from "./loading"
import dialog from "./dialog"
import message from "./message";

const rootReducer = combineReducers({
    user,
    loading,
    dialog,
    message
});

export default rootReducer;