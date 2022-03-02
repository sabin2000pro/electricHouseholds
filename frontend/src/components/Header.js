/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */

import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './Home/Homepage.css';
import axios from 'axios';
import Logo from '../components/images/logo.png';
import {FaSearch} from 'react-icons/fa';

const Header = (props) => { // Header Component
    const [isInLocalStorage, setIsInLocalStorage] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [appliances, setAppliances] = useState([]);

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        return fetchAuthToken(authToken);
    }, []);

    useEffect(() => {
        return fetchApplianceData();
    }, []);

    const fetchAuthToken = (authToken) => {// Fetches the Authentication token from local storage

        if(!authToken) { // If there's no auth token
            return setIsInLocalStorage(false); // Not logged in
        }

        if(authToken) {
            return setIsInLocalStorage(true);
        }
    }

    const fetchApplianceData = async () => {
        try {

            return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {

                const allAppliances = response.data.appliances;
                setAppliances(allAppliances);
                console.log(allAppliances);

            }).catch(error => {

                if(error) {
                    return console.error(error);
                }
            })
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }
        }
    }

    return (
    
        <Router>

{isInLocalStorage ? ( // Added remaining links for deplyment

    <header className = "header">

    <img alt = "The header logo" src = {Logo} className = "img--logo"/>

            <div className = "search--box">
             <FaSearch className = "search--icon" />
             <input className = "admin--search" type = "text" placeholder = "Search Appliances" onChange = {(event) => {setSearchTerm(event.target.value)}} />

           
            </div>

            <nav className = "main-nav">
                    <ul className = "main-nav--list">

                        <li><a className = "main-nav--link" href = "/electricHouseholds/admin-dashboard">Admin Dashboard</a></li>
                        <li><a className = "main-nav--link" href = "/electricHouseholds/api/v1/auth/client/admin-dashboard/create-appliance">Create Appliance</a></li>
                        <li><a className = "main-nav--link" href = "/electricHouseholds/admin-dashboard/credit-settings">Credit Settings</a></li>
                        <li><a className = "main-nav--link" href = "/electricHouseholds/admin-dashboard/api/v1/bot-settings">Bot Settings</a></li>
                        
                </ul>
            </nav>

            </header>) : (<header className = "header">

                <img alt = "The header logo" src = {Logo} className = "img--logo"/>

                        <nav className = "main-nav">
                             <ul className = "main-nav--list">

                            <li><a className = "main-nav--link" href = "/electricHouseholds">Home</a></li>
                            <li><a className = "main-nav--link" href = "/electricHouseholds/your-preferences">Your Preferences</a></li>
                          
                            <li><a className = "main-nav--link" href = "/electricHouseholds/contact-us">Contact Us</a></li>
                         </ul>
                    </nav>

        </header>
    )}

    </Router>

    )
}

export default Header // Export the Header Component