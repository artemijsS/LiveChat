import React, {useState, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Helmet } from 'react-helmet';
import {BackGround, Profile} from "../Components";
import axios from "axios";
import {useAlert} from "react-alert";
import {Link} from 'react-router-dom'
import {changeUserLanguage, logoutUser} from "../redux/actions/user";
import {Image} from "cloudinary-react";


function AdminPage () {

    const dispatch = useDispatch()

    const {token, photo, language} = useSelector(({user}) => user.userData)

    const alert = useAlert()

    const imageInput = useRef()

    const [languageChoose, setLanguageChoose] = useState(false)
    const [telephone, setTelephone] = useState('')
    const [activeDialog, setActiveDialog] = useState('')
    const [users, setUsers] = useState([])
    const [user, setUser] = useState({})


    const [loadingUser, setLoadingUsers] = useState(false)
    const [loadingInfo, setLoadingInfo] = useState(false)
    const [loadingPhoto, setLoadingPhoto] = useState(false)

    const [languageTMP, setLanguageTMP] = useState(language)

    const [settingsPopUp, setSettingsPopUp] = useState(false)

    const [inputName, setInputName] = useState(true)
    const [inputTelephone, setInputTelephone] = useState(true)
    const [inputAbout, setInputAbout] = useState(true)
    const [inputEmail, setInputEmail] = useState(true)

    const [nameInput, setNameInput] = useState('')
    const [telephoneInput, setTelephoneInput] = useState('')
    const [emailInput, setEmailInput] = useState('')
    const [aboutInput, setAboutInput] = useState('')

    const popUpRef = useRef();
    const settingMenuRef = useRef();

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


    useEffect(() => {
        if (telephone.length > 1) {
            setLoadingUsers(true)
            axios.post("/api/user/admin/find", {telephone: telephone}, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
                setLoadingUsers(false)
                setUsers(res.data)
            }, () => {
                alert.show(translate[language].error)
            })
        } else if (telephone.length === 0) {
            setUsers([]);
        }
    }, [telephone])

    useEffect(() => {
        if (activeDialog) {
            setLoadingInfo(true)
            axios.get(`/api/user/find/${activeDialog}`, { headers: { Authorization: `Bearer ${token}` }}).then(res => {
                console.log(res.data)
                setUser(res.data)
                setNameInput(res.data.name)
                setTelephoneInput(res.data.telephone)
                setAboutInput(res.data.description)
                setEmailInput(res.data.email)
                setLoadingInfo(false)
            }, () => {
                alert.show(translate[language].error)
            })
        }
        setInputName(true)
        setInputTelephone(true)
        setInputEmail(true)
        setInputAbout(true)
    }, [activeDialog])

    const changeLanguage = () => {
        if (language === languageTMP)
            return
        axios.post("/api/user/updateLanguage", { language: languageTMP}, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
            dispatch(changeUserLanguage(res.data.language))
            alert.success(translate[languageTMP].languageBox.notification)
            setLanguageChoose(false)
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
        axios.post('/api/user/admin/updateImage', {img: base64EncodedImage, id: user._id}, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
            setUser({...user, photo: res.data.photo})
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

    const changeName = (id) => {
        setInputName(true)
        if (nameInput !== user.name) {
            axios.post('/api/user/admin/updateName', {name: nameInput, id: id}, { headers: { Authorization: `Bearer ${token}` }}).then(() => {
                alert.success(translate[language].nameWasChanged)
                setUser({...user, name: nameInput})
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else {
                    alert.show(translate[language].namCanNotBeEmpty)
                    const inName = document.getElementById('nameInput')
                    inName.value = user.name
                }
            })
        }
    }

    const changeTelephone = (id) => {
        setInputTelephone(true)
        if (telephoneInput !== user.telephone) {
            axios.post('/api/user/admin/updateTelephone', {telephone: telephoneInput, id: id, language: language}, { headers: { Authorization: `Bearer ${token}` }}).then(() => {
                alert.success(translate[language].telephoneWasChanged)
                setUser({...user, telephone: telephoneInput})
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else if (err.response.status === 400) {
                    alert.show(err.response.data.message)
                } else if (err.response.status === 500) {
                    alert.show(translate[language].errorUniqueTel)
                } else {
                    alert.show(translate[language].error)
                }
                const inName = document.getElementById('telephoneInput')
                inName.value = user.telephone
            })
        }
    }

    const changeEmail = (id) => {
        setInputEmail(true)
        if (emailInput !== user.email) {
            axios.post('/api/user/admin/updateEmail', {email: emailInput, id: id, language: language}, { headers: { Authorization: `Bearer ${token}` }}).then(() => {
                alert.success(translate[language].emailWasChanged)
                setUser({...user, email: emailInput})
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else if (err.response.status === 400) {
                    alert.show(err.response.data.message)
                } else if (err.response.status === 500) {
                    alert.show(translate[language].errorUniqueTel)
                } else {
                    alert.show(translate[language].error)
                }
                const inName = document.getElementById('emailInput')
                inName.value = user.email
            })
        }
    }

    const changeAbout = (id) => {
        setInputAbout(true)
        if (aboutInput !== user.description) {
            axios.post('/api/user/admin/updateAbout', {about: aboutInput, id: id}, { headers: { Authorization: `Bearer ${token}` }}).then(() => {
                alert.success(translate[language].aboutWasChanged)
                setUser({...user, description: aboutInput})
            }, (err) => {
                if (err.response.status === 401) {
                    alert.show(translate[language].errorAuth)
                    setTimeout(() => {
                        dispatch(logoutUser())
                    }, 1500)
                } else {
                    alert.show(translate[language].error)
                    const inAbout = document.getElementById('aboutInput')
                    inAbout.value = user.description
                }
            })
        }
    }

    return (
        <div>
            <Helmet>
                <title>Live Chat | Admin</title>
            </Helmet>
            <BackGround/>
            { languageChoose &&
            <div className="language">
                <div className="rel-block">
                    <div className="box-choose">
                        <div className="heading">{translate[language].languageBox.heading}</div>
                        <div className="choose">
                            <label>
                                <input name="lan" value="LV" onChange={(e) => {setLanguageTMP(e.target.value)}} type="radio" defaultChecked={language === "LV"}/>
                                LV
                            </label>
                            <label>
                                <input name="lan" value="RU" onChange={(e) => {setLanguageTMP(e.target.value)}} type="radio" defaultChecked={language === "RU"}/>
                                RU
                            </label>
                            <label>
                                <input name="lan" value="EN" onChange={(e) => {setLanguageTMP(e.target.value)}} type="radio" defaultChecked={language === "EN"}/>
                                EN
                            </label>
                        </div>
                        <div className="bottom">
                            <div className="ok" onClick={changeLanguage}>
                                {translate[language].ok}
                            </div>
                            <div className="cancel" onClick={() => {setLanguageChoose(false)}}>
                                {translate[language].cancel}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
            <div className="all-screen">
                <div className="main-box">
                    <div className="whats-app">
                        <div className="side-bar">
                            <div className="box-header admin">
                                <Image cloudName="artemijss" publicId={photo ? photo : "tkixqcinuntqmalr2dej"}/>
                                <div className="settings">
                                    <svg ref={settingMenuRef} className={settingsPopUp ? "active" : ""} onClick={() => {setSettingsPopUp(!settingsPopUp)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24"
                                         height="24">
                                        <path fill="currentColor"
                                              d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"/>
                                    </svg>
                                    {
                                        settingsPopUp &&
                                        <div className="settingsPopUp" ref={popUpRef}>
                                            <div className="settingsLink" onClick={() => {setLanguageChoose(true); setSettingsPopUp(false)}}><div>{translate[language].language}</div></div>
                                            <div className="settingsLink" onClick={() => {dispatch(logoutUser())}}><div>{translate[language].logout}</div></div>
                                        </div>
                                    }
                                </div>
                                <Link to="/">To Chat</Link>
                            </div>
                            <div className="search">
                                <div className="box">
                                    <div className="input-box">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"/></svg>
                                        <input onChange={(e) => {setTelephone(e.target.value)}} type="text" placeholder={translate[language].inputPlaceholderSearch}/>
                                    </div>
                                </div>
                            </div>
                            { loadingUser &&
                                <div className="loadingChatBlock admin">
                                    <div className="spinner spinner-1"/>
                                </div>
                            }
                            { users.length > 0 && !loadingUser &&
                                users.map(obj => {
                                    return (
                                        <div onClick={() => {setActiveDialog(obj._id)}} className={activeDialog === obj._id ? "dialog active" : "dialog"} key={obj._id}>
                                            <Image cloudName="artemijss" publicId={obj.photo ? obj.photo : "tkixqcinuntqmalr2dej"}/>
                                            <div className="details">
                                                <div className="dialog-info1">
                                                    <div className={`dialog-name big-text`}>
                                                        {obj.name} {obj.telephone}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            { users.length === 0 && !loadingUser &&
                                <div>NOPE</div>
                            }
                        </div>
                        {activeDialog &&
                            <div className="userInfo">
                                <div className="box-header">
                                    <svg onClick={() => setActiveDialog('')} xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="currentColor"
                                              d="M19.1 17.2l-5.3-5.3 5.3-5.3-1.8-1.8-5.3 5.4-5.3-5.3-1.8 1.7 5.3 5.3-5.3 5.3L6.7 19l5.3-5.3 5.3 5.3 1.8-1.8z"/>
                                    </svg>
                                    <div className="title">{translate[language].profileInfo}</div>
                                </div>
                                {!loadingInfo &&
                                <>
                                    <div className="user">
                                        <div className="profile">
                                            <div className="image admin">
                                                <input ref={imageInput} onChange={changeImage} style={{display: "none"}} type="file" accept="image/*"/>
                                                <div onClick={() => imageInput.current.click()} className="changePhoto">
                                                    <span>{translate[language].changePhoto}</span>
                                                </div>

                                                <Image cloudName="artemijss" publicId={user.photo ? user.photo : "tkixqcinuntqmalr2dej"}/>
                                                { loadingPhoto &&
                                                <div className="loadingChatBlock">
                                                    <div className="spinner spinner-1"/>
                                                </div>
                                                }
                                            </div>
                                            <div className="name">
                                                <span>{translate[language].name}</span>
                                                <div className={inputName ? "update" : " update borderBottom"}>
                                                    <input id="nameInput" onChange={(e) => {setNameInput(e.target.value)}} type="text" defaultValue={user.name} readOnly={inputName}/>
                                                    { inputName
                                                        ?
                                                        <div onClick={() => {setInputName(false)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"/></svg>
                                                        </div>
                                                        :
                                                        <div onClick={() => changeName(user._id)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="infoA"/>
                                            <div className="about">
                                                <span>{translate[language].about}</span>
                                                <div className={inputAbout ? "update" : " update borderBottom"}>
                                                    <input id="aboutInput" onChange={(e) => {setAboutInput(e.target.value)}} type="text" defaultValue={user.description} placeholder={translate[language].aboutPlaceholder} readOnly={inputAbout}/>
                                                    { inputAbout
                                                        ?
                                                        <div onClick={() => {setInputAbout(false)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"/></svg>
                                                        </div>
                                                        :
                                                        <div onClick={() => {changeAbout(user._id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="about">
                                                <span>{translate[language].telephone}</span>
                                                <div className={inputTelephone ? "update" : " update borderBottom"}>
                                                    <input id="telephoneInput" onChange={(e) => {setTelephoneInput(e.target.value)}} type="text" defaultValue={user.telephone} placeholder={translate[language].telephone} readOnly={inputTelephone}/>
                                                    { inputTelephone
                                                        ?
                                                        <div onClick={() => {setInputTelephone(false)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"/></svg>
                                                        </div>
                                                        :
                                                        <div onClick={() => {changeTelephone(user._id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="about">
                                                <span>{translate[language].email}</span>
                                                <div className={inputEmail ? "update" : " update borderBottom"}>
                                                    <input id="emailInput" onChange={(e) => {setEmailInput(e.target.value)}} type="text" defaultValue={user.email} placeholder={translate[language].email} readOnly={inputEmail}/>
                                                    { inputEmail
                                                        ?
                                                        <div onClick={() => {setInputEmail(false)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3.95 16.7v3.4h3.4l9.8-9.9-3.4-3.4-9.8 9.9zm15.8-9.1c.4-.4.4-.9 0-1.3l-2.1-2.1c-.4-.4-.9-.4-1.3 0l-1.6 1.6 3.4 3.4 1.6-1.6z"/></svg>
                                                        </div>
                                                        :
                                                        <div onClick={() => {changeEmail(user._id)}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M9 17.2l-4-4-1.4 1.3L9 19.9 20.4 8.5 19 7.1 9 17.2z"/></svg>
                                                        </div>
                                                    }
                                                </div>
                                            </div>


                                            <div className="status">
                                                {
                                                    user.status ? translate[language].online : translate[language].offline
                                                }
                                            </div>
                                        </div>

                                    </div>
                                </>
                                }
                                {loadingInfo &&
                                <div className="loadingChatBlock">
                                    <div className="spinner spinner-1"/>
                                </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AdminPage;

const translate = {
    LV: {
        languageBox: {
            notification: "Valoda it nomainīta",
            heading: "Izvēlieties valodu"
        },
        inputPlaceholderSearch: "Meklēt cilvēku pēs telefona",
        newChat: "Jauna tērzēšana",
        profile: "Profils",
        language: "Valoda",
        logout: "Iziet",
        profileInfo: "Profila informācija",
        addToFriends: "Pievienot draugiem",
        deleteChat: "Dzēst tērzēšanu",
        sure: "Vai jūs to tiešam gribat?",
        aboutWasChanged: "Apraksts tika mainīts",
        nameWasChanged: "Vārds/Uzvārds tika mainīts",
        emailWasChanged: "Email tika mainīts",
        telephoneWasChanged: "Telefons tika mainīts",
        namCanNotBeEmpty: "Vārds nevar būt tukšs",
        photoWasChanged: "Foto tika mainīts",
        changePhoto: "Mainīt bildi",
        name: "Vārds Uzvārds",
        about: "Apraksts",
        telephone: "Tālrunis",
        email: "Email",
        deleted: "DZĒSTS",
        online: "online",
        offline: "offline",
        enterMessage: "Ievadiet ziņojumu",
        ok: "OK",
        cancel: "ATCELT",
        error: "Kļūda",
        errorMsg: "Sūtot ziņojumu, radās kļūda",
        errorMsgEnter: "Ievadiet ziņojuma tekstu",
        errorMsgDel: "Šī tērzēšana ir izdzēsta, un jūs nevarat nosūtīt ziņojumus",
        errorAuth: "Autorizācijas periods ir beidzies",
        errorUniqueTel: "Lietotājs ar šo telefonu jau ir reģistrēts",
        errorUniqueEm: "Lietotājs ar šo e-pastu jau ir reģistrēts"
    },
    RU: {
        languageBox: {
            notification: "Язык успешно поменян",
            heading: "Выберите язык"
        },
        inputPlaceholderSearch: "Поиск человека по телефону",
        newChat: "Новый чат",
        profile: "Профиль",
        language: "Язык",
        logout: "Выйти",
        profileInfo: "Информация о профиле",
        addToFriends: "Добавить в друзья",
        deleteChat: "Удалить Чат",
        sure: "Вы уверены?",
        aboutWasChanged: "Описание было изменено",
        nameWasChanged: "Имя/Фамилия была изменена",
        telephoneWasChanged: "Телефон был изменен",
        emailWasChanged: "Email был изменен",
        namCanNotBeEmpty: "Имя не может быть пустым",
        photoWasChanged: "Фотография была изменена",
        changePhoto: "Изменить фотографию",
        name: "Имя Фамилия",
        about: "Описание",
        telephone: "Телефон",
        email: "Email",
        deleted: "УДАЛЕН",
        online: "в сети",
        offline: "не в сети",
        enterMessage: "Введите сообщение",
        ok: "OK",
        cancel: "ОТМЕНА",
        error: "Ошибка",
        errorMsg: "Ошибка при отправке сообщения",
        errorMsgEnter: "Введите текст сообщения",
        errorMsgDel: "ЭТОТ ЧАТ УДАЛЕН ВЫ НЕ МОЖЕТЕ ОТПРАВЛЯТЬ СООБЩЕНИЯ",
        errorAuth: "Истек срок авторизации",
        errorUniqueTel: "Пользователь с этим телефоном уже зарегистрирован",
        errorUniqueEm: "Пользователь с этой почтой уже зарегистрирован"
    },
    EN: {
        languageBox: {
            notification: "Language changed",
            heading: "Select a language"
        },
        inputPlaceholderSearch: "Search person by phone",
        newChat: "New Chat",
        profile: "Profile",
        language: "Language",
        logout: "Logout",
        profileInfo: "Profile Info",
        addToFriends: "Add to friends",
        deleteChat: "Delete Chat",
        sure: "Are you sure?",
        aboutWasChanged: "Description was changed",
        nameWasChanged: "Name/Surname was changed",
        telephoneWasChanged: "Telephone was changed",
        emailWasChanged: "Email was changed",
        namCanNotBeEmpty: "Name cannot be empty",
        photoWasChanged: "Photo was changed",
        changePhoto: "Change photo",
        name: "Name Surname",
        about: "About",
        telephone: "Telephone",
        email: "Email",
        deleted: "DELETED",
        online: "online",
        offline: "offline",
        enterMessage: "Enter a message",
        ok: "OK",
        cancel: "CANCEL",
        error: "Error",
        errorMsg: "Error with sending message",
        errorMsgEnter: "Enter the message text",
        errorMsgDel: "THIS CHAT IS DELETED YOU CANT SEND MESSAGES",
        errorAuth: "Authorization period expired",
        errorUniqueTel: "User with this telephone is already registered",
        errorUniqueEm: "User with this email is already registered"
    }
}