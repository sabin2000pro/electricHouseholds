import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './Home/Homepage.css';
import Logo from '../components/images/logo.png';

const Header = (props) => { // Header Component
    const [isInLocalStorage, setIsInLocalStorage] = useState(false);
    const [isInDashboard, setIsInDashboard] = useState(false);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        return fetchAuthToken(authToken);

    }, []);

    const fetchAuthToken = (authToken) => {// Fetches the Authentication token from local storage

        if(!authToken) { // If there's no auth token
            setIsInLocalStorage(false); // Not logged in
            setIsInDashboard(false);
        }

        if(authToken) {
            console.log(authToken);
         setIsInLocalStorage(true);
         setIsInDashboard(true);
        }
    }

    return (
    
        <Router>

{isInLocalStorage ? (
    <header className = "header">

            <nav className = "main-nav">

                    <ul className = "main-nav--list">
                        
                </ul>
            </nav>
            </header>) : (<header className = "header">
                            <img alt = "The header logo" src = {Logo} className = "img--logo"/>

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