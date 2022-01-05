import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useHistory} from 'react-router-dom';

const AdminDashboard = (props) => {
    let history = useHistory();

    useEffect(() => {
        return verifyAuthToken();
    }, []);

    const verifyAuthToken = () => {

        if(!localStorage.getItem("authToken")) {
            alert('You are not authorized to view this route. You are not logged in');
            return history.push('/home');
        }
    }

    const logoutHandler = () => { // Logout Handler Function
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
    }

    return (
        <div>
            <h1>Your Admin Dashboard</h1>

            <button onClick = {logoutHandler}>Logout</button>
        </div>
    )
}

export default AdminDashboard // The Main Admin Dashboard Component Exported