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

    useEffect(() => {
        const authToken = localStorage.getItem("authToken");
        return checkToken(authToken);
    }, []);

    const checkToken = (authToken) => {

         if(authToken) {
             return history.push('/admin-dashboard');
         }
    }

    const loginHandler = async (e) => {

        try {
            e.preventDefault();

            const {data} = await axios.post(`http://localhost:5200/api/v1/auth/login-admin`, {emailAddress: enteredEmail, password: enteredPassword});

            const authorizationToken = data.token;
            localStorage.setItem("authToken", authorizationToken);
            alert('You are logged in');
            return history.push('/admin-dashboard');
          
        }   
        
        catch(error) {

            if(error) {
                return console.log(error);
            }

        }  
    }
    
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


<section className = "section--login">

    <div className = "container grid grid--2-cols">

            <RegisterCard>
                <h1 className = "heading--primary login">Admin Login</h1>
                <form onSubmit = {loginHandler} className = "login--form">

                
                   <div className = "email--box">
                       <label className = "email--lbl">E-mail</label>
                       <input value = {enteredEmail} onChange = {(e) => {setEmailAddress(e.target.value)}} placeholder = "Enter your E-mail" type = "email"/>
                   </div>

                   <div className = "password--box">
                       <label className = "password--lbl">Password</label>
                       <input value = {enteredPassword} onChange = {(e) => {setPassword(e.target.value)}} placeholder = "Enter your Password" required id = "password" type = "password"/>
                   </div>
                   

                   <p className = "already--text">Forgot your password?</p>
                   <Link className = "link--to" to = '/admin-resetpassword'>Reset Here!</Link>

                   <div className = "submit--container">
                       <button className = "login--btn" type = "submit">Login</button>
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
