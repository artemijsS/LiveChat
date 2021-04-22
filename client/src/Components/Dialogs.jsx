import React from 'react';
import {useSelector} from "react-redux";


import logo from "./images/logo.jpg";

const Dialogs = () => {

    const {dialogs} = useSelector(({dialog}) => dialog)
    const {userData} = useSelector(({user}) => user)

    return (
        <div className="dialogs">
            {dialogs !== {} &&
                Object.keys(dialogs).map(key => {

                    const obj = dialogs[key]

                    return (
                        <div className="dialog" key={key}>
                            <img src={logo} alt="error"/>
                            <div className="details">
                                <div className="dialog-info1">
                                    <div className="dialog-name big-text">
                                        {obj.name}
                                    </div>
                                    <div className="mssg-time">
                                        {obj.dialog.last_message_time ? obj.dialog.last_message_time.split(' ')[1] : ""}
                                    </div>
                                </div>
                                <div className="last-message_notification">
                                    <div className={`last-message big-text ${obj.dialog.last_message_owner !== userData.userId ? "noPadding" : ""}`}>
                                        {obj.dialog.last_message &&
                                        <span className={obj.dialog.last_message_owner === userData.userId ? `${obj.dialog.last_message_status ? "opened" : ""}` : "none"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"/></svg>
                                        </span>
                                        }
                                        {obj.dialog.last_message}
                                    </div>
                                    <div className="notification">
                                        {/*<span>2</span>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {Object.keys(dialogs).length === 0 &&
                <div>NO-CHATS</div>
            }

        </div>
    )
}

export default Dialogs;