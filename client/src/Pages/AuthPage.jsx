import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useAlert} from "react-alert";
import {userDataFetch} from "../redux/actions/user";


function AuthPage () {

    const dispatch = useDispatch()

    const { language } = useSelector(({user}) => user.userData)

    const alert = useAlert()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        email: '', password: '', language: language
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const submit = event => {
        event.preventDefault()
        setLoading(true)
        dispatch(userDataFetch(form,'login')).then(res => {
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
                        <div className="text_field">
                            <input type="email" id="email" name="email" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="text_field">
                            <input type="password" id="pass" name="password" minLength="6" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="pass">{translate[language].password}</label>
                        </div>
                        <button type="submit">{translate[language].login}</button>
                        <Link to="/registration">{translate[language].signUp}</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;

const translate = {
    LV: {
        title: "Pieslēgties",
        loading: "Ielādēšana",
        password: "Parole",
        login: "PIESLĒGTIES",
        signUp: "Nav biedrs? Pierakstīties!",
        ok: "OK",
        cancel: "ATCELT",
        error: "Kļūda"
    },
    RU: {
        title: "Вход",
        loading: "Загрузка",
        password: "Пароль",
        login: "ВОЙТИ",
        signUp: "Нет аккаунта? Зарегистрироваться!",
        ok: "OK",
        cancel: "ОТМЕНА",
        error: "Ошибка"
    },
    EN: {
        title: "Login",
        loading: "Loading",
        password: "Password",
        login: "LOGIN",
        signUp: "Not a member? Sign up!",
        ok: "OK",
        cancel: "CANCEL",
        error: "Error"
    }
}