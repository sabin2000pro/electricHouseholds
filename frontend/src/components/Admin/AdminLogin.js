import React, {useState, useRef, useReducer, useContext, useEffect, Fragment} from 'react';
import { useHistory, Link } from 'react-router-dom';
import './AdminLogin.css';
import Header from '../Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';

const AdminLogin = (props) => { // Admin Login Component

    let history = useHistory();
   
    const [enteredUsername, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(true);

    const [enteredEmail, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(true);
    const [enteredPassword, setPassword] = useState('');
    const [enteredConfirmPassword, setConfirmPassword] = useState('');
    const [formIsValid, setFormIsValid] = useState(true);
  
    
    return (

    <Fragment>
        <Header />

<section className = "section--home">
        <div className = "home--grid">

   <div className = "home-text-box">


     <h1 className = "heading--primary">Admin Dashboard Login</h1>
    <p className = "home--description">Login into the Dashboard in order to configure appliances.</p>

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
                <h1 className = "heading--primary register">Admin Login</h1>
                <form className = "register--form">

                
                   <div className = "email--box">
                       <label className = "email--lbl">E-mail</label>
                       <input value = {enteredEmail} onChange = {(e) => {setEmailAddress(e.target.value)}} placeholder = "Enter your E-mail" type = "text"/>
                   </div>

                   <div className = "password--box">
                       <label className = "password--lbl">Password</label>
                       <input value = {enteredPassword} onChange = {(e) => {setPassword(e.target.value)}} placeholder = "Enter your Password" required id = "password" type = "text"/>
                   </div>
                   

                   <p className = "already--text">Forgot your password?</p>
                   <Link className = "link--to" to = '/admin-login'>Reset Here!</Link>

                   <div className = "submit--container">
                       <button className = "register--btn" type = "submit">Login</button>
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

export default AdminLogin
