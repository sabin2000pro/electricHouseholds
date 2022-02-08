import React, {Fragment} from 'react';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import AdminForgotPassword from './AdminForgotPassword';
 // Adding heroku
const AdminForgotPasswordHome = () => { // Forgot Password Home

    return (
        
         <Fragment>
            <Header />
            
      <section className = "section--home">
           <div className = "home--grid">

          <div className = "home-text-box">
   
   
            <h1 className = "heading--primary">Admin Forgot Password</h1>
           <p className = "home--description">If you are an Admin and have forgotten your password, please fill out the form below to reset it.</p>
   
           <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
           <a className = "btn btn--outline" href = "/about-us">About Us</a>
       </div>
   
       <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>
    </div>

   </section>

   <AdminForgotPassword/>
            </Fragment>
    )
}

export default AdminForgotPasswordHome
