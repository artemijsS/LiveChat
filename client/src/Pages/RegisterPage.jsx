import React, {useState} from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {userDataFetch} from "../redux/actions/user";
import { useAlert } from 'react-alert'


function RegisterPage () {

    const dispatch = useDispatch()

    const alert = useAlert()

    const [loading, setLoading] = useState(false)

    const [form, setForm] = useState({
        telephone: '', name: '', email: '', password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const submit = event => {
        event.preventDefault()
        setLoading(true)
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
                <title>Registration</title>
            </Helmet>
            <div className="header bg-overlay"/>
            <div className="all-screen">
                <div className="main-box">
                    <form className="formLogin" onSubmit={submit}>
                        {loading
                            ?
                                <h1>Loading</h1>
                            :
                                <h1>Registration</h1>
                        }
                        <div className="text_field" >
                            <input type="tel" id="telephone" name="telephone" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="telephone">Telephone</label>
                        </div>
                        <div className="text_field">
                            <input type="tel" id="name" name="name" required onChange={changeHandler}/>
                            <span/>
                            <label htmlFor="name">Name</label>
                        </div>
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
                        <button type="submit">REGISTER</button>
                        <Link to="/login">Already registered? Log in!</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;