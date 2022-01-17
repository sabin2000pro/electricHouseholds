import React, {Fragment, useState, useEffect} from 'react'
import Header from '../Header';
import {useHistory, useLocation} from 'react-router-dom';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import axios from 'axios';

const AdminEditAppliance = (props) => {
    let history = useHistory();
    let location = useLocation();
    const {name, image, description} = location.state.appliance; // extract the location state and store the data in the input fields for modification
    const [editedName, setEditedName] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [formValid, setFormValid] = useState(true);
    const [appliances, setAppliances] = useState([]);
    const [appliancesFetched, setAppliancesFetched] = useState(false);

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
    }

    useEffect(() => {
        return fetchApplianceData();
    }, []);


    const fetchApplianceData = async () => { // Routine to fetch the available appliances from the backend database
        try {
            
           return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {
               const allAppliances = response.data.appliances;
               setAppliances(allAppliances);
               setAppliancesFetched(!appliancesFetched);
               console.log(allAppliances);
           });

        } 
        
        catch(err) {

            if(err) {
                return console.error(err);
            }
        }

    }


    const editApplianceHandler = (id) => {
        try {
            // Send a PUT request to update the appliance

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
                    <h1 className = "heading--primary login">Edit Your Appliance</h1>

                    <form className = "login--form">

            
                    <div className = "appliancename--box">
                        <label className = "name--lbl">New Name</label>
                        <input value = {name} placeholder = "New Appliance Name" type = "text"/>
                    </div>

                    <div className = "applianceimage--box">
                        <label className = "image--lbl">New Image</label>
                        <input value = {image} placeholder = "New Appliance Image URL" required id = "applianceurl" type = "text"/>
                    </div>

                    <div className = "appliancedescription--box">
                        <label className = "description--lbl">New Description</label>
                        <input value = {description} placeholder = "New Appliance Description" required id = "description" type = "text"/>
                    </div>
                    
                    <div className = "submit--container">
                        <button className = "submit--btn" type = "submit">Submit</button>
                    </div>

                    </form>
                
            </RegisterCard>
            
        </div>    
    </section>
  
</Fragment>
    )
}

export default AdminEditAppliance