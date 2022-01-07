import React, {useState, useEffect, useRef, useReducer, Fragment} from 'react';
import {useHistory, useLocation, Link} from 'react-router-dom';
import RegisterCard from './RegisterCard';
import axios from 'axios';
import './AdminForgotPassword.css'


const AdminForgotPassword = (props) => {
    let history = useHistory();

    const [emailAddress, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    const forgotPasswordSubmitHandler = async (event) => {

        event.preventDefault();
    
        try {

            if(emailAddress.trim().length === 0) {
                setEmailValid(false);
                setFormIsValid(false);
            }

            // Send reqeust
            const {data} = await axios.post(`http://localhost:5200/api/v1/auth/forgot-password`, {emailAddress: emailAddress});
            console.log(`E-mail sent`);
        }
        
        catch(err) {
    
            if(err) {
                return console.log(err);
            }
    
        }
    }

    return (
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

    )
}

export default AdminForgotPassword