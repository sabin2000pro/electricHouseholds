import React, {useState, useEffect, useReducer, useContext, Fragment} from 'react';
import {useHistory} from 'react-router-dom';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import '../Home/Homepage.css'

const AdminDashboard = (props) => {
    let history = useHistory();
    const [appliances, setAppliances] = useState([]);

    useEffect(() => {
        return verifyAuthToken();
    }, []);

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

    const fetchAppliances = async () => {
        try {
            // Send GET reqeust with axios
        }
        
        catch(err) {

            if(err) {
                return console.error(err);
            }

        }

    }

    return (
         
    <Fragment>
      <Header />
        
        <section className = "section--home">
            <div className = "home--grid">

        <div className = "home-text-box">

        <h1 className = "heading--primary">Your Admin Dashboard</h1>
        <p className = "home--description">Welcome to your Admin Dashboard. Here you will be able to view all of the electrical appliances available that users can submit their preferences for. You have the option to search for appliances if there are too many as well.</p>

        <button className = "btn btn--full mgr-sm" href = "#">View Appliances</button>
        <a onClick = {logoutHandler} className = "btn btn--outline" href = "/home">Logout</a>

        </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>

</div>

    </section>

   
    
        </Fragment>
        
        )
    }

export default AdminDashboard // The Main Admin Dashboard Component Exported