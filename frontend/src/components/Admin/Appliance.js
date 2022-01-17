import React, {Fragment, useState, useEffect} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types'
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import RegisterCard from './RegisterCard';

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
                <a className = "btn btn--outline" href = "/home">Logout</a>
            </div>

                <div className = "home-img-box">
                    <img className = "home--img" alt = "Wind Turbing On The Main Webpage" src = {HomepageImg} />
                </div>
            </div>
    </section>

    <section className = "section--login">

        <div className = "container grid grid--2-cols">

                <RegisterCard>
                    <h1 className = "heading--primary login">{name}</h1>

                 
                 <div className = "login--form">

                    <img style = {{marginLeft: '250px', marginRight: '-150px'}} src = {image} width = "300" height = "280" />
            

                    <div className = "applianceimage--box">
                        <h1 style = {{textAlign: 'center', marginLeft: '200px', color: 'white', fontSize: '32px'}}>{description}</h1>
                    </div>
</div>
                   
                
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

export default Appliance
