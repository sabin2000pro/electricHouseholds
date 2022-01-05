import React, {useState, useEffect, useReducer, useContext} from 'react';
import {useHistory} from 'react-router-dom';

const AdminDashboard = (props) => {
    let history = useHistory();

    useEffect(() => {
        return verifyAuthToken();
    }, []);

    const verifyAuthToken = () => {
        if(!localStorage.getItem("authToken")) {
            return history.push('/home');
        }
    }

    return (
        <div>
            <h1>Your Admin Dashboard</h1>
        </div>
    )
}

export default AdminDashboard // The Main Admin Dashboard Component Exported