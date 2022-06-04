import React, {useEffect, useState} from 'react';
import axios from 'axios';
import FairNegotiations from '../FairNegotations'

const SocialExchange = () => {
  return (
     <React.Fragment>
         <div>
             <h2>Social Exchange Algorithm</h2>

             <FairNegotiations />
         </div>
     </React.Fragment>
  )
}

export default SocialExchange