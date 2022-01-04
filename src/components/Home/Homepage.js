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

            <h1 className = "heading--primary">{props.title}</h1>

            <p className = "home--description">
                Reducing your peak electricity consumptions through the experimentation of two Fair Negotiation Algorithms. This is very important in order to reuse clean energy from green renewable sources.
            </p>

            <Link className = "btn btn--full" to = '/'>Start Now</Link>
            <Link className = "btn btn--outline" to = '/'>Learn More!</Link>

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