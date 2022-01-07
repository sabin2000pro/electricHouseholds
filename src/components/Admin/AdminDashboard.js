import React, {useState, useEffect, useReducer, useContext, Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../Header';

const AdminDashboard = (props) => {
    let history = useHistory();

    useEffect(() => {
        return verifyAuthToken();
    }, []);

    const verifyAuthToken = () => {

        if(!localStorage.getItem("authToken")) { // If there's no authorization token
            alert('You are not authorized to view this route. You are not logged in');
            return history.push('/home');
        }
    }

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
    }

    return (
        <Fragment>
            <div>
                <h1>Your Admin Dashboard</h1>

                <button onClick = {logoutHandler}>Logout</button>
            </div>
        </Fragment>
       
    )
}

export default AdminDashboard // The Main Admin Dashboard Component Exported