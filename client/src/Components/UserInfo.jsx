import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Image} from "cloudinary-react";
import {infoAboutUserSet} from "../redux/actions/user";
import axios from "axios";
import {useAlert} from "react-alert";
import {createDialog, deleteDialog} from "../redux/actions/dialog";

const UserInfo = () => {

    const alert = useAlert()

    const dispatch = useDispatch()

    const {dialogs, activeDialog} = useSelector(({dialog}) => dialog)
    const {infoAboutUser, userData} = useSelector(({user}) => user)

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
            axios.get(`/api/user/find/${infoAboutUser.id}`, { headers: { Authorization: `Bearer ${userData.token}` }}).then((res) => {
                setName(res.data.name)
                setStatus(res.data.status)
                setPhoto(res.data.photo)
                setTelephone(res.data.telephone)
                setEmail(res.data.email)
                setAbout(res.data.description)
                setLoading(false)
            }, () => {
                setLoading(false)
                alert.show('error')
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
        dispatch(createDialog(userData.token, infoAboutUser.id)).then((res) => {
            if (res === -1)
                alert.show('error')
        })
        dispatch(infoAboutUserSet({bool: false, id: null}))
    }

    const deleteDialogFn = () => {
        const res = window.confirm('Are you sure?')
        if (!res)
            return false
        dispatch(infoAboutUserSet({bool: false, id: null}))
        dispatch(deleteDialog(activeDialog, userData.token, dialogs[activeDialog].id))
    }

    return (
            <div className="userInfo">
                <div className="box-header">
                    <svg onClick={() => dispatch(infoAboutUserSet({bool: false, id: null}))} xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 24 24" width="24" height="24">
                        <path fill="currentColor"
                              d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"/>
                    </svg>
                    <div className="title">Profile info</div>
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
                                        "DELETED"
                                        :
                                        status ? "online" : "offline"
                                    }
                                </div>
                            </div>
                            { infoAboutUser.id &&
                                <div onClick={() => {createNewDialog()}} className="button" style={{marginBottom: "28px"}}>
                                    <svg className="salat" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                                    <div className="flex1 paddingLeft20 salat bold">Add to friends</div>
                                </div>
                            }
                            <div style={activeDialog ? dialogs[activeDialog].deleted && {display: "none"} : {}} className="about">
                                <span>Telephone</span>
                                <div>{telephone}</div>
                            </div>
                            <div style={activeDialog ? dialogs[activeDialog].deleted && {display: "none"} : {}} className="about">
                                <span>Email</span>
                                <div>{email}</div>
                            </div>
                            <div style={activeDialog ? dialogs[activeDialog].deleted && {display: "none"} : {}} className="about">
                                <span>About</span>
                                <div>{about ? about : "none"}</div>
                            </div>
                            { !infoAboutUser.id &&
                                <div onClick={deleteDialogFn} className="button">
                                    <svg className="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                         width="24" height="24">
                                        <path fill="currentColor"
                                              d="M6 18c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6H6v12zM19 3h-3.5l-1-1h-5l-1 1H5v2h14V3z"/>
                                    </svg>
                                    <div className="flex1 paddingLeft20 red bold">Delete Chat</div>
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