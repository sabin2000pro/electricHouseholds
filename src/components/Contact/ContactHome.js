import React, {useState, Fragment} from 'react';
import Header from '../../components/Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';

const ContactHome = () => { // Contact Us Home Page

    return (
        <Fragment>
         <Header />

    <section className = "section--home">
            <div className = "home--grid">

           <div className = "home-text-box">


             <h1 className = "heading--primary">Contact Us</h1>
            <p className = "home--description">Should you encounter any issues with the web application please contact us using the form below. If you are having problems with the algorithms please let us know.</p>

            
            <a className = "btn btn--full mgr-sm" href = "#">Start Now</a>
            <a className = "btn btn--outline" href = "/about-us">About Us</a>
        </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
        </div>
    </div>

    </section>
    </Fragment>
    )
}

export default ContactHome
