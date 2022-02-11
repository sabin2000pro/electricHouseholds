import React, {useState, useEffect, Fragment} from 'react';
import {useLocation} from 'react-router-dom';

const ResultsScreen = (props) => { // The results screen that shows the results at the end of the bidding session rounds
  const location = useLocation();

  return <Fragment>
        <div>
            <h1 style = {{textAlign: 'center', padding: '20px'}}>Round Results</h1>

            <h1>Winner : {location.winner} spent {location.bid} virtual credits for appliance {location.appliance} and receives the timeslots: {}</h1>
        </div>
  </Fragment>
};

export default ResultsScreen;
