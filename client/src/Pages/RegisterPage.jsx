import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userDataFetch} from "../redux/actions/user";
import { useAlert } from 'react-alert'


function RegisterPage () {

    const dispatch = useDispatch()

    const { language } = useSelector(({user}) => user.userData)

    const alert = useAlert()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        telephone: '', name: '', email: '', password: '', language: language
    })

    const [confirmPass, setConfirmPass] = useState('');

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const submit = event => {
        event.preventDefault()
        setLoading(true)
        console.log(confirmPass)
        if (confirmPass !== form.password) {
            alert.show('Passwords not matched')
            setLoading(false)
        }
        dispatch(userDataFetch(form,'register')).then(res => {
            if (res) {
                setLoading(false)
                alert.show(res);
            }
        })
    }

    return (
        <div>
            <Helmet>
                <title>{translate[language].title}</title>
            </Helmet>
            <div className="header bg-overlay"/>
            <div className="all-screen">
                <div className="main-box">
                    <form className="formLogin" onSubmit={submit}>
                        {loading
                            ?
                                <h1>{translate[language].loading}</h1>
                            :
                                <h1>{translate[language].title}</h1>
                        }
                        <div className="text_field" >
                            <input type="tel" id="telephone" name="telephone" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="telephone">{translate[language].telephone}</label>
                        </div>
                        <div className="text_field">
                            <input type="tel" id="name" name="name" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="name">{translate[language].nameSurname}</label>
                        </div>
                        <div className="text_field">
                            <input type="email" id="email" name="email" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="text_field">
                            <input type="password" id="password" name="password" minLength="6" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="pass">{translate[language].password}</label>
                        </div>
                        <div className="text_field">
                            <input type="password" id="confirm_password" name="password" minLength="6" required onChange={(e) => {setConfirmPass(e.target.value)}}/>
                            <span/>
                            <label htmlFor="pass">{translate[language].confirmPassword}</label>
                        </div>
                        <button type="submit">{translate[language].signUp}</button>
                        <Link to="/login">{translate[language].login}</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;

const translate = {
    LV: {
        title: "Reģistrācija",
        loading: "Ielādēšana",
        password: "Parole",
        login: "Jau ir reģistrēts? Pieslēgties!",
        signUp: "REĢISTRĒTIES",
        telephone: "Telefons",
        nameSurname: "Vārds Uzvārds",
        confirmPassword: "Apstipriniet paroli",
        ok: "OK",
        cancel: "ATCELT",
        error: "Kļūda"
    },
    RU: {
        title: "Регистрация",
        loading: "Загрузка",
        password: "Пароль",
        login: "Уже зарегистрирован? Войти!",
        signUp: "ЗАРЕГИСТРИРОВАТЬСЯ",
        telephone: "Телефон",
        nameSurname: "Имя Фамилия",
        confirmPassword: "Подтвердите пароль",
        ok: "OK",
        cancel: "ОТМЕНА",
        error: "Ошибка"
    },
    EN: {
        title: "Registration",
        loading: "Loading",
        password: "Password",
        login: "Already registered? Log in!",
        signUp: "REGISTER",
        telephone: "Telephone",
        nameSurname: "Name Surname",
        confirmPassword: "Confirm password",
        ok: "OK",
        cancel: "CANCEL",
        error: "Error"
    }
}