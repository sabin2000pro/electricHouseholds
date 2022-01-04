import React, {Fragment} from 'react';
import Header from '../Header';
import Navigation from '../Navigation';
import './Homepage.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';

const Homepage = (props) => {
    return (
        <Fragment>

            <section className = "section--home">
                <div className = "home-text-box">

                <h1 className = "heading--primary">eHouseholds</h1>

                <p className = "home--description">
                    Reducing your peak electricity consumptions through Fair Negotiation Algorithms experimentation.
                </p>

                </div>

                <div className = "home-img-box">
                    <img alt = "Wind Turbing Image" src = {HomepageImg} />
                </div>

            </section>

        </Fragment>
    )
}

export default Homepage