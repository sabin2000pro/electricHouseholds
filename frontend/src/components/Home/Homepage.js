import React, {Fragment} from 'react';
import Navigation from '../Navigation';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import './Homepage.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import PeakElectricityImg from '../images/homepage/electricity.jpeg';
import Card from '../../UI/Card';

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

        <Card>
            <h3 className = "heading--tertiary">The Problem</h3>
            <p className = "electricity--description">Too many households are making use of their highly-powered electrical appliances at various hours during the day. This places a high demand on electricity consumption, therefore affecting the environment but also</p>
        </Card>

        <img className = "electricity--img" src = {PeakElectricityImg} />
    </div>

    </section>


    </main>
        </Router>
    </Fragment>
    )
}

export default Homepage