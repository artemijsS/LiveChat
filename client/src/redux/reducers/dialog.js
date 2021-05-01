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
        default:
            return state
    }
}

export default dialog;