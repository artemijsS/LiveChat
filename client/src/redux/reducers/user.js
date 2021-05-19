import socket from "../../socket";

const initialState = {
    userData: {},
    loading: false
}

const user = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return {
                ...state,
                userData: action.payload
            }
        case 'USER_LOGOUT':
            socket.emit('logout')
            return {
                ...state,
                userData: {}
            }
        default:
            return state
    }
}

export default user;