import React from 'react';
import { Helmet } from 'react-helmet';
import {Link} from "react-router-dom";


function RegisterPage () {
    return (
        <div>
            <Helmet>
                <title>Registration</title>
            </Helmet>
            <div className="header bg-overlay"/>
            <div className="all-screen">
                <div className="main-box">
                    <form className="formLogin" >
                        <h1>Registration</h1>
                        <div className="text_field" >
                            <input type="tel" id="telephone" name="telephone" required/>
                            <span></span>
                            <label htmlFor="telephone">Telephone</label>
                        </div>
                        <div className="text_field">
                            <input type="tel" id="name" name="name" required/>
                            <span></span>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="text_field">
                            <input type="email" id="email" name="email" required/>
                            <span></span>
                            <label htmlFor="email">E-mail</label>
                        </div>
                        <div className="text_field">
                            <input type="password" id="pass" name="password" minLength="6" required/>
                            <span></span>
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