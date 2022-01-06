import React, {useState, useRef, useReducer, useContext, useEffect, Fragment} from 'react';
import { useHistory, Link } from 'react-router-dom';
import './AdminLogin.css';
import Header from '../Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import axios from 'axios';

const AdminLogin = (props) => { // Admin Login Component
    let history = useHistory();
    const [enteredEmail, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [enteredPassword, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true); 

    const [formValid, setFormValid] = useState(true);
    
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        return checkToken(authToken);
    }, []);

    const checkToken = (authToken) => { // Verifies the authentication token

         if(authToken) { // if there is one already present
             return history.push('/admin-dashboard');
         }
    }

    const missingEmail = <p className = "err-msg">Invalid E-mail Address</p>
    const notFound = <p className = "err-msg">Account not found</p>
    const passwordInvalid = <p className = "err-msg">Password Invalid</p>

    const loginHandler = async (e) => { // Login Handler function to login admin

        try {
            e.preventDefault();

            if(!enteredEmail || !enteredPassword) {
                setFormValid(false);
                setEmailAddress("");
                setPassword("");
            }

            if(enteredEmail.trim().length < 3 || enteredEmail.trim().length === 0) {
                setFormValid(false);
                setEmailAddress("");
            }

            if(!enteredEmail.trim().includes("@")) {
                
            }

            if(enteredPassword.trim().length === 0) {
                setFormValid(false);
                setPassword("");
            }

            const {data} = await axios.post(`http://localhost:5200/api/v1/auth/login-admin`, {emailAddress: enteredEmail, password: enteredPassword});

            const authorizationToken = data.token;
            localStorage.setItem("authToken", authorizationToken);

            setPasswordValid(true);
            setEmailValid(true);

            if(!authorizationToken) { // If there is no authorization token found. I.e if the account is invalid
                setFormValid(false);
                setEmailAddress("");
                setPassword("");
            }

            else {
                return history.push('/admin-dashboard');
            }
          
        }   
        
        catch(error) {

            if(error) {

                setFormValid(false);
                return console.log(error);
            }
        }  
    }

    const blurHandler = function() {
        setFormValid(true);
    }
    
    return (

    <Fragment>
        <Header />

        <section className = "section--home">
                <div className = "home--grid">

            <div className = "home-text-box">


                <h1 className = "heading--primary">Admin Dashboard Login</h1>
                <p className = "home--description">Login into the Dashboard in order to configure appliances.</p>

                <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
                <a className = "btn btn--outline" href = "/about-us">About Us</a>
            </div>

                <div className = "home-img-box">
                    <img className = "home--img" alt = "Wind Turbing On The Main Webpage" src = {HomepageImg} />
                </div>

            </div>
    </section>


    <section className = "section--login">

        <div className = "container grid grid--2-cols">

                <RegisterCard>
                    <h1 className = "heading--primary login">Admin Login</h1>
                    <form onSubmit = {loginHandler} className = "login--form">

                    
                    <div className = "email--box">
                        <label className = "email--lbl">E-mail</label>
                        <input onBlur = {blurHandler} value = {enteredEmail} onChange = {(e) => {setEmailAddress(e.target.value)}} placeholder = "Enter your E-mail" type = "email"/>
                        {!formValid && missingEmail}
                    </div>

                    <div className = "password--box">
                        <label className = "password--lbl">Password</label>
                        <input onBlur = {blurHandler} value = {enteredPassword} onChange = {(e) => {setPassword(e.target.value)}} placeholder = "Enter your Password" required id = "password" type = "password"/>
                    </div>
                    

                    <p className = "already--text">Forgot your password?</p>
                    <Link className = "link--to" to = '/admin-resetpassword'>Reset Here!</Link>

                    <div className = "submit--container">
                        <button className = "login--btn" type = "submit">Login</button>
                    </div>

                    {!formValid && notFound}

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

export default AdminLogin