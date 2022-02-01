import React, {useState, useEffect, Fragment} from 'react';

const ResultsScreen = (props) => { // The results screen that shows the results at the end of the bidding session rounds
  return <Fragment>
        <div>
            Creditgs Left: {props.creditsLeft}
        </div>
  </Fragment>
};

export default ResultsScreen;
