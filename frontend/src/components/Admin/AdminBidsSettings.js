import React, {Fragment, useState} from 'react';
import Header from '../Header';
import {useHistory, useLocation} from 'react-router-dom';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import axios from 'axios';

const AdminBidsSettings = () => {
    let history = useHistory();
    const [enteredNickname, setEnteredNickname] = useState('');
    const [enteredVirtualCredits, setEnteredVirtualCredits] = useState(0);
    const [enteredOpeningBid, setEnteredOpeningBid] = useState(0);
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredReputationPoints, setEnteredReputationPoints] = useState(0);
    const [formValid, setFormValid] = useState(true);

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
    }

    const bidSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            // Send POST request
            const {data} = await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {nickname: enteredNickname, virtualCredits: enteredVirtualCredits, openingBid: enteredOpeningBid, username: enteredUsername, reputationPoints: enteredReputationPoints});
            console.log(data);
            alert('Bids Configured');
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
                <h1 className = "heading--primary">Admin Bid Settings</h1>
                <p className = "home--description">Configure the required bid settings.</p>

                <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
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
                    <h1 className = "heading--primary login">Configure Bid Settings</h1>

                    <form onSubmit = {bidSubmitHandler} className = "login--form">

                    
                    <div className = "appliancename--box">
                        <label className = "name--lbl">Nickname</label>
                        <input placeholder = "Enter Bid Nickname" type = "text"/>
                    </div>

                    <div className = "applianceimage--box">
                        <label className = "image--lbl">Credits</label>
                        <input placeholder = "Enter Virtual Credits" required id = "virtual_credits" type = "number"/>
                    </div>

                    <div className = "appliancedescription--box">
                        <label className = "description--lbl">Opening Bid</label>
                        <input placeholder = "Enter Opening Bid" required id = "openingbid" type = "number"/>
                    </div>

                    <div className = "appliancedescription--box">
                        <label className = "description--lbl">Username</label>
                        <input  placeholder = "Enter Your Username" required id = "username" type = "text"/>
                    </div>

                    <div className = "appliancedescription--box">
                        <label className = "description--lbl">Reputation Points</label>
                        <input placeholder = "Enter Reputation Points" required id = "reputation_points" type = "number"/>
                    </div>
                    
                    <div className = "submit--container">
                        <button className = "submit--btn" type = "submit">Configure</button>
                    </div>

                </form>
                
            </RegisterCard>
            
        </div>    
    </section>
  
</Fragment>

    )
}

export default AdminBidsSettings