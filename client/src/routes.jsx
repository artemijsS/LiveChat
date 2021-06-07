import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'

import {MainPage, AuthPage, RegisterPage, LoadingPage, AdminPage} from "./Pages";

import {useSelector} from "react-redux";


export const useRoutes = () => {

    const {userData} = useSelector(({ user }) => user);
    const {userLoading} = useSelector(({ loading }) => loading);

    if (userLoading) {
        return (
            <Switch>
                <Route path="/" exact>
                    <LoadingPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        )
    } else {
        if (userData.userId) {
            return (
                <Switch>
                    <Route path="/" exact>
                        <MainPage/>
                    </Route>
                    {
                        userData.role === "admin" &&
                        <Route path="/admin" exact>
                            <AdminPage/>
                        </Route>
                    }
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
}
