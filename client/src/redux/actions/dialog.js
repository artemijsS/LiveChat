import axios from "axios";
import {setUserLoading} from "./loading";
import socket from "../../socket";

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
            socket.emit('newDialog', res.data)
        }, () => {
            return -1
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

export const dialogNewSet = (dialogId, obj) => {
    return {
        type: 'DIALOG_NEW_SET',
        payload: obj,
        dialogId: dialogId
    }
}

export const dialogLastMessageStatusSet = (dialogId) => {
    return {
        type: 'DIALOG_LAST_MESSAGE_STATUS_SET',
        payload: true,
        dialogId: dialogId
    }
}

export const deleteDialog = (dialogId, token, id = '') => {
    return dispatch => {
        return axios.post("/api/dialog/delete", {dialogId: dialogId, id: id},{ headers: { Authorization:`Bearer ${token}`}}).then(() => {
            socket.emit('dialogDelete', dialogId, id)
            dispatch(activeDialogSet(''))
            dispatch(deleteDialogOne(dialogId))
        })
    }
}

export const deleteDialogOne = (dialogId) => {
    return {
        type: 'DIALOG_DELETE_ONE',
        payload: dialogId
    }
}

export const deleteDialogInfo = (dialogId, name) => {
    return {
        type: 'DIALOG_DELETE_INFO',
        payload: dialogId,
        name: name
    }
}