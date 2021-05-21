import { io } from "socket.io-client"
import store from "./redux/store"
import {
    dialogLastMessageSet,
    dialogOrderChange,
    dialogUserOnlineStatusSet,
    dialogNewSet,
    dialogLastMessageStatusSet,
    deleteDialogInfo
} from "./redux/actions/dialog"
import {messagesNewIdSet, messagesNewSet, messagesNewStatusSet, messagesStatusSet} from "./redux/actions/message";

const socket = io()

socket.on('userOnline', (data) => {
    store.dispatch(dialogUserOnlineStatusSet(data.dialogId, data.status))
})

socket.on('newMessage', (message) => {
    if (store.getState().dialog.activeDialog === message.dialogId) {
        store.dispatch(messagesNewSet(message))
        socket.emit('messageAllStatus', {dialogId: message.dialogId, id: store.getState().user.userData.userId})
    }

    store.dispatch(dialogLastMessageSet(message.dialogId, message))

    if (store.getState().dialog.activeDialog === message.dialogId) {
        store.dispatch(dialogLastMessageStatusSet(message.dialogId))
    }

    if (store.getState().dialog.dialogsOrder[0] !== message.dialogId)
        store.dispatch(dialogOrderChange(message.dialogId))
})

socket.on('newDialog', (dialog) => {
    store.dispatch(dialogNewSet(dialog.dialogId, dialog.newDialog))
})

socket.on('messageAllStatus', (messages) => {
    store.dispatch(dialogLastMessageStatusSet(messages.dialogId))
    if (store.getState().dialog.activeDialog === messages.dialogId) {
        store.dispatch(messagesStatusSet())
        store.dispatch(messagesNewStatusSet())
    }
})

socket.on('newMessageId', (id) => {
    store.dispatch(messagesNewIdSet(id))
})

socket.on('dialogDelete', (dialogId, name) => {
    store.dispatch(deleteDialogInfo(dialogId, name))
})

export default socket;