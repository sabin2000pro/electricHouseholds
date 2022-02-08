import React from 'react';
import {Redirect, Route} from 'react-router-dom';

// If there is something in local storage then render that component, if not then redirect user to login screen

const PrivateRoute = ({component: Component, ...rest}) => { // Private Route Component
    return (
        <Route {...rest} render = {(props) => localStorage.getItem("authToken") ?  (<Component {...props} />) : (<Redirect to = "/admin-login" />)}/>
    )
}

export default PrivateRoute