import axios from "axios";
import {setUserLoading} from "./loading";

export const dialogsFetch = (token) => {
    return dispatch => {
        return axios.get("http://localhost:5000/api/dialog/find", { headers: { Authorization:`Bearer ${token}`}}).then(res => {
            dispatch(dialogsSet(res.data))
            dispatch(setUserLoading(false))
        })
    }
}

export const dialogsSet = (obj) => {
    return {
        type: 'DIALOGS_SET',
        payload: obj
    }
}