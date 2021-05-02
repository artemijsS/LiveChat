export const messagesNewSet = (msg) => {
    return {
        type: 'MESSAGES_NEW_SET',
        payload: msg
    }
}

export const messageNewDelete = () => {
    return {
        type: 'MESSAGES_NEW_DELETE'
    }
}