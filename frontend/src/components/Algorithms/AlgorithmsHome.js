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


             <h1 className = "heading--primary">Negotiate your Preferences</h1>
             <p className = "home--description">After you have submitted your timeslot preferences, please feel free to try out any of the three algorithms which are implemented primarily to persuade you to reduce your peak electricity consumption and at the same time engage in a fun environment with other users on this page</p>
            <p className = "home--description">Simply click one of the three buttons down below to experiment with the algorithms. A description of how the algorithms work can be found down below as well.</p>

            <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
            <a className = "btn btn--outline" href = "/about-us">About Us</a>

            </div>

                <div className = "home-img-box">
                    <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
                </div>
            </div>
      </section>


    </Fragment>

    )
}

export default AlgorithmsHome