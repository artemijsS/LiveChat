import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Helmet } from 'react-helmet';
import {BackGround, Chat, Dialogs, FindNewDialog, Search} from "../Components";
import axios from "axios";
import {useAlert} from "react-alert";
import socket from "../socket";
import logo from "../Components/images/logo.jpg";
import {messageNewDelete} from "../redux/actions/message";


function MainPage () {

    const dispatch = useDispatch()

    const {dialogs, activeDialog} = useSelector(({dialog}) => dialog)
    const {token} = useSelector(({user}) => user.userData)

    const alert = useAlert()

    const [activeFindNewDialog, setActiveFindNewDialog] = useState(false)
    const [messageText, setMessageText] = useState('')


    useEffect(() => {
        setActiveFindNewDialog(false);
        dispatch(messageNewDelete())
    }, [activeDialog])

    const sendMessage = (e) => {
        e.preventDefault();
        const input = document.querySelector('#sendMessageInput');
        input.value = ""

        const message = {
            recipient: dialogs[activeDialog].id,
            text: messageText,
            dialogId: activeDialog
        }

        axios.post("/api/message/new", message, { headers: { Authorization: `Bearer ${token}` }}).then(message => {
            socket.emit('newMessage', message.data)
        }, err => {
            alert.show('Error with sending message');
        })
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
                            { activeFindNewDialog
                                ?
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
                                :
                                <div>
                                    <div className="box-header">
                                        <img src={logo} alt="error"/>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                                 height="24">
                                                <path fill="currentColor"
                                                      d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
                                            </svg>
                                        </div>
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
                                        <img src={logo} alt="error"/>
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