import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useAlert} from "react-alert";
import {userDataFetch} from "../redux/actions/user";


function AuthPage () {

    const dispatch = useDispatch()

    const alert = useAlert()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        email: '', password: ''
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
                <title>Login</title>
            </Helmet>
            <div className="header bg-overlay"/>
            <div className="all-screen">
                <div className="main-box">
                    <form className="formLogin" onSubmit={submit}>
                        {loading
                            ?
                                <h1>Loading</h1>
                            :
                                <h1>Login</h1>
                        }
                        <div className="text_field">
                            <input type="email" id="email" name="email" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="text_field">
                            <input type="password" id="pass" name="password" minLength="6" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="pass">Password</label>
                        </div>
                        <button type="submit">LOGIN</button>
                        <Link to="/registration">Not a member? Sign in!</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;