import React, {useState, useEffect, Fragment} from 'react';
import {useLocation} from 'react-router-dom';

const ResultsScreen = (props) => { // The results screen that shows the results at the end of the bidding session rounds
  const location = useLocation();

  return <Fragment>
        <div>
            <h1>Your Results Here: {location.userBidData} </h1>

            <h1>Winning Bid: {location.winningBid}</h1>
        </div>
  </Fragment>
};

export default ResultsScreen;
