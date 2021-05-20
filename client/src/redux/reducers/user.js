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
        case 'USER_UPDATE_NAME':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    name: action.payload
                }
            }
        case 'USER_UPDATE_ABOUT':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    description: action.payload
                }
            }
        case 'USER_UPDATE_PHOTO':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    photo: action.payload
                }
            }
        default:
            return state
    }
}

export default user;