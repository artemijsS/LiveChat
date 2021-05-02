import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";

const Chat = () => {

    const {activeDialog} = useSelector(({dialog}) => dialog)
    const {token, userId} = useSelector(({user}) => user.userData)
    const {newMessages} = useSelector(({message}) => message)

    const [messages, setMessages] = useState([])

    useEffect(() => {
        axios.get(`/api/message/find/${activeDialog}`, { headers: { Authorization: `Bearer ${token}` } }).then(res => {
            setMessages(res.data)
        }, err => {
            console.log(err)
        })
    }, [activeDialog, token])

    return (
        <div className="chat">
            {
                newMessages && newMessages.map((obj, i) => {
                    return (
                        <div className={`message-block ${userId === obj.owner ? "message-out" : "message-in"}`} key={i+obj._id}>
                            <div className="message">
                                <div className="text-block">
                                    <div className="text">{obj.text}</div>
                                    <div className="time-status">
                                        {obj.time.split(' ')[1]}
                                        <svg className={obj.status ? "opened" : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <svg className="triangle" id="82734756-3615-4ec8-a382-6c6e9d1975af" data-name="Layer 1"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.96699 58.57164">
                                <path className="0082bf7a-a2e0-46d1-be00-84645c2dcbc6"
                                      d="M280.49486,515.96866l-44.88734,15.11513a.69234.69234,0,0,1-.221.03621H214.69244A.69245.69245,0,0,1,214,530.42756V515.31243a.69244.69244,0,0,1,.69244-.69243h65.58144A.69243.69243,0,0,1,280.49486,515.96866Z"
                                      transform="translate(-213.5 -514.12)"/>
                            </svg>
                        </div>
                    )
                })
            }
            {
                messages.map((obj, i) => {
                    return (
                        <div className={`message-block ${userId === obj.owner ? "message-out" : "message-in"}`} key={i+obj._id}>
                            <div className="message">
                                <div className="text-block">
                                    <div className="text">{obj.text}</div>
                                    <div className="time-status">
                                        {obj.time.split(' ')[1]}
                                        <svg className={obj.status ? "opened" : ""} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15" width="16" height="15"><path fill="currentColor" d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"/></svg>
                                    </div>
                                </div>
                            </div>
                            <svg className="triangle" id="82734756-3615-4ec8-a382-6c6e9d1975af" data-name="Layer 1"
                                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 67.96699 58.57164">
                                <path className="0082bf7a-a2e0-46d1-be00-84645c2dcbc6"
                                      d="M280.49486,515.96866l-44.88734,15.11513a.69234.69234,0,0,1-.221.03621H214.69244A.69245.69245,0,0,1,214,530.42756V515.31243a.69244.69244,0,0,1,.69244-.69243h65.58144A.69243.69243,0,0,1,280.49486,515.96866Z"
                                      transform="translate(-213.5 -514.12)"/>
                            </svg>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chat;