import React, {Fragment, useState} from 'react';
import Header from '../Header';
import './AdminBidsSettings.css';
import {useHistory} from 'react-router-dom';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import axios from 'axios';

const AdminBidsSettings = () => {
    let history = useHistory();
    const [enteredOpeningBid, setEnteredOpeningBid] = useState('');
    const [enteredVirtualCredits, setEnteredVirtualCredits] = useState('');
    const [formValid, setFormValid] = useState(true);

    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
    }

    const creditSubmitHandler = async (event) => {
        try {
            event.preventDefault();
            
            // Send POST request
            const {data} = await axios.post(`http://localhost:5200/api/v1/credits/create-credits`, {openingBid: enteredOpeningBid, virtualCredits: enteredVirtualCredits});
            alert('Credits Configured');

            // Clear Fields
            setEnteredVirtualCredits("");
            setEnteredOpeningBid('');

            setFormValid(true);
        } 
        
        catch(error) {

            if(error) {

                setFormValid(false);
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
                <h1 className = "heading--primary">Admin Credits Settings</h1>
                <p className = "home--description">Configure the Virtual Credit Settings.</p>

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
                    <h1 className = "heading--primary login">Configure Credits Settings</h1>

                    <form onSubmit = {creditSubmitHandler} className = "login--form">

                    
                    <div className = "nickname--box">
                        <label className = "name--lbl">Opening Bid</label>
                        <input value = {enteredOpeningBid} onChange = {(e) => {setEnteredOpeningBid(e.target.value)}} placeholder = "Enter Opening Bid" type = "text"/>
                    </div>

                    <div className = "credits--box">
                        <label className = "image--lbl">Virtual Credits</label>
                        <input value = {enteredVirtualCredits} onChange = {(e) => {setEnteredVirtualCredits(e.target.value)}} placeholder = "Enter Virtual Credits" required id = "virtual_credits" type = "number"/>
                    </div>

                
                    <div className = "submit--container">
                        <button className = "submit--btn" type = "submit">Configure</button>
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
}

export default AdminBidsSettings