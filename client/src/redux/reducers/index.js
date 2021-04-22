import { combineReducers } from "redux";
import user from "./user"
import loading from "./loading"
import dialog from "./dialog"

const rootReducer = combineReducers({
    user,
    loading,
    dialog
});

export default rootReducer;