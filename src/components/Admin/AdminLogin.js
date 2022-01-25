import React, {useState, useRef, useReducer, useContext, useEffect, Fragment} from 'react';
import { useHistory, Link } from 'react-router-dom';
import './AdminLogin.css';
import Header from '../Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';
import axios from 'axios';
import Modal from '../../UI/Modal';

const AdminLogin = (props) => { // Admin Login Component
    let history = useHistory();
    const [enteredEmail, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [enteredPassword, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true); 
    const [formValid, setFormValid] = useState(true);
    const [modalShown, setModalShown] = useState();
    
    // Used to fetch the authentication token
    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        return checkToken(authToken);
    }, []);

    const checkToken = (authToken) => { // Verifies the authentication token

         if(authToken) { // if there is one already present
             return history.push('/admin-dashboard');
         }
    }

    const modalHandler = () => {
        setModalShown(null);
    }

    const missingEmail = <p className = "err-msg">Invalid E-mail Address</p>
    const notFound = <p className = "err-msg">Account not found</p>
    const passwordInvalid = <p className = "err-msg">Password Invalid</p>

    const loginHandler = async (e) => { // Login Handler function to login admin

        try {
            e.preventDefault();

            if(!enteredEmail || !enteredPassword) {
                setModalShown({title: 'Invalid Credentials', message: 'Check your e-mail and password'});
                setFormValid(false);
                setEmailAddress("");
                setPassword("");
            }

            // Validate the entered E-mail
            if(enteredEmail.trim().length < 3 || enteredEmail.trim().length === 0) {
                setModalShown({title: 'Invalid E-mail Address', message: 'Re-Enter E-mail'});
                setFormValid(false);
                setEmailAddress("");
            }

            if(!enteredEmail.trim().includes("@")) { // If e-mail address does not contain @ symbol
                setFormValid(false);
                setEmailValid(false);
                setEmailAddress("");
            }

            if(enteredPassword.trim().length === 0) { // If password field is left empty
                setFormValid(false);
                setPassword("");
            }

            const {data} = await axios.post(`http://localhost:5200/api/v1/auth/login-admin`, {emailAddress: enteredEmail, password: enteredPassword}); // Send off a POST request to the backend

            if(!data) {
                alert('No data found!. Only a placeholder')
            }

            const authorizationToken = data.token; // Extract the token
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
                console.error(error);

                throw new Error(error);
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
                {modalShown && <Modal title = {modalShown.title} message = {modalShown.message} />}
                
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
                        <input onBlur = {blurHandler} value = {enteredPassword} onChange = {(e) => {setPassword(e.target.value)}} placeholder = "Enter your Password" id = "password" type = "password"/>
                    </div>
                    
                    <p className = "already--text">Forgot your password?</p>
                    <Link className = "link--to" to = '/api/v1/auth/client/admin-forgotpassword'>Reset Here!</Link>

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