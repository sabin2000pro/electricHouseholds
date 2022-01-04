import React, {Fragment} from 'react';
import Header from '../Header';
import Navigation from '../Navigation';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import './Homepage.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';

const Homepage = (props) => {
    return (
        <Fragment>
            <Router>

            <section className = "section--home">
                <div className = "home--grid">

            <div className = "home-text-box">

            <h1 className = "heading--primary">eHouseholds</h1>

            <p className = "home--description">
                Reducing your peak electricity consumptions through the experimentation of two Fair Negotiation Algorithms.
            </p>

            <Link className = "btn" to = '/'>Start Now</Link>
            <Link className = "" to = '/'>Learn More!</Link>

            </div>

                <div className = "home-img-box">
                    <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
                </div>

        </div>


        </section>

    </Router>
</Fragment>
    )
}

export default Homepage