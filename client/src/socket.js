import { io } from "socket.io-client"
import store from "./redux/store"
import {dialogLastMessageSet, dialogOrderChange, dialogUserOnlineStatusSet} from "./redux/actions/dialog"
import { messagesNewSet } from "./redux/actions/message";

const socket = io("http://localhost:5000")

socket.on('userOnline', (data) => {
    store.dispatch(dialogUserOnlineStatusSet(data.dialogId, data.status))
})

socket.on('newMessage', (message) => {
    if (store.getState().dialog.activeDialog === message.dialogId)
        store.dispatch(messagesNewSet(message))
    store.dispatch(dialogLastMessageSet(message.dialogId, message))
    store.dispatch(dialogOrderChange(message.dialogId))
})

export default socket;