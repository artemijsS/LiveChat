const initialState = {
    newMessages: []
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
        case 'MESSAGES_NEW_DELETE':
            return {
                ...state,
                newMessages: []
            }
        default:
            return state
    }
}

export default message;