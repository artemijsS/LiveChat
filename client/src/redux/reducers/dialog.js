const initialState = {
    dialogs: {}
}

const dialog = (state = initialState, action) => {
    switch (action.type) {
        case 'DIALOGS_SET':
            return {
                ...state,
                dialogs: action.payload
            }
        default:
            return state
    }
}

export default dialog;