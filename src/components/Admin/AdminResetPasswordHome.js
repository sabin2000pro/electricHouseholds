import React, {Fragment} from 'react'
import AdminResetPassword from './AdminResetPassword';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';

const AdminResetPasswordHome = (props) => {

    return (
        
        <Fragment>
           
        
    <section className = "section--home">
        <div className = "home--grid">

   <div className = "home-text-box">
        <h1 className = "heading--primary">Admin Reset Password</h1>
        <p className = "home--description">Reset your password below.</p>

        <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
        <a className = "btn btn--outline" href = "/about-us">About Us</a>
    </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>
        </div>
        </section>

            </Fragment>

    )
}

export default AdminResetPasswordHome