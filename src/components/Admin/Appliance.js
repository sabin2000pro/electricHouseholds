import React, {Fragment, useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg'

const Appliance = (props) => {
    let history = useHistory();
    let location = useLocation();
    const {name, image, description} = location.state.appliance;
    
    return (
        <Fragment>
        <Header />

        <section className = "section--home">
                <div className = "home--grid">

            <div className = "home-text-box">

                <h1 className = "heading--primary">Your Appliance</h1>
                <p className = "home--description">View information about appliance below</p>

                <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
                <a className = "btn btn--outline" href = "/about-us">About Us</a>
            </div>

                <div className = "home-img-box">
                    <img className = "home--img" alt = "Wind Turbing On The Main Webpage" src = {HomepageImg} />
                </div>

            </div>
    </section>
    </Fragment>

    )
}

export default Appliance
