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
        case 'USER_LOADING':
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state
    }
}

export default user;