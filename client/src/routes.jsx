import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import {MainPage, AuthPage, RegisterPage} from "./Pages";

export const useRoutes = () => {

    return (
        <Switch>
            <Route path="/" exact>
                <MainPage/>
            </Route>
            <Route path="/login" exact>
                <AuthPage/>
            </Route>
            <Route path="/registration" exact>
                <RegisterPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
        )
}
