const initialState = {
    dialogs: {},
    dialogsOrder: [],
    activeDialog: ''
}

const dialog = (state = initialState, action) => {
    switch (action.type) {
        case 'DIALOGS_SET':
            return {
                ...state,
                dialogs: action.payload
            }
        case 'DIALOG_ACTIVE_SET':
            return {
                ...state,
                activeDialog: action.payload
            }
        case 'DIALOG_ORDER_SET':
            return {
                ...state,
                dialogsOrder: action.payload
            }
        case 'DIALOG_USER_ONLINE_SET':
            return {
                ...state,
                dialogs: {
                    ...state.dialogs,
                    [action.dialogId]: {
                        ...state.dialogs[action.dialogId],
                        status: action.payload
                    }
                }
            }
        case 'DIALOG_LAST_MESSAGE_SET':
            return {
                ...state,
                dialogs: {
                    ...state.dialogs,
                    [action.dialogId]: {
                        ...state.dialogs[action.dialogId],
                        dialog: {
                            ...state.dialogs[action.dialogId].dialog,
                            last_message: action.payload.text,
                            last_message_time: action.payload.time,
                            last_message_owner: action.payload.owner,
                            last_message_status: action.payload.status
                        }
                    }
                }
            }
        case 'DIALOG_ORDER_CHANGE':

            let orderArr = state.dialogsOrder
            const dialogId = action.payload
            orderArr.splice(orderArr.indexOf(dialogId), 1)
            orderArr.unshift(dialogId)

            return {
                ...state,
                dialogsOrder: orderArr
            }
        case 'DIALOG_NEW_SET':

            let orderActual = state.dialogsOrder
            orderActual.unshift(action.dialogId)

            return {
                ...state,
                dialogs: {
                    ...state.dialogs,
                    [action.dialogId]: action.payload
                },
                dialogsOrder: orderActual
            }
        case 'DIALOG_LAST_MESSAGE_STATUS_SET':
            return {
                ...state,
                dialogs: {
                    ...state.dialogs,
                    [action.dialogId]: {
                        ...state.dialogs[action.dialogId],
                        dialog: {
                            ...state.dialogs[action.dialogId].dialog,
                            last_message_status: action.payload
                        }
                    }
                }
            }
        default:
            return state
    }
}

export default dialog;