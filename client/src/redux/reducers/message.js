const initialState = {
    newMessages: [],
    status: null
}

const message = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGES_NEW_SET':
            let messages;
            if (state.newMessages) {
                messages = state.newMessages
                messages.unshift(action.payload)
            } else {
                messages = [action.payload]
            }

            return {
                ...state,
                newMessages: messages
            }
        case 'MESSAGES_NEW_STATUS_SET':
            let msg = state.newMessages

            msg.map(obj => {
                obj.status = true;
            })

            return {
                ...state,
                newMessages: msg
            }
        case 'MESSAGES_NEW_DELETE':
            return {
                ...state,
                newMessages: []
            }
        case 'MESSAGES_STATUS_SET':
            return {
                ...state,
                status: !state.status
            }
        default:
            return state
    }
}

export default message;