import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import {MainPage, AuthPage, RegisterPage} from "./Pages";

import {useSelector} from "react-redux";


export const useRoutes = () => {

    const {userData} = useSelector(({ user }) => user);
    const [auth, setAuth] = useState(false);


    useEffect(() => {
        if (userData.userId)
            setAuth(true)
    }, [userData])

    if (auth) {
        return (
            <Switch>
                <Route path="/" exact>
                    <MainPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route path="/login" exact>
                    <AuthPage/>
                </Route>
                <Route path="/registration" exact>
                    <RegisterPage/>
                </Route>
                <Redirect to="/login"/>
            </Switch>
        )
    }
}
