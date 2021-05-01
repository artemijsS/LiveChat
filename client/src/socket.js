import { io } from "socket.io-client"
import store from "./redux/store"
import { dialogUserOnlineStatusSet } from "./redux/actions/dialog"

const socket = io("http://localhost:5000")

socket.on('userOnline', (data) => {
    console.log(data)
    store.dispatch(dialogUserOnlineStatusSet(data.dialogId, data.status))
})

export default socket;