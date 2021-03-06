import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Image} from "cloudinary-react";
import {infoAboutUserSet, logoutUser} from "../redux/actions/user";
import axios from "axios";
import {useAlert} from "react-alert";
import {createDialog, deleteDialog} from "../redux/actions/dialog";

const UserInfo = () => {

    const alert = useAlert()

    const dispatch = useDispatch()

    const {dialogs, activeDialog} = useSelector(({dialog}) => dialog)
    const {infoAboutUser, userData} = useSelector(({user}) => user)
    const {token, language} = useSelector(({user}) => userData)

    const [name, setName] = useState('')
    const [photo, setPhoto] = useState('')
    const [status, setStatus] = useState('')
    const [telephone, setTelephone] = useState('')
    const [email, setEmail] = useState('')
    const [about, setAbout] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (infoAboutUser.id) {
            setLoading(true)
            axios.get(`/api/user/find/${infoAboutUser.id}`, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
                setName(res.data.name)
                setStatus(res.data.status)
                setPhoto(res.data.photo)
                setTelephone(res.data.telephone)
                setEmail(res.data.email)
                setAbout(res.data.description)
                setLoading(false)
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else {
                    setLoading(false)
                    alert.show(translate[language].error)
                }
            })
        } else {
            if (activeDialog) {
                setName(dialogs[activeDialog].name)
                setStatus(dialogs[activeDialog].status)
                setPhoto(dialogs[activeDialog].photo)
                setTelephone(dialogs[activeDialog].telephone)
                setEmail(dialogs[activeDialog].email)
                setAbout(dialogs[activeDialog].description)
            }
            setLoading(false)
        }
    }, [infoAboutUser])

    const createNewDialog = () => {
        setLoading(true)
        dispatch(createDialog(token, infoAboutUser.id)).then((res) => {
            setLoading(false)
            if (res === -1)
                alert.show(translate[language].error)
            dispatch(infoAboutUserSet({bool: false, id: null}))
        })
    }

    const deleteDialogFn = () => {
        const res = window.confirm(translate[language].sure)
        if (!res)
            return false
        setLoading(true)
        dispatch(deleteDialog(infoAboutUser.dialogId, token, infoAboutUser.id)).then(() => {
            setLoading(false)
            dispatch(infoAboutUserSet({bool: false, id: null}))
        })
    }

    return (
            <div className="userInfo">
                <div className="box-header">
                    <svg onClick={() => dispatch(infoAboutUserSet({bool: false, id: null}))} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor"
                              d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"/>
                    </svg>
                    <div className="title">{translate[language].profileInfo}</div>
                </div>
                { !loading &&
                    <>
                        <div className="user">
                            <div className="info">
                                <div style={{width: '200px'}}>
                                    <Image cloudName="artemijss"
                                           publicId={photo ? photo : "tkixqcinuntqmalr2dej"}/>
                                </div>
                                <div className="name" style={activeDialog ? dialogs[activeDialog].deleted && {color: "rgb(214,48,46)"} : {}}>{name}</div>
                                <div className="status" style={activeDialog ? dialogs[activeDialog].deleted && {color: "rgb(214,48,46)"} : {}}>
                                    { activeDialog && dialogs[activeDialog].deleted
                                        ?
                                        translate[language].deleted
                                        :
                                        status ? translate[language].online : translate[language].offline
                                    }
                                </div>
                            </div>
                            { !dialogs[infoAboutUser.dialogId] &&
                                <div onClick={() => {createNewDialog()}} className="button" style={{marginBottom: "28px"}}>
                                    <svg className="salat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                                    <div className="flex1 paddingLeft20 salat bold">{translate[language].addToFriends}</div>
                                </div>
                            }
                            <div style={activeDialog ? dialogs[activeDialog].deleted && {display: "none"} : {}} className="about">
                                <span>{translate[language].telephone}</span>
                                <div>{telephone}</div>
                            </div>
                            <div style={activeDialog ? dialogs[activeDialog].deleted && {display: "none"} : {}} className="about">
                                <span>Email</span>
                                <div>{email}</div>
                            </div>
                            <div style={activeDialog ? dialogs[activeDialog].deleted && {display: "none"} : {}} className="about">
                                <span>{translate[language].about}</span>
                                <div>{about ? about : translate[language].none}</div>
                            </div>
                            { dialogs[infoAboutUser.dialogId] &&
                                <div onClick={deleteDialogFn} className="button">
                                    <svg className="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         width="24" height="24">
                                        <path fill="currentColor"
                                              d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H6v12zM19 3h-3.5l-1-1h-5l-1 1H5v2h14V3z"/>
                                    </svg>
                                    <div className="flex1 paddingLeft20 red bold">{translate[language].deleteChat}</div>
                                </div>
                            }
                        </div>
                    </>
                }
                { loading &&
                    <div className="loadingChatBlock">
                        <div className="spinner spinner-1"/>
                    </div>
                }
            </div>
    )
}

export default UserInfo;

const translate = {
    LV: {
        profileInfo: "Profila inform??cija",
        addToFriends: "Pievienot draugiem",
        deleteChat: "Dz??st t??rz????anu",
        sure: "Vai j??s to tie??am gribat?",
        name: "V??rds Uzv??rds",
        about: "Apraksts",
        telephone: "T??lrunis",
        deleted: "DZ??STS",
        online: "online",
        offline: "offline",
        ok: "OK",
        cancel: "ATCELT",
        error: "K????da",
        none: "nav",
        errorAuth: "Autoriz??cijas periods ir beidzies"
    },
    RU: {
        profileInfo: "???????????????????? ?? ??????????????",
        addToFriends: "???????????????? ?? ????????????",
        deleteChat: "?????????????? ??????",
        sure: "???? ???????????????",
        name: "?????? ??????????????",
        about: "????????????????",
        telephone: "??????????????",
        deleted: "????????????",
        online: "?? ????????",
        offline: "???? ?? ????????",
        ok: "OK",
        cancel: "????????????",
        error: "????????????",
        none: "??????????",
        errorAuth: "?????????? ???????? ??????????????????????"
    },
    EN: {
        profileInfo: "Profile Info",
        addToFriends: "Add to friends",
        deleteChat: "Delete Chat",
        sure: "Are you sure?",
        name: "Name Surname",
        about: "About",
        telephone: "Telephone",
        deleted: "DELETED",
        online: "online",
        offline: "offline",
        ok: "OK",
        cancel: "CANCEL",
        error: "Error",
        none: "none",
        errorAuth: "Authorization period expired"
    }
}