import React, {useState, useEffect, useRef, useReducer, Fragment} from 'react';
import {useHistory, useLocation, Link} from 'react-router-dom';
import RegisterCard from './RegisterCard';
import axios from 'axios';
import './AdminForgotPassword.css'

const AdminForgotPassword = ({match}) => { // Forgot Password Component
    let history = useHistory();

    const [emailAddress, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false); // Determines if the form is valid or not

    const forgotPasswordSubmitHandler = async (event) => {

        event.preventDefault();
    
        try {

            if(emailAddress.trim().length === 0) {
                setEmailValid(false);
                setFormIsValid(false);
            }

            if(!emailAddress.trim().includes("@")) {
                setFormIsValid(false);
                setEmailValid(false);
            }

            // Send POST request to the server
            const {data} = await axios.post(`http://localhost:5200/api/v1/auth/forgot-password`, {emailAddress: emailAddress});
            console.log(data);

            setFormIsValid(true);
            setEmailValid(true);
        }
        
        catch(err) {
    
            if(err) {
                console.error(err);

                throw new Error(err);
            }
    
        }
    }

    return (
        <Fragment>
  <section className = "section--forgotpassword">

<div className = "container grid grid--2-cols">

        <RegisterCard>
            <h1 className = "heading--primary login">Forgot Password</h1>
            <form onSubmit = {forgotPasswordSubmitHandler} method = "POST" className = "login--form">

        
            <div className = "email--box">
                <label className = "email--lbl">E-mail</label>
                <input value = {emailAddress}  onChange = {(e) => {setEmailAddress(e.target.value)}} placeholder = "Enter your E-mail Address" type = "email"/>
            </div>


            <div className = "submit--container">
                <button className = "login--btn" type = "submit">Submit</button>
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

export default AdminForgotPassword