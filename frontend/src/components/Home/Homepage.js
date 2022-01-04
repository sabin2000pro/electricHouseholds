import React, {Fragment} from 'react';
import Navigation from '../Navigation';
import {BrowserRouter as Router, Link} from 'react-router-dom'
import './Homepage.css';
import HomepageImg from '../images/homepage/homepageimg.jpg';
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


    <section className = "section--electricity grid grid--2-cols">
        <div>Test 1</div>
        <div>Test 1</div>
    </section>


</main>
    </Router>
</Fragment>
    )
}

export default Homepage