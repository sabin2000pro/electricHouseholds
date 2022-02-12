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
import './Homepage.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import PeakElectricityImg from '../images/homepage/peakelectricity.jpg';
import Electricity from '../images/homepage/electricity2.jpg';
import Card from '../../UI/Card';
import {motion, AnimatePresence} from 'framer-motion';
import LoadBalance from '../images/homepage/loadbalance.jpg';
import Header from '../Header';

const Homepage = (props) => { // Main Homepage Component
    
    return (

        <Fragment>
            <Header />

        <section className = "section--home">
                <div className = "home--grid">

               <div className = "home-text-box">


                 <h1 className = "heading--primary">eHouseholds</h1>
                <p className = "home--description">Reducing your peak electricity consumptions through the experimentation of two Fair Negotiation Algorithms. This is very important in order to reuse clean energy from green renewable sources. We are aiming to save the planet by limiting the usage of electrical appliances throughout various hours during the day.</p>

                
                <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
                <a className = "btn btn--outline" href = "/about-us">About Us</a>
            </div>

            <div className = "home-img-box">
                <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
            </div>
        </div>

    </section>

    <section className = "section--electricity">
        <h2 className = "heading--secondary">Peak Electricity Consumption</h2>

    <div className = "container grid grid--2-cols">

    <AnimatePresence>

    <motion.div exit = {{opacity: 0}} initial = {{opacity: 0}} animate = {{opacity: 1}}>

        <Card reverse = {true}>
            <h3 className = "heading--tertiary">Problem Description</h3>
            <p className = "electricity--description">Too many households are making use of their highly-powered electrical appliances at various hours during the day. This places a high demand on electricity consumption, therefore affecting the environment negatively but also impacting the electricity bills</p>
        </Card>

        </motion.div>
    </AnimatePresence>

        <img alt = "Nice turbine" className = "electricity--img" src = {PeakElectricityImg} />
    </div>

    <div className = "container grid grid--2-cols">

    <img alt = "Secondary img" className = "electricity--img secondary--img" src = {Electricity} />

     <AnimatePresence>

     <motion.div exit = {{opacity: 0}} initial = {{opacity: 0}} animate = {{opacity: 1}}>

        <Card>

            <h3 className = "heading--tertiary reverse">Problem Solution</h3>
            <p className = "electricity--description reverse">The solution to this problem is to disperse the usage of household appliances by submitting when you would like to run your electrical appliance. However, you can only run your chosen appliance for a maximum of 3 hours per day.</p>
        </Card>
        </motion.div>

        </AnimatePresence>

    </div>

    </section>

<section className = "section--load">
    <h2 className = "heading--secondary">Load Balancing</h2>

    <div className = "container grid grid--2-cols">
        <p className = "load--heading">Problem Description</p>    
    </div>

    <div className = "container grid grid--2-cols">
        <p className = "load--description reverse">The solution to this problem is to disperse the usage of household appliances by submitting when you would like to run your electrical appliance. However, you can only run your chosen appliance for a maximum of 3 hours per day.</p>
    </div>
    
    <div className = "container grid grid--2-cols">
        <p className = "load--heading--second">Problem Solution</p>    
    </div>

    <div className = "container grid grid--2-cols">
        <p className = "load--description--second reverse">The solution to this problem is to disperse the usage of household appliances by submitting when you would like to run your electrical appliance. However, you can only run your chosen appliance for a maximum of 3 hours per day.</p>
        <img className = "electricity--img secondary--img load--img" src = {LoadBalance} />
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

export default Homepage