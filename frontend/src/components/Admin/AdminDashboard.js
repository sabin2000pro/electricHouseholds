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


import React, {useState, useEffect, Fragment} from 'react';
import {useHistory, Link} from 'react-router-dom';
import Header from '../Header';
import '../Preferences/CreatePreference.css';
import './AdminDashboard.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import '../Home/Homepage.css';
import axios from 'axios';
import Modal from '../../UI/Modal';

const AdminDashboard = (props) => { // Admin Dashboard Component
    
    let history = useHistory();
    const [appliances, setAppliances] = useState([]);
    const [appliancesFetched, setAppliancesFetched] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [appliancesPresent, setAppliancesPresent] = useState(true);

    useEffect(() => {
        return verifyAuthToken(); // Verify the auth token call
    }, [appliances]);

    useEffect(() => {
        console.log(`Appliances present ? `)
    }, [appliancesPresent])

    const fetchApplianceData = async () => { // Routine to fetch the available appliances from the backend database
        try {
            
           return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {

               const allAppliances = response.data.appliances;

               if(allAppliances.length === 0) {
                   return setAppliancesPresent(!appliancesPresent);
               }

               if(allAppliances.length !== 0) {
                    setAppliances(allAppliances);
                    setAppliancesFetched(!appliancesFetched);

                    setAppliancesPresent(appliancesPresent)
               }

              

           });

        } 
        
        catch(err) {

            if(err) {
                return console.error(err);
            }
        }
    }

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

    const deleteAppliance = (id) => {
        try {
            axios.delete(`http://localhost:5200/api/v1/appliances/delete-appliance/${id}`, {id: id});
            alert('Appliance Deleted');
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }

        }
    }
   
    return (
         
    <Fragment>

      <Header searchterm = {searchTerm} />
        
        <section className = "section--home">
            <div className = "home--grid">

        <div className = "home-text-box">

        <h1 className = "heading--primary">Your Admin Dashboard</h1>

        <p className = "home--description">Welcome to your Admin Dashboard. Here you will be able to view all of the electrical appliances available that users can submit their preferences for. You have the option to search for appliances if there are too many as well.</p>

        <button onClick = {fetchApplianceData} className = "btn btn--full mgr-sm" href = "#">View Appliances</button>
        <a onClick = {logoutHandler} className = "btn btn--outline" href = "/">Logout</a>

        </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>
    </div>

    </section>

    <section className = "section--forgotpassword">

        {appliances.length === 0  && !appliancesPresent ? <Modal title = "Error" message = "No appliances found" button = "Ok" />: appliances.map((appliance, key) => {

            return <div className = "preferences--card" key = {key}>
                
                <h1 style = {{color: 'white', fontWeight: 600, fontSize: '36px'}}>Appliance: {appliance.name}</h1>
                <img className = "appliance--img" src = {appliance.image}  />
                <h1 style = {{color: 'white', marginTop: '40px', fontWeight: 600, fontSize: '36px'}}>Description: {appliance.description}</h1>

                <div className = "appliance--buttons">

                <Link className = "appliance--editbtn" to = {{pathname: `/admin-dashboard/edit-appliance/${appliance._id}`, state: {appliance}} }>Edit Appliance</Link>
                <Link className = "appliance--viewbtn" to = {{pathname: `/appliance/${appliance._id}`, state: {appliance}} }>View Appliance</Link>

    
                <button onClick = {() => deleteAppliance(appliance._id)} className = "appliance--deletebtn">Delete Appliance</button>

                </div>
            </div>
        })}


    </section>

    <footer className = "footer">

        <ul className = "footer--items">
            <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
        </ul>

    </footer>

        </Fragment>
        
        )
    }

export default AdminDashboard // The Main Admin Dashboard Component Exported