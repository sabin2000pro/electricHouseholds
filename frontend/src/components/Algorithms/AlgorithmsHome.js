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


import React, { Fragment} from 'react';
import Header from '../../components/Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';

const AlgorithmsHome = () => {

    return (
    
    <Fragment>
        <Header />

        <section className = "section--home">
             
            <div className = "home--grid">

            <div className = "home-text-box">


             <h1 className = "heading--primary">Negotiate your Preferences</h1>
             <p className = "home--description">After you have submitted your timeslot preferences, please feel free to try out any of the two algorithms which are implemented primarily to persuade you to reduce your peak electricity consumption</p>
            <p className = "home--description">1. There are two rounds and given a capped number of virtual credits, you firstly place a desired bid of your choice.</p>
            <p className = "home--description">2. At the end of either rounds, your bid is going to be compared against other households.</p>
            <p className = "home--description">3. If your bid is greater than the other households bids, you receive the timeslot and pay the virtual credits for that round.</p>
            <p className = "home--description">4. If any of the other households submit a bid greater than yours, then they will receive the timeslot, but you get to keep your credits.</p>
            <p className = "home--description">5. For Round 1 please hit enter twice when submitting a bid to prevent form resubmission</p>
            <p className = "home--description">6. For Round 2 onwards please hit enter only once.</p>
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