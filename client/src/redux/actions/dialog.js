import axios from "axios";
import {setUserLoading} from "./loading";

export const dialogsFetch = (token) => {
    return dispatch => {
        return axios.get("http://localhost:5000/api/dialog/find", { headers: { Authorization:`Bearer ${token}`}}).then(res => {
            dispatch(dialogsSet(res.data.answer))
            dispatch(dialogsOrderSet(res.data.order))
            dispatch(setUserLoading(false))
        })
    }
}

export const createDialog = (token, userId) => {
    return dispatch => {
        return axios.post("http://localhost:5000/api/dialog/new", {userId},{ headers: { Authorization:`Bearer ${token}`}}).then(res => {
            dispatch(dialogsFetch(token))
            dispatch(activeDialogSet(res.data))
        })
    }
}

export const dialogsOrderSet = (id) => {
    return {
        type: 'DIALOG_ORDER_SET',
        payload: id
    }
}

export const activeDialogSet = (id) => {
    return {
        type: 'DIALOG_ACTIVE_SET',
        payload: id
    }
}

export const dialogsSet = (obj) => {
    return {
        type: 'DIALOGS_SET',
        payload: obj
    }
}