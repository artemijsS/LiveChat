import React from 'react';
import { Helmet } from 'react-helmet';
import {Link} from "react-router-dom";


function AuthPage () {
    return (
        <div>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <div className="header bg-overlay"/>
            <div className="all-screen">
                <div className="main-box">
                    <form className="formLogin" >
                        <h1>Login</h1>
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
                        <button type="submit">LOGIN</button>
                        <Link to="/registration">Not a member? Sign in!</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;