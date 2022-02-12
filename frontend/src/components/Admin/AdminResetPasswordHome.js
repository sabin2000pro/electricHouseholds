/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */


import React, {Fragment} from 'react'
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';

const AdminResetPasswordHome = (props) => { // Homepage Component for the Admin Reset Password

    return (
        
        <Fragment>
            <Header />
           
        
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