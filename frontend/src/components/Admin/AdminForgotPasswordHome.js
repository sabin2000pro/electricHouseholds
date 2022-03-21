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
