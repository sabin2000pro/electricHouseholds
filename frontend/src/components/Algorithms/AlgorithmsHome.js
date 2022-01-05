import React, {useState, useEffect, Fragment, useReducer, useContext} from 'react';
import Header from '../../components/Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';

const AlgorithmsHome = (props) => {

    return (
    
    <Fragment>
        <Header />

        <section className = "section--home">
                    <div className = "home--grid">

            <div className = "home-text-box">


                <h1 className = "heading--primary">Admin Dashboard Login</h1>
                <p className = "home--description">Login into the Dashboard in order to configure appliances.</p>

                <a className = "btn btn--full mgr-sm" href = "#">Start Now</a>
                <a className = "btn btn--outline" href = "#">Learn More!</a>
            </div>

                <div className = "home-img-box">
                    <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
                </div>
            </div>
    </section>
    </Fragment>


    )
}

export default AlgorithmsHome
