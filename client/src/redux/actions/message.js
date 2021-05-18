export const messagesNewSet = (msg) => {
    return {
        type: 'MESSAGES_NEW_SET',
        payload: msg
    }
}

export const messagesNewStatusSet = () => {
    return {
        type: 'MESSAGES_NEW_STATUS_SET'
    }
}

export const messageNewDelete = () => {
    return {
        type: 'MESSAGES_NEW_DELETE'
    }
}

export const messagesStatusSet = () => {
    return {
        type: 'MESSAGES_STATUS_SET'
    }
}