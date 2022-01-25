import React, {useState, useEffect, Fragment, useRef} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';

const DELAY = 1200;
const START_TIMER = 60;
const REFRESH_SECONDS = 30000;
const bidData = [];

const FLAGS = {
    DEFAULT: 0,
    DELAY: DELAY,
    START_TIMER: START_TIMER,
    REFRESH_SECONDS: REFRESH_SECONDS
  }

const FairNegotations = (props) => {
    let history = useHistory();
    let location = useLocation();

    const [feedbackData, setFeedbackData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [creditData, setCreditData] = useState([]);
    const [enteredBid, setEnteredBid] = useState('');
    const [bidValid, setBidValid] = useState(false);
    const [bidSubmitted, setBidSubmitted] = useState(false);
    const [feedbackFormValid, setFeedbackFormValid] = useState(false);
    const [feedbackFormSubmitted, setFeedbackFormSubmitted] = useState(false);

    // Used as the countdown timer by using refs.
    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
    
        useEffect(() => {
          savedCallback.current = callback;
        }, [callback]);
    
        useEffect(() => {
    
          const tick = () => {
            return savedCallback.current();
          };
    
          if (delay !== null) {
            let id = setInterval(tick, delay); // Set the interval delay with a unique ID
                return () => clearInterval(id); // Clear out field
          }
    
        }, [delay]);
      };

      // Invoke above routine
      useInterval(() => {

      });

      // Side-Effect hook used to fetch all the bid data
      useEffect(() => {
        return fetchAllBids();
      }, []);

      // Routine used to join the live auction algorithm based on the back-end web sockets
      const joinLiveAuction = function() {
          try {

          } 
          
          catch(error) {
            if(error) {
                return console.error(error);
            }
          }
      };

    const findMinBid = (bid) => {
        try {

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    };

    // Finding Max Algorithm that is used to count the largest bid placed
    const findMaxBid = () => {
        try {

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }

    }

    // Counting Occurences algorithm that counts the number of bids that have been placed.
    const countTotalBids = () => {
        try {
             
        }
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    }

    // This routine is used to submit a bid that has been placed by sending a POST request to the back-end.
    const submitBidHandler = (event) => {
        try {
            event.preventDefault();
        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }
        }
    }

    // This routine is used to fetch all the bids that have been placed thus far. Sends a GET request to the back-end.
    const fetchAllBids = async () => {
        try {

         return await axios.get(``).then(response => {


            }).catch(err => {

            if(err) {
                return console.error(err);
            }
            });
        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    }   
    
    // This routine acts as an AI bot that randomly places a BID after a user does, or after a certain amount of time
    const placeRandomBid = function() {
        try {

        } 
        
        catch(error) {
            if(error) {

            }
        }
    }

    // Routine used to submit feedback by the user. This routine will handle a POST request

    const submitFeedbackHandler = async (event) => {
        try {
            const {data} = await axios.post(``);
        }
        
        catch(error) {
            if(error) {
                console.log(`An error occurred : ${error}`);
                return console.error(error);
            }
        }
    }

    const editFeedback = async (event) => {
        try {

        } 
        
        catch(error) {

        }
    }

    const socialExchangeHandler = async (event) => {
        try {

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }

    }

    return (
        <Fragment>
            <div>
                <button>English Auction Algorithm</button>
            </div>
        </Fragment>
    )
}

export default FairNegotations // Export Component