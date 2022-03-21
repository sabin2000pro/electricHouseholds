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


import React, {Fragment, useState, useEffect} from 'react'
import Header from '../Header';
import {useHistory, useLocation} from 'react-router-dom';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import axios from 'axios';

const AdminEditAppliance = (props) => {
    let history = useHistory();
    let location = useLocation();
    
    const {_id} = location.state.appliance;

    const [newDescription, setEditedDescription] = useState('');
    const [appliances, setAppliances] = useState([]);
    const [appliancesFetched, setAppliancesFetched] = useState(false);

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
    };

    useEffect(() => {
        return fetchApplianceData();
    }, []);

    const fetchApplianceData = async () => {
        try {
            
            return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {
                const applianceData = response.data.appliances;
                setAppliances(applianceData);

                console.log(`Appliance Data : ${JSON.stringify(applianceData)}`);
                
            }).catch(err => {
                if(err) {
                    return console.error(err);
                }
            })
        } 

        catch(error) {

            if(error) {
                return console.error(error);
            }
        }

    }

    const editDescription = (id) => {
        try {

          axios.put(`http://localhost:5200/api/v1/appliances/edit-appliance/${id}`, {id: id, newDescription: newDescription}).then(data => {
              console.log(data);
          });
          console.log(`Appliance Updated`);
          return history.push('/home');
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }
        }
    }

    return (
        <Fragment>
             <Header />
          
          <section className = "section--home">
              <div className = "home--grid">
  
          <div className = "home-text-box">
  
          <h1 className = "heading--primary">Edit Appliance</h1>
          <p className = "home--description">Welcome to your Admin Dashboard. Here you will be able to view all of the electrical appliances available that users can submit their preferences for. You have the option to search for appliances if there are too many as well.</p>
  
          <a className = "btn btn--full mgr-sm" href = "/admin-dashboard">Admin Home</a>
          <a onClick = {logoutHandler} className = "btn btn--outline" href = "/admin-login">Logout</a>
  
          </div>
  
          <div className = "home-img-box">
              <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
          </div>
  
  </div>

      </section>

        <section className = "section--login">

    <div className = "container grid grid--2-cols">
           
            <RegisterCard>
            <h1 className = "heading--primary login">Edit Appliance</h1>

            <form className = "login--form">

            <div className = "appliancedescription--box">
                <label className = "description--lbl">New Description</label>
                <input value = {newDescription} onChange = {(e) => {setEditedDescription(e.target.value)}} placeholder = "New Appliance Description" required id = "description" type = "text"/>
            </div>

            <button onClick = {() => editDescription(_id)} className = "submit--btn" type = "button">Edit</button>
            </form>


</RegisterCard>
            </div>
    

</section>
    

    <footer className = "footer">
        <ul className = "footer--items">
            <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
        </ul>
    </footer>
  
</Fragment>

    )
}

export default AdminEditAppliance