import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logoutUser, updateAbout, updateName, updatePhoto} from "../redux/actions/user";
import axios from "axios";
import {useAlert} from "react-alert";
import {Image} from "cloudinary-react";


const Profile = () => {

    const dispatch = useDispatch()

    const {name, description, token, photo, telephone, language} = useSelector(({user}) => user.userData)

    const [inputName, setInputName] = useState(true)
    const [inputAbout, setInputAbout] = useState(true)

    const [nameInput, setNameInput] = useState(name)
    const [aboutInput, setAboutInput] = useState(description)
    const [loadingPhoto, setLoadingPhoto] = useState(false)

    const alert = useAlert()

    const imageInput = useRef()

    const changeName = () => {
        setInputName(true)
        if (nameInput !== name) {
            axios.post('/api/user/updateName', {name: nameInput}, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
                dispatch(updateName(res.data.name))
                alert.success(translate[language].nameWasChanged)
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else {
                    alert.show(translate[language].namCanNotBeEmpty)
                    const inName = document.getElementById('nameInput')
                    inName.value = name
                }
            })
        }
    }

    const changeAbout = () => {
        setInputAbout(true)
        if (aboutInput !== description) {
            axios.post('/api/user/updateAbout', {about: aboutInput}, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
                dispatch(updateAbout(res.data.about))
                alert.success(translate[language].aboutWasChanged)
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else {
                    alert.show(translate[language].error)
                    const inAbout = document.getElementById('aboutInput')
                    inAbout.value = description
                }
            })
        }
    }

    const changeImage = (e) => {
        const file = e.target.files[0]
        if (!file)
            return false
        setLoadingPhoto(true)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            uploadImage(reader.result)
        };

    }

    const uploadImage = async (base64EncodedImage) => {
        axios.post('/api/user/updateImage', {img: base64EncodedImage}, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
            dispatch(updatePhoto(res.data.photo))
            alert.success(translate[language].photoWasChanged)
            setLoadingPhoto(false)
        }, (err) => {
            if (err.response.status === 401) {
                alert.show(translate[language].errorAuth)
                setTimeout(() => {
                    dispatch(logoutUser())
                }, 1500)
            } else {
                alert.show(translate[language].error)
                setLoadingPhoto(false)
            }
        })
    };

    return (
        <div className="profile">
            <div className="image">
                <input ref={imageInput} onChange={changeImage} style={{display: "none"}} type="file" accept="image/*"/>
                <div onClick={() => imageInput.current.click()} className="changePhoto">
                    <span>{translate[language].changePhoto}</span>
                </div>

                <Image cloudName="artemijss" publicId={photo ? photo : "tkixqcinuntqmalr2dej"}/>
                { loadingPhoto &&
                    <div className="loadingChatBlock">
                        <div className="spinner spinner-1"/>
                    </div>
                }
            </div>
            <div className="name">
                <span>{translate[language].name}</span>
                <div className={inputName ? "update" : " update borderBottom"}>
                    <input id="nameInput" onChange={(e) => {setNameInput(e.target.value)}} type="text" defaultValue={name} readOnly={inputName}/>
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
                <span>{translate[language].about}</span>
                <div className={inputAbout ? "update" : " update borderBottom"}>
                    <input id="aboutInput" onChange={(e) => {setAboutInput(e.target.value)}} type="text" defaultValue={description} placeholder={translate[language].aboutPlaceholder} readOnly={inputAbout}/>
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
            <div className="info"/>
            <div className="about">
                <span>{translate[language].telephone}</span>
                <div className="update">
                    <div id="tel" style={{fontSize:"18px"}}>{telephone}</div>
                </div>
            </div>
        </div>
    )
}

export default Profile;

const translate = {
    LV: {
        aboutWasChanged: "Apraksts tika mainīts",
        nameWasChanged: "Vārds/Uzvārds tika mainīts",
        namCanNotBeEmpty: "Vārds nevar būt tukšs",
        photoWasChanged: "Foto tika mainīts",
        changePhoto: "Mainīt bildi",
        name: "Vārds Uzvārds",
        about: "Apraksts",
        aboutPlaceholder: "ievadiet par sevi",
        telephone: "Tālrunis",
        ok: "OK",
        cancel: "ATCELT",
        error: "Kļūda",
        errorAuth: "Autorizācijas periods ir beidzies"
    },
    RU: {
        aboutWasChanged: "Описание было изменено",
        nameWasChanged: "Имя/Фамилия была изменена",
        namCanNotBeEmpty: "Имя не может быть пустым",
        photoWasChanged: "Фотография была изменена",
        changePhoto: "Изменить фотографию",
        name: "Имя Фамилия",
        about: "Описание",
        aboutPlaceholder: "введите о себе",
        telephone: "Телефон",
        ok: "OK",
        cancel: "ОТМЕНА",
        error: "Ошибка",
        errorAuth: "Истек срок авторизации"
    },
    EN: {
        aboutWasChanged: "Description was changed",
        nameWasChanged: "Name/Surname was changed",
        namCanNotBeEmpty: "Name cannot be empty",
        photoWasChanged: "Photo was changed",
        changePhoto: "Change photo",
        name: "Name surname",
        about: "About",
        aboutPlaceholder: "enter about yourself",
        telephone: "Telephone",
        ok: "OK",
        cancel: "CANCEL",
        error: "Error",
        errorAuth: "Authorization period expired"
    }
}