import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {activeDialogSet} from "../redux/actions/dialog";
import {Image} from "cloudinary-react";

const Dialogs = () => {

    const dispatch = useDispatch()

    const {dialogs, activeDialog, dialogsOrder} = useSelector(({dialog}) => dialog)
    const {userData} = useSelector(({user}) => user)

    const [today, setToday] = useState('');
    const [yesterday, setYesterday] = useState('');

    useEffect(() => {
        let yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday = getDate(yesterday)
        setYesterday(yesterday)
        setToday(getDate())
    }, [])

    useEffect(() => {
        const elems = document.querySelectorAll(".yesterday-dialogs-change");
        for (let i = 0; i < elems.length; i++) {
            elems[i].innerHTML = translate[userData.language].yesterday;
        }
    }, [userData.language])

    const setActiveDialog = (id) => {
        dispatch(activeDialogSet(id))
    }

    return (
        <div className="dialogs">
            {dialogs !== {} &&
                dialogsOrder.map(key => {

                    const obj = dialogs[key]
                    let i = 0;

                    if (obj.dialog.last_message_time.split(' ')[0] === today) {
                        i = 1
                    } else if (obj.dialog.last_message_time.split(' ')[0] === yesterday) {
                        obj.dialog.last_message_time = translate[userData.language].yesterday
                    }

                    return (
                        <div onClick={() => {setActiveDialog(key)}} className={activeDialog === key ? "dialog active" : "dialog"} key={key}>
                            <Image cloudName="artemijss" publicId={obj.photo ? obj.photo : "tkixqcinuntqmalr2dej"}/>
                            <div className="details">
                                <div className="dialog-info1">
                                    <div style={obj.deleted && {color: "rgb(214,48,46)"}} className={`dialog-name big-text ${obj.dialog.last_message_owner !== userData.userId && !obj.dialog.last_message_status ? "bold" : ""}`}>
                                        {obj.name}
                                    </div>
                                    <div className={`mssg-time ${obj.dialog.last_message_owner !== userData.userId && !obj.dialog.last_message_status ? "black bold" : ""} ${obj.dialog.last_message_time === translate["LV"].yesterday || obj.dialog.last_message_time === translate["RU"].yesterday || obj.dialog.last_message_time === translate["EN"].yesterday ? "yesterday-dialogs-change" : "" }`}>
                                        {obj.dialog.last_message_time ? obj.dialog.last_message_time.split(' ')[i] : ""}
                                    </div>
                                </div>
                                <div className="last-message_notification">
                                    <div className={`last-message big-text ${obj.dialog.last_message_owner !== userData.userId ? "noPadding" : ""}`}>
                                        {obj.dialog.last_message &&
                                        <span className={obj.dialog.last_message_owner === userData.userId ? `${obj.dialog.last_message_status ? "opened" : ""}` : "none"}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path fill="currentColor" d="M17.394 5.035l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-.427-.388a.381.381 0 0 0-.578.038l-.451.576a.497.497 0 0 0 .043.645l1.575 1.51a.38.38 0 0 0 .577-.039l7.483-9.602a.436.436 0 0 0-.076-.609zm-4.892 0l-.57-.444a.434.434 0 0 0-.609.076l-6.39 8.198a.38.38 0 0 1-.577.039l-2.614-2.556a.435.435 0 0 0-.614.007l-.505.516a.435.435 0 0 0 .007.614l3.887 3.8a.38.38 0 0 0 .577-.039l7.483-9.602a.435.435 0 0 0-.075-.609z"/></svg>
                                        </span>
                                        }
                                        <span className={obj.dialog.last_message_owner !== userData.userId && !obj.dialog.last_message_status ? "black" : ""}>
                                            {obj.dialog.last_message}
                                        </span>
                                    </div>
                                    { obj.dialog.last_message_owner !== userData.userId && !obj.dialog.last_message_status &&
                                        <div className="notification">
                                            <span>!</span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            {dialogsOrder.length === 0 &&
                <div className="no_chat">
                    <p>{translate[userData.language].noChat1}</p>
                    <p>{translate[userData.language].noChat2}</p>
                </div>
            }

        </div>
    )
}

export default Dialogs;

const getDate = (date_obj = new Date()) => {

    let day = date_obj.getDate();
    if (day < 10) day = '0' + day;

    let month = date_obj.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let year = date_obj.getFullYear();

    return  `${day}/${month}/${year}`;
}

const translate = {
    LV: {
        yesterday: "vakar",
        noChat1: "Jums vēl nav nevienas aktīvas tērzēšanas",
        noChat2: "Izmantojiet meklēšanu, lai atrastu draugus!",
        ok: "OK",
        cancel: "ATCELT",
        error: "Kļūda"
    },
    RU: {
        yesterday: "вчера",
        noChat1: "У вас еще нет активных чатов",
        noChat2: "Используйте поиск, чтобы найти друзей!",
        ok: "OK",
        cancel: "ОТМЕНА",
        error: "Ошибка"
    },
    EN: {
        yesterday: "yesterday",
        noChat1: "You don't have any active chats yet",
        noChat2: "Use search to find friends!",
        ok: "OK",
        cancel: "CANCEL",
        error: "Error"
    }
}