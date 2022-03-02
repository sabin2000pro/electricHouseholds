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
                <p className = "home--description">In general, an algorithm are step-by-step instructions that are executed in order to solve a problem. In this context, a fair negotiation algorithm is algorithm is a type of algorithm that runs on an AI-oriented smart meter within homes. It runs at various intervals during the day, and it would negotiate a fixed schedule with different smart meters in other households. This is to establish a fixed timeslot for when high-powered appliances should run. </p>
                <p className = "home--description">Timeslot negotiation means that you are placing bids in the form of Virtual Credits against other households who also want to run their appliances at the same time as you.</p>
                <p className = "home--description">1. Click on the "Your Preferences" link above to start submitting your preferences for the appliances that are currently available. On this page you will be presented with a form where you can select up to 3 timeslot preferences for the presented electrical appliances and the day in which you would like to run your appliances on.</p>
                <p className = "home--description">2. After you submit your preferences, you can view your hourly timeslot allocations by clicking on the button "View Allocations"</p>





                
            
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
        <p className = "load--description reverse">Cutting down on high electricity usage demand within homes worldwide is crucial to make effective use of renewable energy sources. This is to save the environment and tackle climate change without having to buy in unclean electricity from centralised national grids. Utilising electrical appliances all at once throughout the day for long periods consumes a lot of electricity. This increases the price to pay towards electricity and means that it may not be met by renewable sources. This is an issue known as a reduction in load balancing.</p>
    </div>
    
   

    </section>

    <footer className = "footer">
        <ul className = "footer--items">
            <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2022</li>
        </ul>
    </footer>

       
    </Fragment>
    )
}

export default Homepage