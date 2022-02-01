import React, {useState, useRef, useContext, useReducer, Fragment} from 'react';
import { useHistory } from 'react-router';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import './AdminCreateAppliance.css';
import axios from 'axios';

let REDIRECT_SECONDS = 1500;

const AdminCreateAppliance = (props) => {
    const [enteredName, setEnteredName] = useState('');
    const [enteredImage, setEnteredImage] = useState('');

    const [enteredDescription, setEnteredDescription] = useState('');
    let history = useHistory();

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        return history.push('/home'); // Redirect user  back home
    }

    function redirectHome() {
        return setTimeout(() => {
            return history.push('/admin-dashboard');
        }, REDIRECT_SECONDS);
    }

    const createApplianceSubmitHandler = async (e) => {
        try {

            e.preventDefault();
            
            const {data} = await axios.post(`http://localhost:5200/api/v1/appliances/create-appliance`, {name: enteredName, image: enteredImage, description: enteredDescription});
            console.log(data);

            return redirectHome();
        } 
        
        catch(error) {

            if(error) {
                const someError = error.response.data;
                console.log(someError);

                throw new Error(someError);
            }
        }
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
          <a onClick = {logoutHandler} className = "btn btn--outline" href = "/home">Logout</a>
  
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

                    <form onSubmit = {createApplianceSubmitHandler} className = "login--form">

                    <div className = "appliancename--box">
                        <label className = "name--lbl">Name</label>
                        <input value = {enteredName} onChange = {(e) => {setEnteredName(e.target.value)}} placeholder = "Enter Appliance Name" type = "text"/>
                    </div>

                    <div className = "appliancedescription--box">
                        <label className = "description--lbl">Description</label>
                        <input value = {enteredDescription} onChange = {(e) => {setEnteredDescription(e.target.value)}} placeholder = "Enter Appliance Description" required id = "description" type = "text"/>
                    </div>
                    
                    <div className = "submit--container">
                        <button className = "submit--btn" type = "submit">Submit</button>
                    </div>

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
};


export default AdminCreateAppliance // Exports the Create Appliance Component