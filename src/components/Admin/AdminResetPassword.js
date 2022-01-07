import React, {useState, Fragment} from 'react';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import { Link } from 'react-router-dom';
import RegisterCard from './RegisterCard';
import './AdminResetPasswordHome.css';

const AdminResetPassword = ({match}) => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordValid, setNewPasswordValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    const resetPasswordHandler = async (event) => {
        try {
            event.preventDefault();


        } 
        
        catch(err) {

            if(err) {
                setFormValid(false);
                return console.log(err);
            }
            
        }
    }

    return (
        <Fragment>
            <section className = "section--resetpassword">

    <div className = "container grid grid--2-cols">

        <RegisterCard>
            <h1 className = "heading--primary login">Reset Your Password</h1>
            <form onSubmit = {resetPasswordHandler} className = "login--form">

            <div className = "password--box">
                <label className = "password--lbl">New Password</label>
                <input placeholder = "Enter your Password" required id = "password" type = "password"/>
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
        </Fragment>
    )
}

export default AdminResetPassword // Reset Password Component Exported