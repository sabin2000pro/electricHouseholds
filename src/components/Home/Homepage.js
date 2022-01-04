import React, {Fragment} from 'react';
import Navigation from '../Navigation';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import './Homepage.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import PeakElectricityImg from '../images/homepage/peakelectricity.jpg';
import Electricity from '../images/homepage/electricity2.jpg';
import Card from '../../UI/Card';
import {motion, AnimatePresence} from 'framer-motion';

const Homepage = (props) => { // Main Homepage Component
    return (

        <Fragment>
            <Router>

            <header className = "header">
                <nav className = "main-nav">
                    <ul className = "main-nav--list">

                        <Link className = 'main-nav--link' to = '/'>Home</Link>
                        <Link className = 'main-nav--link' to = '/'>Admin Register</Link>
                        <Link className = 'main-nav--link' to = '/'>Your Preferences</Link>
                        <Link className = 'main-nav--link' to = '/'>Fair Negotiations</Link>
                        <Link className = 'main-nav--link' to = '/'>Contact Us</Link>
                    </ul>
                </nav>

            </header>

        <main>

        <section className = "section--home">
                <div className = "home--grid">

            <div className = "home-text-box">

                {props.data.map((data, key) => {
                    return <div key = {key}>

                         <h1 className = "heading--primary">{data.title}</h1>
                        <p className = "home--description">{data.description}</p>

                    </div>
                })}

                <Link className = "btn btn--full mgr-sm" to = '/'>Start Now</Link>
            <Link className = "btn btn--outline" to = '/'>Learn More!</Link>
         

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
            <h3 className = "heading--tertiary">The Problem</h3>
            <p className = "electricity--description">Too many households are making use of their highly-powered electrical appliances at various hours during the day. This places a high demand on electricity consumption, therefore affecting the environment negatively but also impacting the electricity bills</p>
        </Card>

        </motion.div>
        </AnimatePresence>

        <img className = "electricity--img" src = {PeakElectricityImg} />
    </div>

    <div className = "container grid grid--2-cols">

    <img className = "electricity--img secondary--img" src = {Electricity} />

     <AnimatePresence>

     <motion.div exit = {{opacity: 0}} initial = {{opacity: 0}} animate = {{opacity: 1}}>

        <Card>

            <h3 className = "heading--tertiary reverse">The Solution</h3>
            <p className = "electricity--description reverse">The solution to this problem is to disperse the usage of household appliances by submitting when you would like to run your electrical appliance. However, you can only run your chosen appliance for a maximum of 3 hours per day.</p>
        </Card>
        </motion.div>

        </AnimatePresence>

    </div>

    </section>

<section className = "section--load">
    <h2 className = "heading--secondary">Load Balancing</h2>

    <div className = "container grid grid--2-cols">
        <p className = "load--heading">Load Balancing Problem</p>    
    </div>

    <div className = "container grid grid--2-cols">
        <p className = "load--description reverse">The solution to this problem is to disperse the usage of household appliances by submitting when you would like to run your electrical appliance. However, you can only run your chosen appliance for a maximum of 3 hours per day.</p>
    </div>
    
    
    <div className = "container grid grid--2-cols">
        <p className = "load--heading--second">Load Balancing Solution</p>    
    </div>

    <div className = "container grid grid--2-cols">
        <p className = "load--description--second reverse">The solution to this problem is to disperse the usage of household appliances by submitting when you would like to run your electrical appliance. However, you can only run your chosen appliance for a maximum of 3 hours per day.</p>
        <img className = "electricity--img secondary--img load--img" src = {Electricity} />

    </div>


    </section>



    </main>
        </Router>
    </Fragment>
    )
}

export default Homepage