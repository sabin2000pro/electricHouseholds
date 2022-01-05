import React, {Fragment, useState, useEffect, useRef, useContext} from 'react';
import Header from '../../components/Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard.js'
import './AdminRegister.css';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminRegister = (props) => {
    let history = useHistory();
   
    const [enteredUsername, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);

    const [enteredEmail, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [enteredPassword, setPassword] = useState('');
    const [enteredConfirmPassword, setConfirmPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);

    const validateInput = function() {
        return enteredUsername.trim().length !== 0 || enteredEmail.trim().length !== 0 || enteredPassword.trim().length !== 0 || enteredConfirmPassword.trim().length !== 0;
    }

    const registerHandler = async (event) => { // Method that validates and sends data to DB
        try {

            event.preventDefault();

            if(!validateInput) {
                alert('Fields Cannot be left empty');
                setUsernameValid(false);
                setEmailValid(false);
                
                setUsername("");
            }

            if(enteredPassword !== enteredConfirmPassword) {
                alert('Passwords do not match!');
                setFormIsValid(false);
            }

            const {data} = await axios.post(`http://localhost:5200/api/v1/auth/register-admin`, {username: enteredUsername, emailAddress: enteredEmail, password: enteredPassword, confirmPassword: enteredConfirmPassword});
            alert('Regiser success');

            return history.push('/home'); // Redirect home
        } 
        
        catch(err) {

            if(err) {
                console.log(err);
            }
        }

    }

    return (

         <Fragment>
            <Header />

    <section className = "section--home">
            <div className = "home--grid">

       <div className = "home-text-box">


         <h1 className = "heading--primary">Admin Dashboard Registration</h1>
        <p className = "home--description">If you wish to have access to the Admin Dashboard. Please Register an account with us below and explore our options.</p>

        <a className = "btn btn--full mgr-sm" href = "#">Start Now</a>
        <a className = "btn btn--outline" href = "#">Learn More!</a>
    </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
        </div>
    </div>

</section>

<section className = "section--register">

    <div className = "container grid grid--2-cols">

            <RegisterCard>
                <h1 className = "heading--primary register">Admin Register</h1>
                <form onSubmit = {registerHandler} className = "register--form">

                    <div className = "username--box">
                        <label>Username</label>
                        <input value = {enteredUsername} onChange = {(e) => {setUsername(e.target.value)}} placeholder = "Enter your Username" type = "text"/>
                    </div>

                   <div className = "email--box">
                       <label className = "email--lbl">E-mail</label>
                       <input value = {enteredEmail} onChange = {(e) => {setEmailAddress(e.target.value)}} placeholder = "Enter your E-mail" type = "email"/>
                   </div>

                   <div className = "password--box">
                       <label className = "password--lbl">Password</label>
                       <input value = {enteredPassword} onChange = {(e) => {setPassword(e.target.value)}} placeholder = "Enter your Password" required id = "password" type = "password"/>
                   </div>
                   

                   <div className = "confirmPassword--box">
                       <label className = "confirm--lbl">Confirm Password</label>
                       <input value = {enteredConfirmPassword} onChange = {(e) => {setConfirmPassword(e.target.value)}} placeholder = "Confirm your password" required id = "confirmPassword" type = "password"/>                   
                   </div>

                   <p className = "already--text">Already have an account with us?</p>
                   <Link className = "link--to" to = '/admin-login'>Login Now!</Link>

                   <div className = "submit--container">
                       <button className = "register--btn" type = "submit">Register Now</button>
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

export default AdminRegister