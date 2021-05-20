import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updateAbout, updateName, updatePhoto} from "../redux/actions/user";
import axios from "axios";
import {useAlert} from "react-alert";
import {Image} from "cloudinary-react";


const Profile = () => {

    const dispatch = useDispatch()

    const {name, description, token, photo} = useSelector(({user}) => user.userData)

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
                alert.success('Name was changed')
            }, () => {
                alert.show('Name can not be empty')
                const inName = document.getElementById('nameInput')
                inName.value = name
            })
        }
    }

    const changeAbout = () => {
        setInputAbout(true)
        if (aboutInput !== description) {
            axios.post('/api/user/updateAbout', {about: aboutInput}, { headers: { Authorization: `Bearer ${token}` }}).then((res) => {
                dispatch(updateAbout(res.data.about))
                alert.success('About was changed')
            }, () => {
                alert.show('Error')
                const inAbout = document.getElementById('aboutInput')
                inAbout.value = description
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
            setLoadingPhoto(false)
        }, () => {
            alert.show('error')
            setLoadingPhoto(false)
        })
    };

    return (
        <div className="profile">
            <div className="image">
                <input ref={imageInput} onChange={changeImage} style={{display: "none"}} type="file" accept="image/*"/>
                <div className="changePhoto">
                    Change photo
                </div>

                <Image onClick={() => imageInput.current.click()} cloudName="artemijss" publicId={photo ? photo : "tkixqcinuntqmalr2dej"}/>
                { loadingPhoto &&
                    <div className="loadingChatBlock">
                        <div className="spinner spinner-1"/>
                    </div>
                }
            </div>
            <div className="name">
                <span>Name</span>
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
                <span>About</span>
                <div className={inputAbout ? "update" : " update borderBottom"}>
                    <input id="aboutInput" onChange={(e) => {setAboutInput(e.target.value)}} type="text" defaultValue={description} placeholder={"enter about yourself"} readOnly={inputAbout}/>
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