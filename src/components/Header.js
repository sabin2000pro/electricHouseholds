import React, {Fragment} from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homepage from './Home/Homepage';
import AdminRegister from './Admin/AdminRegister';
import Preferences from '../components/Preferences/PreferencesList';
import PrivateScreen from '../components/PrivateScreen';
import PrivateRoute from './routing/PrivateRoute';
import './Home/Homepage.css';
import Logo from '../components/images/logo.png';

const Header = (props) => {
    return (
        
        <Router>
            <header className = "header">
                <img src = {Logo} className = "img--logo"/>
           
                <nav className = "main-nav">
                    <ul className = "main-nav--list">

                        <li><a className = "main-nav--link" href = "/home">Home</a></li>
                        <li><a className = "main-nav--link" href = "/admin-register">Admin Register</a></li>
                        <li><a className = "main-nav--link" href = "/admin-register">Admin Login</a></li>
                        <li><a className = "main-nav--link" href = "/your-preferences">Your Preferences</a></li>
                        <li><a className = "main-nav--link" href = "/fair-negotiations">Fair Negotiations</a></li>
                        <li><a className = "main-nav--link" href = "/contact">Contact Us</a></li>
                    </ul>
                </nav>

        </header>
            </Router>
            

    )
}

export default Header // Export the Header Component