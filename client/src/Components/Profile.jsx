import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import logo from "./images/logo.jpg";

const Profile = () => {

    const {name, description} = useSelector(({user}) => user.userData)

    const [inputName, setInputName] = useState(true)
    const [inputAbout, setInputAbout] = useState(true)

    const changeName = () => {
        setInputName(true)
    }

    const changeAbout = () => {
        setInputAbout(true)
    }

    return (
        <div className="profile">
            <div className="image">
                <img src={logo} alt="error"/>
            </div>
            <div className="name">
                <span>Name</span>
                <div className={inputName ? "update" : " update borderBottom"}>
                    <input type="text" defaultValue={name} readOnly={inputName}/>
                    { inputName
                        ?
                            <div onClick={() => {setInputName(false)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"/></svg>
                            </div>
                        :
                            <div onClick={changeName}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                            </div>
                    }
                </div>
            </div>
            <div className="info"/>
            <div className="about">
                <span>About</span>
                <div className={inputAbout ? "update" : " update borderBottom"}>
                    <input type="text" defaultValue={description} placeholder={"enter about yourself"} readOnly={inputAbout}/>
                    { inputAbout
                        ?
                        <div onClick={() => {setInputAbout(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"/></svg>
                        </div>
                        :
                        <div onClick={changeAbout}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile;