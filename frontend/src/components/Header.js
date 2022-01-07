import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Home/Homepage.css';
import Logo from '../components/images/logo.png';

const Header = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        return fetchAuthToken(authToken);

    }, []);

    const fetchAuthToken = (authToken) => {

        if(!authToken) {
            setIsLoggedIn(false); // Not logged in
        }

        if(authToken) {
            console.log(authToken);
            setIsLoggedIn(true);
        }
    }

    return (
    
        <Router>

            <header className = "header">
                <img src = {Logo} className = "img--logo"/>

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

                {isLoggedIn ?
                    <nav className = "main-nav">
                        <ul className = "main-nav--list">
                            <li><a className = "main-nav--link" href = "/home">Admin Dashboard</a></li>
                            <li><a className = "main-nav--link" href = "/admin-register">Create Appliance</a></li>
                        </ul>

                    </nav> : null
                    }
            
        </header>
    </Router>
            

    )
}

export default Header // Export the Header Component