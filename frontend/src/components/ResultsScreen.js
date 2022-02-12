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


import React, {Fragment, useEffect, useState} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

const ResultsScreen = (props) => { // The results screen that shows the results at the end of the bidding session rounds
  const location = useLocation();
  const [detailsShown, setDetailsShown] = useState(false);
  const [nextRoundStarted, setNextRoundStarted] = useState(false);


  const redirect = () => {

    setTimeout(() => {
        setDetailsShown(true);
        setNextRoundStarted(true);
       
    }, 3500);

  }

  redirect();

  useEffect(() => {

    if(detailsShown) {
     // return history.push('/');
    }

  }, [detailsShown])

  const startNextRound = () => {
      return window.open("https://twitter.com/saigowthamr/");
  }

  return <Fragment>
        <div>
            <h1 style = {{textAlign: 'center', padding: '20px'}}>Round Results</h1>
            <h1 style = {{textAlign: 'center', marginTop: '30px'}}>After round {location.round} </h1>
            <h1 style = {{textAlign: 'center'}}>Winner : {location.winner} spent {location.bid} virtual credits for appliance {location.appliance} and receives the timeslots</h1>

            <button onClick = {startNextRound} style = {{marginLeft: '980px', marginTop: '100px'}}>Start Next Round</button>

        </div>
  </Fragment>
};

export default ResultsScreen;
