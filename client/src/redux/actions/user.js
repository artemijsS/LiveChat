import {setUserLoading} from './loading';
import {dialogsFetch, activeDialogSet} from './dialog';
import socket from "../../socket";

export const userDataFetch = (obj, path) => {
    return dispatch => {
        let language = localStorage.language;
        if (!language) {
            dispatch(changeUserLanguage("EN"))
        } else {
            dispatch(changeUserLanguage(language))
        }
        return fetch(`/api/auth/${path}`, {
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
                    localStorage.setItem("language", data.language)
                    if (data.language) {
                        language = data.language
                    }
                    const user = {
                        name: data.name,
                        email: data.email,
                        telephone: data.telephone,
                        userId: data.userId,
                        token: data.token,
                        role: data.role,
                        description: data.description,
                        photo: data.photo,
                        language: language
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
        let language = localStorage.language;
        if (!language || language === "undefined") {
            dispatch(changeUserLanguage("EN"))
        } else {
            dispatch(changeUserLanguage(language))
        }
        dispatch(setUserLoading(true));
        if (token) {
            return fetch("/api/auth/check", {
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
                        if (data.language) {
                            language = data.language
                        }
                        const user = {
                            name: data.name,
                            email: data.email,
                            telephone: data.telephone,
                            userId: data.userId,
                            token: token,
                            role: data.role,
                            description: data.description,
                            photo: data.photo,
                            language: language
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
    return dispatch => {
        dispatch(activeDialogSet(''))
        dispatch(infoAboutUserSet({bool: false, id: null, dialogId: null}))
        dispatch(logout())
    }
}

export const logout = () => {
    localStorage.removeItem("token")
    return {
        type: 'USER_LOGOUT'
    }
}

const loginUser = obj => ({
    type: 'USER_LOGIN',
    payload: obj
})

export const updateName = name => ({
    type: 'USER_UPDATE_NAME',
    payload: name
})

export const updateAbout = about => ({
    type: 'USER_UPDATE_ABOUT',
    payload: about
})

export const updatePhoto = img => ({
    type: 'USER_UPDATE_PHOTO',
    payload: img
})

export const infoAboutUserSet = obj => ({
    type: 'INFO_ABOUT_USER_SET',
    payload: obj
})

export const changeUserLanguage = lan => ({
    type: 'LANGUAGE_CHANGE',
    payload: lan
})

export const dialogsSearch = tel => ({
    type: 'DIALOG_SEARCH',
    payload: tel
})