import axios from "axios";
import {setUserLoading} from "./loading";

export const dialogsFetch = (token) => {
    return dispatch => {
        return axios.get("/api/dialog/find", { headers: { Authorization:`Bearer ${token}`}}).then(res => {
            dispatch(dialogsSet(res.data.answer))
            dispatch(dialogsOrderSet(res.data.order))
            dispatch(setUserLoading(false))
        })
    }
}

export const createDialog = (token, userId) => {
    return dispatch => {
        return axios.post("/api/dialog/new", {userId},{ headers: { Authorization:`Bearer ${token}`}}).then(res => {
            dispatch(dialogsFetch(token)).then(() => {dispatch(activeDialogSet(res.data))})
        })
    }
}

export const dialogsOrderSet = (arr) => {
    return {
        type: 'DIALOG_ORDER_SET',
        payload: arr
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

export const dialogUserOnlineStatusSet = (id, status) => {
    return {
        type: 'DIALOG_USER_ONLINE_SET',
        payload: status,
        dialogId: id
    }
}

export const dialogLastMessageSet = (id, message) => {
    return {
        type: 'DIALOG_LAST_MESSAGE_SET',
        payload: message,
        dialogId: id
    }
}

export const dialogOrderChange = (id) => {
    return {
        type: 'DIALOG_ORDER_CHANGE',
        payload: id
    }
}