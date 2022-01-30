import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';
import ModalCard from '../UI/ModalCard';
import './FairNegotiations.css';

const DELAY = 1200;
const START_TIMER = 5;
const REFRESH_SECONDS = 30000;

const FLAGS = {
    DEFAULT: 0,
    DELAY: DELAY,
    START_TIMER: START_TIMER,
    REFRESH_SECONDS: REFRESH_SECONDS
};

const BOT_TYPES = {
    DEFAULT: 'Low',
    MEDIUM: "Medium",
    INTENSE: "Intense"
}

const bidData = []; // Array that stores the bid data

const FairNegotations = (props) => {

    let location = useLocation();
    let history = useHistory();
    const {appliance, firstPreference, secondPreference, thirdPreference} = location.state.preference;

    const [auctionStarted, setAuctionStarted] = useState(false);
    const [roundNumber, setRoundNumber] = useState(1);
    const [timerRunning, setTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(90);
    const [startTimer, setStartTimer] = useState(START_TIMER);
    const [showStartText, setShowStartText] = useState(true);
    const [startTimerShown, setStartTimerShown] = useState(false);
    const [bidValid, setBidValid] = useState(false);
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
    const [auctionChosen, setAuctionChosen] = useState(false);
    const [socialExchangeChosen, setSocialExchangeChosen] = useState(false);
    const [feedbackData, setFeedbackData] = useState([]);
    const [botData, setBotData] = useState([]);
    const [userBidData, setUserBidData] = useState([]);
    const [timeUp, setTimeUp] = useState(false);
    const [bidSubmitted, setBidSubmitted] = useState(false);

    const [botTurn, setBotTurn] = useState(false);
    const [userTurn, setUserTurn] = useState(false);
    const [userTurnOver, setUserTurnOver] = useState(false);
    const [botTurnOver, setBotTurnOver] = useState(false);
    
    const [enteredUsername, setEnteredUsername] = useState('');
    const [enteredBid, setEnteredBid] = useState('');
    const [counterError, setCounterError] = useState(false);
    const [mainRoundOver, setMainRoundOver] = useState(false);
    const [roundOneOver, setRoundOneOver] = useState(true);
    const [roundTwoOver, setRoundTwoOver] = useState(false);
    const [bids, setBids] = useState([]);
    const [creditData, setCreditData] = useState([]);

    const beginLiveAuctionHandler = function() {
        return setAuctionStarted(!auctionStarted);
    }

    const handleCounterReset = () => {
        setTimerRunning(null);
        setSeconds(90);
    }

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
    
        useEffect(() => { // Hook to to set the current callback
            setTimerRunning(true);

            if(timerRunning) {
                savedCallback.current = callback;
            }

           else if(timerRunning === null) {
               setSeconds(90);
           }

        }, [callback, timerRunning]);
    
        useEffect(() => {
    
          const counterTick = () => {
            return savedCallback.current();
          };
    
          if (delay !== null) {

            let timer = setInterval(counterTick, delay); // Set the interval delay with a unique ID
            return () => clearInterval(timer); // Clear out field

          }
    
        }, [FLAGS.DELAY]);
      };
    
      useInterval(() => {

        try {
            setSeconds(seconds - 1);
    
          if (seconds === 0) { // When the timer is up

            setRoundNumber(roundNumber + 1);
            return handleCounterReset();
          };

          if(roundNumber === 1 && seconds < 0) {

            setMainRoundOver(true);
            return handleCounterReset();
          }

          if(roundNumber === 2 && seconds < 0) {

              setRoundOneOver(true);
              return handleCounterReset();
          }

          if(roundNumber === 3 && seconds < 0) {

              setRoundTwoOver(true);
              return handleCounterReset();
          }


        } 
        
        catch (error) {
    
          if (error) {

              console.error(error);
              setCounterError(true);

            throw new Error(error);
          }
    
        }
      }, FLAGS.DELAY);
   

      // Side-Effect hook used to fetch all the bid data
      useEffect(() => {
        return fetchAllBids();
      }, []);

      useEffect(() => {
        return fetchCreditData();
      }, [])

      useEffect(() => {
        return fetchBotData();
      }, []);

      useEffect(() => {
          return fetchUserBidData();
      }, []);

      // Routine that toggles between true / false if the english auction algorithm is chosen
      const chosenEnglishAuctionHandler = function() {
          return setAuctionChosen(!auctionChosen);
      };
      
      const chosenSocialExchangeHandler = function() {
          return setSocialExchangeChosen(!socialExchangeChosen);
      }

      const fetchCreditData = async () => {
        try {

            return await axios.get(`http://localhost:5200/api/v1/credits/get-credits`).then(response => {
                const credits = response.data.allCredits;

                if(!credits) {
                    console.log(`Could not find any credit data`);
                }

                else {
                    setCreditData(credits);
                    console.log(credits);
                }

            }).catch(error => {

                if(error) {

                    return console.error(error);
                }
            })
        } 
        

        catch(error) {

            if(error) {
                console.error(error);

                return console.error(error);
            }
        }
    }


      const fetchUserBidData = async function() {
            try {

                return await axios.get(`http://localhost:5200/api/v1/bids/fetch-bids`).then(response => {
                    const allBids = response.data.bidData;
                    setUserBidData(allBids);

                }).catch(err => {

                    if(err) {
                        return console.error(err);
                    }
                })
            } 
            
            catch(error) {

                if(error) {
                    return console.error(error);
                }
            }

      }

      const fetchBotData = async function() {

          try {

            return await axios.get(`http://localhost:5200/api/v1/bot/get-bots`).then(response => {
                const theBotData = response.data.allBots;

                setBotData(theBotData);
                console.log(botData);
            })
          } 
          
          catch(error) {

            if(error) {

                console.error(error);
                throw new Error(error);
            }

          }

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

        let maxBid = FLAGS.DEFAULT;

        for (let i = FLAGS.DEFAULT; i < bidData.length; i++) {
            const currentBid = parseInt(bidData[i].bid);

        if (currentBid > maxBid) {
            maxBid = currentBid;
        }
      }
        return `Current Highest Bid ${maxBid}`;

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

            let bidCounter = FLAGS.DEFAULT;

            bidData.forEach((value) => {
                
                if(value.hasOwnProperty('bid')) {
                    bidCounter++;
                }

            });
            
            setBidsCounted(true);
            
            if(bidsCounted) {
                return `Current Total Bids : ${bidCounter}`;
            }
        }
        
        catch(error) {

            if(error) {
                setBidsCounted(false);
                console.error(error);
                throw new Error(error);
            }
        }
    }

    // This routine is used to submit a bid that has been placed by sending a POST request to the back-end.
    const submitBidHandler = async (event) => {

        try {
            event.preventDefault();

           if(enteredUsername.trim().length === 0) {
               setBidValid(false);
               alert(`Cannot leave username field blank`);
           }

            else {
                setBidValid(true);
            }

            if(bidValid) {
                await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {username: enteredUsername, bid: enteredBid}).then(response => {
                    const newBidData = response.data;
                    setBids(newBidData);

                    bidData.push({enteredUsername, enteredBid});
                    const minBid = findMinBid(enteredBid);

                    return minBid;

                }).catch(error => {
                    if(error) {
                        return console.error(error);
                    }
                })

                alert(`Bid Submitted`);
            }
           
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
            <button onClick = {chosenEnglishAuctionHandler} className = "auction--btn">Auction Algorithm</button>
            <button onClick = {chosenSocialExchangeHandler} className = "social--btn">Social Exchange Algorithm</button>
        </div>

        {auctionChosen ?
            <div className = "appliance--data">
            <button className = "start--auction" onClick = {beginLiveAuctionHandler} >Begin Live Auction</button>
        </div>
     : null}

     {auctionStarted ? 
        <div className = "appliance--data">

        <div>
            <h1>Bidding Seconds Remaining: {seconds}</h1>


            {creditData.map((credit, key) => {
                const credits = credit;

                return <div key = {key}>

                <h1 >Your Virtual Credits : {credits.virtualCredits}</h1>
                <h1 >Opening Bid: {credits.openingBid}</h1>

                </div>
            })}

            <h1>Current Round Number : {roundNumber}</h1>

         
            <h2>Your Chosen Appliance : {appliance}</h2>

            {!mainRoundOver ? <h1 className = "first--pref">Your First Chosen Preference : {firstPreference}</h1> : null }

            {roundOneOver && roundNumber === 2 ?<h1 className = "second--pref">Your Second Chosen Preference: {secondPreference}</h1> : null }
            {roundNumber === 3 ? <h1 className = "third--pref">Your Third Chosen Preference: {thirdPreference}</h1> : null}
        
            <div className = "container grid grid--2-cols">

                <RegisterCard>
                    <h1 className = "heading--primary login">Submit Bid</h1>

                    <form className = "login--form" onSubmit = {submitBidHandler} method = "POST">

                    <div className = "username--box">
                            <label className = "username--lbl">Username</label>
                            <input value = {enteredUsername} onChange = {(e) => {setEnteredUsername(e.target.value)}} placeholder = "Enter Username" type = "text"/>
                        </div>

                     <div className = "bid--box">
                        <label className = "bid--lbl">Desired Bid</label>
                        <input value = {enteredBid} onChange = {(e) => {setEnteredBid(e.target.value)}} placeholder = "Enter Your Desired Bid Amount" id = "bid" type = "text"/>
                    </div>

                    <div className = "submit-bid--container">
                        <button className = "login--btn" type = "submit">Submit</button>
                    </div>


                    </form>

                </RegisterCard>
            </div>

        </div> 
        <button className = "allbids--btn">View All Bids</button>

    </div>

: undefined}

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