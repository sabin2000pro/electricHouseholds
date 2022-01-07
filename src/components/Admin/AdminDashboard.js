import React, {useState, useEffect, useReducer, useContext, Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';

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
            <Header />
        
    <section className = "section--home">
        <div className = "home--grid">

    <div className = "home-text-box">

    <h1 className = "heading--primary">Your Admin Dashboard</h1>
    <p className = "home--description">View Appliances Below</p>

    <a onClick = {logoutHandler} className = "btn btn--outline" href = "/home">Logout</a>
    </div>

    <div className = "home-img-box">
        <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
    </div>
    </div>

    </section>
        </Fragment>
        
        )
    }

export default AdminDashboard // The Main Admin Dashboard Component Exported