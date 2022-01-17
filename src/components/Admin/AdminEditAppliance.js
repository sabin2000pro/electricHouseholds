import React, {Fragment, useState} from 'react'
import Header from '../Header';
import {useHistory} from 'react-router-dom';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';

const AdminEditAppliance = (props) => {
    let history = useHistory();
    const [editedName, setEditedName] = useState('');
    const [editedImage, setEditedImage] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [formValid, setFormValid] = useState(true);

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
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

                    <form onSubmit = {editApplianceHandler} className = "login--form">

            
                    <div className = "appliancename--box">
                        <label className = "name--lbl">Name</label>
                        <input placeholder = "Edit Appliance Name" type = "text"/>
                    </div>

                    <div className = "applianceimage--box">
                        <label className = "image--lbl">Image</label>
                        <input placeholder = "Edit Appliance Image URL" required id = "applianceurl" type = "text"/>
                    </div>

                    <div className = "appliancedescription--box">
                        <label className = "description--lbl">Description</label>
                        <input placeholder = "Edit Appliance Description" required id = "description" type = "text"/>
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