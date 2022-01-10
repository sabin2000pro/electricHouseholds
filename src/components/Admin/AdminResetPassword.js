import React, {useState, Fragment} from 'react';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import { Link, useHistory } from 'react-router-dom';
import RegisterCard from './RegisterCard';
import './AdminResetPasswordHome.css';
import axios from 'axios';
import AdminResetPasswordHome from './AdminResetPasswordHome';

const AdminResetPassword = ({match}) => {
    let history = useHistory(); // Used for navigation
    const [password, setNewPassword] = useState('');
    const [newPasswordValid, setNewPasswordValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const resetPasswordHandler = async (event) => { // Reset Password Handler method to reset admin password
        try {
            event.preventDefault();

            if(password.trim().length < 3) {
                setNewPasswordValid(false);
                setFormValid(false);
            }

            // Send PUT request
            const {data} = await axios.put(`http://localhost:5200/api/v1/auth/admin/reset-password/${match.params.resetToken}`, {password});

            if(!match.params.resetToken) {

            }

            console.log(data);
            console.log(`Password Updated Success`);
        } 
        
        catch(err) {

            if(err) {
                console.log(`${match.params.resetToken}`)

                setFormValid(false);
                return console.log(err.message);
            }

        }
    }

    return (
        <Fragment>

            <AdminResetPasswordHome />

            <section className = "section--resetpassword">

    <div className = "container grid grid--2-cols">

        <RegisterCard>
            <h1 className = "heading--primary login">Reset Your Password</h1>
            <form onSubmit = {resetPasswordHandler} className = "login--form">

            <div className = "password--box">
                <label className = "password--lbl">New Password</label>
                <input value = {password} onChange = {(e) => {setNewPassword(e.target.value)}} placeholder = "Enter your Password" required id = "password" type = "password"/>
            </div>
            
            <p className = "already--text">Forgot your password?</p>
            <Link className = "link--to" to = '/admin-forgotpassword'>Reset Here!</Link>

            <div className = "submit--container">
                <button className = "resetpassword--btn" type = "submit">Reset</button>
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

export default AdminResetPassword // Reset Password Component Exported