import React, {useState, useRef, useContext, useReducer, Fragment} from 'react';
import { useHistory } from 'react-router';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import './AdminCreateAppliance.css';

const AdminCreateAppliance = (props) => {
    const [name, setName] = useState('');
    const [nameValid, setNameValid] = useState('');
    const [image, setImage] = useState('');
    const [imageValid, setImageValid] = useState('');
    
    const [description, setDescription] = useState('');
    const [descriptionValid, setDescriptionValid] = useState('');
    const [formValid, setFormValid] = useState(true);

    let history = useHistory();

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
  
          <h1 className = "heading--primary">Create Appliance</h1>
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
                    <h1 className = "heading--primary login">Create Appliance</h1>
                    <form className = "login--form">

                    
                    <div className = "appliancename--box">
                        <label className = "email--lbl">Name</label>
                        <input placeholder = "Enter Appliance Name" type = "text"/>
                       
                    </div>

                    <div className = "applianceimage--box">
                        <label className = "password--lbl">Image</label>
                        <input placeholder = "Enter Appliance Image URL" required id = "applianceurl" type = "text"/>
                    </div>

                    <div className = "appliancedescription--box">
                        <label className = "password--lbl">Description</label>
                        <input placeholder = "Enter Appliance Description" required id = "description" type = "text"/>
                    </div>
                    
                    <div className = "submit--container">
                        <button className = "login--btn" type = "submit">Submit</button>
                    </div>

                    </form>
                
            </RegisterCard>
            
        </div>    
    </section>
  
     
      
          </Fragment>
    )
};

AdminCreateAppliance.defaultProps = {

}

AdminCreateAppliance.propTypes = {

}

export default AdminCreateAppliance // Exports the Create Appliance Component