import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import axios from "axios";
import {Image} from "cloudinary-react";
import {infoAboutUserSet, logoutUser} from "../redux/actions/user";
import {useAlert} from "react-alert";


const FindNewDialog = () => {

    const dispatch = useDispatch();
    const alert = useAlert()

    const {token, language} = useSelector(({user}) => user.userData)
    const {infoAboutUser} = useSelector(({user}) => user)

    const [dialogs, setDialogs] = useState([]);

    const newDialogs = (search) => {
        if (search.length > 1)
            axios.post("/api/user/find", {telephone: search},{ headers: { Authorization: `Bearer ${token}` }}).then(res => {
                setDialogs(res.data)
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else {
                    alert.show(translate[language].error)
                }
            })
    }

    const openUserProfile = (userId) => {
        if (userId !== infoAboutUser.id)
            dispatch(infoAboutUserSet({bool: true, id: userId}))
    }

    return (
        <>
            <div className="search">
                <div className="box">
                    <div className="input-box">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"/></svg>
                        <input onChange={(e) => {newDialogs(e.target.value)}} type="text" placeholder={translate[language].inputPlaceholder}/>
                    </div>
                </div>
            </div>
            <div className="dialogs">
                {
                    dialogs.map((user, i) => {
                        return (
                            <div onClick={() => openUserProfile(user._id)} className="dialog" key={user._id+i}>
                                <Image cloudName="artemijss" publicId={user.photo ? user.photo : "tkixqcinuntqmalr2dej"} crop="scale"/>
                                <div className="details">
                                    <div className="dialog-info1">
                                        <div className="dialog-name big-text">
                                            {user.name} {user.telephone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default FindNewDialog;

const translate = {
    LV: {
        inputPlaceholder: "S??kt jaunu dialogu - ievadiet t??lruni",
        ok: "OK",
        cancel: "ATCELT",
        error: "K????da",
        errorAuth: "Autoriz??cijas periods ir beidzies"
    },
    RU: {
        inputPlaceholder: "???????????? ?????????? ???????????? - ?????????????? ??????????????",
        ok: "OK",
        cancel: "????????????",
        error: "????????????",
        errorAuth: "?????????? ???????? ??????????????????????"
    },
    EN: {
        inputPlaceholder: "Start new dialog - enter telephone",
        ok: "OK",
        cancel: "CANCEL",
        error: "Error",
        errorAuth: "Authorization period expired"
    }
}