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
import Header from '../../components/Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';
import './ContactHome.css'
import CreateContact from './CreateContact';

const ContactHome = (props) => { // Contact Us Home Page

    return (
        <Fragment>

         <Header />

    <section className = "section--home">
        <div className = "home--grid">

           <div className = "home-text-box">


             <h1 className = "heading--primary">Contact Us</h1>
            <p className = "home--description">Should you encounter any issues with the web application please contact us using the form below. If you are having problems with the algorithms please let us know.</p>

      
        </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>

    </div>

    </section>

        <section className = "section--createcontact">
            <CreateContact />
        </section>

        <footer className = "footer">
                <ul className = "footer--items">
                    <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
                </ul>
            </footer>

    </Fragment>
    )
}

export default ContactHome