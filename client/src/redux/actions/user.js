import {setUserLoading} from './loading';
import {dialogsFetch} from './dialog';
import socket from "../../socket";

export const userDataFetch = (obj, path) => {
    return dispatch => {
        return fetch(`http://localhost:5000/api/auth/${path}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then(resp => resp.json())
            .then(data => {
                if (data.message) {
                    return data.message
                } else {
                    localStorage.setItem("token", data.token)
                    const user = {
                        name: data.name,
                        email: data.email,
                        telephone: data.telephone,
                        userId: data.userId,
                        token: data.token
                    }
                    dispatch(loginUser(user))
                    dispatch(setUserLoading(true))
                    socket.emit('userOnline', user.userId)
                    dispatch(dialogsFetch(user.token))
                }
            })
    }
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        dispatch(setUserLoading(true));
        if (token) {
            return fetch("http://localhost:5000/api/auth/check", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        console.log(data.message)
                        localStorage.removeItem("token")
                        dispatch(setUserLoading(false))
                    } else {
                        const user = {
                            name: data.name,
                            email: data.email,
                            telephone: data.telephone,
                            userId: data.userId,
                            token: token
                        }
                        dispatch(loginUser(user))
                        socket.emit('userOnline', user.userId)
                        dispatch(dialogsFetch(token))
                    }
                })
        } else {
            dispatch(setUserLoading(false))
        }
    }
}

export const logoutUser = () => {
    localStorage.removeItem("token")
    return {
        type: 'USER_LOGOUT'
    }
}

const loginUser = obj => ({
    type: 'USER_LOGIN',
    payload: obj
})