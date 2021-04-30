import {io} from "socket.io-client";


const socket = io("http://localhost:8000");

socket.on('hello', (msg) => {
    console.log(msg)
})

export default socket;