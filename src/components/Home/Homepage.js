import React, {Fragment} from 'react';
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

    </Router>
</Fragment>
    )
}

export default Homepage