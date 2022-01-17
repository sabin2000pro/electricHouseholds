import React, {useState, useEffect, useReducer, useContext, Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../Header';
import '../Preferences/CreatePreference.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import '../Home/Homepage.css';
import axios from 'axios';

const AdminDashboard = (props) => { // Admin Dashboard Component
    let history = useHistory();
    const [appliances, setAppliances] = useState([]);
    const [appliancesFetched, setAppliancesFetched] = useState(false);

    useEffect(() => {
        return verifyAuthToken();
    }, [appliances]);

    const fetchApplianceData = async () => { // Routine to fetch the available appliances from the backend database
        try {
            
           return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {
               const allAppliances = response.data.appliances;
               setAppliances(allAppliances);
               setAppliancesFetched(!appliancesFetched);
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

   
    return (
         
    <Fragment>
      <Header />
        
        <section className = "section--home">
            <div className = "home--grid">

        <div className = "home-text-box">

        <h1 className = "heading--primary">Your Admin Dashboard</h1>
        <p className = "home--description">Welcome to your Admin Dashboard. Here you will be able to view all of the electrical appliances available that users can submit their preferences for. You have the option to search for appliances if there are too many as well.</p>

        <button onClick = {fetchApplianceData} className = "btn btn--full mgr-sm" href = "#">View Appliances</button>
        <a onClick = {logoutHandler} className = "btn btn--outline" href = "/home">Logout</a>

        </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>
</div>

    </section>

    <section className = "section--forgotpassword">

        {appliances.length === 0 ? <p className = "appliances-notext">No appliances found</p> : appliances.map((appliance, key) => {

            return <div className = "preferences--card" key = {key}>
                
                <h1 style = {{color: 'white', fontWeight: 600}}>Appliance: {appliance.name}</h1>
                <img src = {appliance.image} alt = "" />
                <h1 style = {{color: 'white', marginTop: '40px', fontWeight: 600}}>Description: {appliance.description}</h1>

                <button className = "appliance--editbtn">Edit Appliance</button>
            </div>
        })}

    </section>

        </Fragment>
        
        )
    }

export default AdminDashboard // The Main Admin Dashboard Component Exported