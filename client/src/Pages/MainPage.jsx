import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Helmet } from 'react-helmet';
import {BackGround, Chat, Dialogs, FindNewDialog, Profile, Search} from "../Components";
import axios from "axios";
import {useAlert} from "react-alert";
import socket from "../socket";
import {messageNewDelete, messagesNewSet} from "../redux/actions/message";
import {dialogLastMessageSet, dialogLastMessageStatusSet, dialogOrderChange} from "../redux/actions/dialog";
import {Link} from 'react-router-dom'
import {logoutUser} from "../redux/actions/user";
import {Image} from "cloudinary-react";


function MainPage () {

    const dispatch = useDispatch()

    const {dialogs, activeDialog, dialogsOrder} = useSelector(({dialog}) => dialog)
    const {token, userId, role, photo} = useSelector(({user}) => user.userData)

    const alert = useAlert()

    const [activeFindNewDialog, setActiveFindNewDialog] = useState(false)
    const [profile, setProfile] = useState(false)

    const [messageText, setMessageText] = useState('')
    const [settingsPopUp, setSettingsPopUp] = useState(false)

    const popUpRef = useRef();
    const settingMenuRef = useRef();

    useEffect(() => {
        setActiveFindNewDialog(false)
        dispatch(messageNewDelete())
        if (activeDialog) {
            socket.emit('messageAllStatus', {dialogId: activeDialog, id: userId})
            if (dialogs[activeDialog].dialog.last_message_owner !== userId)
                dispatch(dialogLastMessageStatusSet(activeDialog))
        }
    }, [activeDialog])

    const handleOutsideClick = (e) => {
        if (!e.composedPath().includes(popUpRef.current) && !e.composedPath().includes(settingMenuRef.current)) {
            setSettingsPopUp(false);
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', handleOutsideClick)

        return () => {
            document.body.removeEventListener('click', handleOutsideClick);
        };
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        const input = document.querySelector('#sendMessageInput')
        input.value = ""

        const message = {
            recipient: dialogs[activeDialog].id,
            text: messageText,
            dialogId: activeDialog
        }

        if (!messageText) {
            alert.show('Enter the message text')
            return false
        }

        axios.post("/api/message/new", message, { headers: { Authorization: `Bearer ${token}` }}).then(message => {
            socket.emit('newMessage', message.data)
        }, err => {
            alert.show('Error with sending message')
        })

        const date = getDate();

        const msg = {
            _id: "none",
            text: messageText,
            owner: userId,
            recipient: dialogs[activeDialog].id,
            time: date,
            status: false,
            dialogId: activeDialog
        }

        dispatch(messagesNewSet(msg))
        dispatch(dialogLastMessageSet(activeDialog, msg))

        if (dialogsOrder[0] !== activeDialog)
            dispatch(dialogOrderChange(activeDialog))

        setMessageText('')
    }

    return (
        <div>
            <Helmet>
                <title>Live Chat</title>
            </Helmet>
            <BackGround/>
            <div className="all-screen">
                <div className="main-box">
                    <div className="whats-app">
                        <div className="side-bar">
                            { activeFindNewDialog &&
                                <>
                                    <div className="find-header">
                                        <div className="box">
                                            <div className="back">
                                                <svg onClick={() => {setActiveFindNewDialog(false)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"/></svg>
                                            </div>
                                            <div className="big-text">
                                                New Chat
                                            </div>
                                        </div>
                                    </div>
                                    <FindNewDialog/>
                                </>
                            }
                            {
                                profile &&
                                <>
                                    <div className="find-header">
                                        <div className="box">
                                            <div className="back">
                                                <svg onClick={() => {setProfile(false)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8 8-8z"/></svg>
                                            </div>
                                            <div className="big-text">
                                                Profile
                                            </div>
                                        </div>
                                    </div>
                                    <Profile/>
                                </>
                            }
                            { !activeFindNewDialog && !profile &&
                                <div>
                                    <div className="box-header">
                                        <Image onClick={() => setProfile(true)} cloudName="artemijss" publicId={photo ? photo : "tkixqcinuntqmalr2dej"}/>
                                        <div className="settings">
                                            <svg id="ee51d023-7db6-4950-baf7-c34874b80976"
                                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                 height="24">
                                                <path fill="currentColor"
                                                      d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.269 7.269 0 0 0 10.024.244.977.977 0 0 1 1.313 1.445A9.192 9.192 0 0 1 12 20.664zm7.965-6.112a.977.977 0 0 1-.944-1.229 7.26 7.26 0 0 0-4.8-8.804.977.977 0 0 1 .594-1.86 9.212 9.212 0 0 1 6.092 11.169.976.976 0 0 1-.942.724zm-16.025-.39a.977.977 0 0 1-.953-.769 9.21 9.21 0 0 1 6.626-10.86.975.975 0 1 1 .52 1.882l-.015.004a7.259 7.259 0 0 0-5.223 8.558.978.978 0 0 1-.955 1.185z"/>
                                            </svg>
                                            <svg onClick={() => {setActiveFindNewDialog(true)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                 height="24">
                                                <path fill="currentColor"
                                                      d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"/>
                                            </svg>
                                            <svg ref={settingMenuRef} className={settingsPopUp ? "active" : ""} onClick={() => {setSettingsPopUp(!settingsPopUp)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                 height="24">
                                                <path fill="currentColor"
                                                      d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
                                            </svg>
                                            {
                                                settingsPopUp &&
                                                <div className="settingsPopUp" ref={popUpRef}>
                                                    <div className="settingsLink" onClick={() => {setProfile(true); setSettingsPopUp(false)}}><div>Profile</div></div>
                                                    <div className="settingsLink" onClick={() => {}}><div>Favourites</div></div>
                                                    <div className="settingsLink" onClick={() => {}}><div>Settings</div></div>
                                                    <div className="settingsLink" onClick={() => {dispatch(logoutUser())}}><div>Logout</div></div>
                                                </div>
                                            }
                                        </div>
                                        {
                                            role === "admin" &&
                                            <Link to="/admin">AdminPanel</Link>
                                        }
                                    </div>
                                    <Search/>
                                    <Dialogs/>
                                </div>
                            }
                        </div>
                        { activeDialog
                            ?
                                <div className="chat-bar">
                                    <div className="box-header">
                                        {/*<img src={logo} alt="error"/>*/}
                                        <div className="padding">
                                            <Image cloudName="artemijss" publicId={dialogs[activeDialog].photo ? dialogs[activeDialog].photo : "tkixqcinuntqmalr2dej"} crop="scale"/>
                                        </div>
                                        <div className="dialog-info">
                                            <div className="dialog-name">
                                                {dialogs[activeDialog].name}
                                            </div>
                                            <div className="last-time-seen">
                                                {dialogs[activeDialog].status ? "online" : "offline"}
                                            </div>
                                        </div>
                                        <div className="settings">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z"/></svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/></svg>
                                        </div>
                                    </div>
                                    <Chat/>
                                    <div className="footer">
                                        <div className="box">
                                            <form onSubmit={sendMessage} className="input-box">
                                                <input onChange={e => setMessageText(e.target.value)} id="sendMessageInput" type="text" placeholder="Введите сообщение"/>
                                                <svg onClick={sendMessage} type="submit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/></svg>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            :
                                <div className="chat-bar"/>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MainPage;

const getDate = () => {
    const date_obj = new Date();

    let day = date_obj.getDate();
    if (day < 10) day = '0' + day;

    let month = date_obj.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let year = date_obj.getFullYear();

    let hours = date_obj.getHours();
    if (hours < 10) hours = '0' + hours;

    let minutes = date_obj.getMinutes();
    if (minutes < 10) minutes = '0' + minutes;

    let seconds = date_obj.getSeconds();
    if (seconds < 10) seconds = '0' + seconds;

    return  `${day}/${month}/${year} ${hours}:${minutes} ${seconds}`;
}