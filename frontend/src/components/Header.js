import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Home/Homepage.css';
import Logo from '../components/images/logo.png';
import {FaSearch} from 'react-icons/fa';

const Header = (props) => { // Header Component
    const [isInLocalStorage, setIsInLocalStorage] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        return fetchAuthToken(authToken);

    }, []);

    const fetchAuthToken = (authToken) => {// Fetches the Authentication token from local storage

        if(!authToken) { // If there's no auth token
            return setIsInLocalStorage(false); // Not logged in
        }

        if(authToken) {
            return setIsInLocalStorage(true);
        }
    }

    return (
    
        <Router>

{isInLocalStorage ? (

    <header className = "header">

    <img alt = "The header logo" src = {Logo} className = "img--logo"/>

            <div className = "search--box">
             <FaSearch className = "search--icon" />
             
             <input className = "admin--search" type = "text" placeholder = "Search Appliances" />
            </div>

            <nav className = "main-nav">
                    <ul className = "main-nav--list">

                        <li><a className = "main-nav--link" href = "/admin-dashboard">Admin Dashboard</a></li>
                        <li><a className = "main-nav--link" href = "/admin-dashboard/create-appliance">Create Appliance</a></li>
                        <li><a className = "main-nav--link" href = "/admin-dashboard/edit-appliance">Edit Appliance</a></li>
                        <li><a className = "main-nav--link" href = "/admin-dashboard/bids-settings">Bids Settings</a></li>
                </ul>
            </nav>

            </header>) : (<header className = "header">

           
                        <img alt = "The header logo" src = {Logo} className = "img--logo"/>
                        <div className = "search--box">
                    <FaSearch className = "search--icon" />
                <input className = "admin--search" type = "text" placeholder = "Search" />            

                         </div>

                        <nav className = "main-nav">
                             <ul className = "main-nav--list">

                                <li><a className = "main-nav--link" href = "/home">Home</a></li>
                                <li><a className = "main-nav--link" href = "/admin-register">Admin Register</a></li>
                                <li><a className = "main-nav--link" href = "/admin-login">Admin Login</a></li>
                                <li><a className = "main-nav--link" href = "/your-preferences">Your Preferences</a></li>
                                <li><a className = "main-nav--link" href = "/fair-negotiations">Fair Negotiations</a></li>
                                <li><a className = "main-nav--link" href = "/contact-us">Contact Us</a></li>
                         </ul>
                    </nav>

        </header>
    )}

    </Router>

    )
}

export default Header // Export the Header Component