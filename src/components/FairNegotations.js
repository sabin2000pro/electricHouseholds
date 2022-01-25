import React, {useState, useEffect, Fragment, useRef} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';
import ModalCard from '../UI/ModalCard';
import './FairNegotiations.css';

const DELAY = 1200;
const START_TIMER = 60;
const REFRESH_SECONDS = 30000;

const FLAGS = {
    DEFAULT: 0,
    DELAY: DELAY,
    START_TIMER: START_TIMER,
    REFRESH_SECONDS: REFRESH_SECONDS
}

const bidData = []; // Array that stores the bid data

const FairNegotations = (props) => {
    let history = useHistory();
    let location = useLocation();

    const [feedbackData, setFeedbackData] = useState([]);
    const [creditData, setCreditData] = useState([]);
    const [enteredBid, setEnteredBid] = useState('');
    const [bidValid, setBidValid] = useState(false);
    const [bidSubmitted, setBidSubmitted] = useState(false);
    const [bidsFound, setBidsFound] = useState(false);
    const [enteredFeedbackUsername, setEnteredFeedbackUsername] = useState("");
    const [enteredFeedbackEmailAddress, setEnteredFeedbackEmailAddress] = useState("");
    const [chosenFeedbackFeeling, setChosenFeedbackFeeling] = useState("");
    const [enteredFeedbackDescription, setEnteredFeedbackDescription] = useState('');
    const [feedbackFormValid, setFeedbackFormValid] = useState(false);
    const [feedbackFormSubmitted, setFeedbackFormSubmitted] = useState(false);
    const [maxBidFound, setMaxBidFound] = useState(false);
    const [minBidFound, setMinBidFound] = useState(false);
    const [biddingStarted, setBiddingStarted] = useState(false);
    const [bidsCounted, setBidsCounted] = useState(false);
    const [joinedLiveAuction, setJoinedLiveAuction] = useState(false);
    const [englishAuctionChosen, setEnglishAuctionChosen] = useState(false);
    const [socialExchangeChosen, setSocialExchangeChosen] = useState(false);

    const [botTurn, setBotTurn] = useState(false);
    const [userTurn, setUserTurn] = useState(false);

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

      // Routine that toggles between true / false if the english auction algorithm is chosen
      const chosenEnglishAuctionHandler = function() {
          return setEnglishAuctionChosen(!englishAuctionChosen);
      };
      
      const chosenSocialExchangeHandler = function() {
          return setSocialExchangeChosen(!socialExchangeChosen);
      }

    const findMinBid = (bid) => {
        try {
            let minBid = bid;

            return minBid;
        } 
        
        catch(error) {

            if(error) {

                setMinBidFound(false);
                console.error(error);

                throw new Error(error);
            }
        }
    };

    // Finding Max Algorithm that is used to count the largest bid placed
    const findMaxBid = () => {
        try {
            let maxBid = 0;
        } 
        
        catch(error) {

            if(error) {
                setMaxBidFound(false);
                console.error(error);
                
                throw new Error(error);
            }
        }

    }

    // Counting Occurences algorithm that counts the number of bids that have been placed.
    const countTotalBids = () => {
        try {
             
        }
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }

    // This routine is used to submit a bid that has been placed by sending a POST request to the back-end.
    const submitBidHandler = async (event) => {
        try {
            event.preventDefault();
        } 
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }

    // This routine is used to fetch all the bids that have been placed thus far. Sends a GET request to the back-end.
    const fetchAllBids = async () => {
        try {
            // Send GET request to fetch all bids here
        } 
        
        catch(error) {

            if(error) {
                console.error(error);

                throw new Error(error);
            }
        }
    }   
    
    // This routine acts as an AI bot that randomly places a BID after a user does, or after a certain amount of time
    const placeRandomBid = function() {
        try {
            // Code here for the AI bot that generates a random bid
        } 
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }

    // Routine used to submit feedback by the user. This routine will handle a POST request

    const submitFeedbackHandler = async (event) => {
        try {
            event.preventDefault();

            // Send POST request to the back-end server
            const {data} = await axios.post(``);

            // If no data found
            if(!data) {
                return alert(`No data could be submitted`);
            }
        }
        
        catch(error) {
            if(error) {

                console.log(`An error occurred : ${error}`);
                setFeedbackFormValid(false);
                return console.error(error);
            }
        }
    };

    // Routine used to validate the feedback submitted by the user
    const validateFeedback = function() {
        try {

        }
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }

        }
    }

    const editFeedback = (id) => {
        try {
            // Sends a PUT request to the back-end that updates the feedback if the user is not happy with it
        } 
        
        catch(error) {

            if(error) {

                console.error(error);
                throw new Error(error);
            }
        }
    }

    useEffect(() => {
        return socialExchangeHandler();
    }, []);

    const socialExchangeHandler = () => {
        try {
        } 
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }

    }

    return (
        <React.Fragment>
         <section className = "section--login">
          <h1 className = "fn--heading">Choose Your Desired Algorithm Below</h1>

        <div className = "container grid grid--2-cols">
            <button onClick = {chosenEnglishAuctionHandler} className = "auction--btn">English Auction Algorithm</button>
            <button onClick = {chosenSocialExchangeHandler} className = "social--btn">Social Exchange Algorithm</button>
        </div>

        <div className = "live--auction">

        </div>

    </section>

    <footer className = "footer">
                <ul className = "footer--items">
                    <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
                </ul>
    </footer>
        </React.Fragment>
    )
}

export default FairNegotations // Export Component