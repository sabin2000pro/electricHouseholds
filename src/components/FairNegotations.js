import React, {useState, useEffect, useRef} from 'react';
import {useLocation} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';
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

let bidData = []; // Array that stores the bid data
const botBidData = [];

const FairNegotations = (props) => {

    let location = useLocation();

    const {appliance, firstPreference, secondPreference, thirdPreference} = location.state.preference;
    const [auctionStarted, setAuctionStarted] = useState(false);
    const [roundNumber, setRoundNumber] = useState(1);
    const [timerRunning, setTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(100);
    const [minBid, setMinBid] = useState(null);
    const [numOfBids, setNumOfBids] = useState(0);
    const [startTimer, setStartTimer] = useState(START_TIMER);
    const [startTimerShown, setStartTimerShown] = useState(false);
    const [bidValid, setBidValid] = useState(false);
    const [updatedNewBid, setUpdatedNewBid] = useState(false);
    const [clearedBids, setClearedBids] = useState(false);
    const [outOfCredits, setOutOfCredits] = useState(false);
    const [creditsSubtracted, setCreditsSubtracted] = useState(false);
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
    const [timeUp, setTimeUp] = useState(false);
    const [bidSubmitted, setBidSubmitted] = useState(false);

    const [botTurn, setBotTurn] = useState(false);
    const [userTurn, setUserTurn] = useState(false);
    const [userTurnOver, setUserTurnOver] = useState(false);
    const [botTurnOver, setBotTurnOver] = useState(false);
    
    const [enteredUsername, setEnteredUsername] = useState('');
    const [bid, setBid] = useState('');
    const [counterError, setCounterError] = useState(false);
    const [mainRoundOver, setMainRoundOver] = useState(false);
    const [roundOneOver, setRoundOneOver] = useState(true);
    const [roundTwoOver, setRoundTwoOver] = useState(false);

    const [feedbackData, setFeedbackData] = useState([]);
    const [bids, setBids] = useState([]);
    const [botData, setBotData] = useState([]);
    const [userBidData, setUserBidData] = useState([]);
    const [creditData, setCreditData] = useState([]);
    const [creditsFetched, setCreditsFetched] = useState(false);

    const beginLiveAuctionHandler = function() {
        return setAuctionStarted(!auctionStarted);
    }

    const handleCounterReset = () => {
        setTimerRunning(null);
        return setSeconds(100);
    }

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
    
        useEffect(() => { // Hook to to set the current callback
            setTimerRunning(true);

            if(timerRunning) {
                savedCallback.current = callback;
            }

           else if(timerRunning === null) {
               return setSeconds(100);
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
    
      // Starts the countdown
      useInterval(() => {

        try {

            setSeconds(seconds - 1);
    
          if (seconds === 0) { // When the timer is up

            setRoundNumber(roundNumber + 1);
            setClearedBids(true);

            clearFields();
            setTimeUp(true);

            if(timeUp) { // if the time is up for round 1
                return handleCounterReset();
            }

          };

          if(roundNumber === 1 && seconds < 0) {

            setMainRoundOver(true);
            setClearedBids(true);

            // Clear Input FIelds
            return handleCounterReset();
          }

          if(roundNumber === 2 && seconds < 0) {

              setRoundOneOver(true);
              setClearedBids(true);

              clearFields();
              return handleCounterReset();
          }

          if(roundNumber === 3 && seconds < 0) {

              setRoundTwoOver(true);
              setClearedBids(true);
              clearFields();

              if(roundTwoOver && clearedBids) {
                return handleCounterReset();
              }

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


      function clearFields() {
        setEnteredUsername("");
        setBid("");
      }

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

                    if(!allBids) {
                        return alert(`Could not find any bid data`);
                    }

                    setUserBidData(allBids);
                    setBidsFound(true);

                }).catch(err => {

                    if(err) {
                        return console.error(err);
                    }
                })
            } 
            
            catch(error) {

                if(error) {
                    setBidsFound(false);
                    console.error(error);
                    
                    throw new Error(error);
                }
            }
      }

      // Fetches the AI bot data from the backend
      const fetchBotData = async function() {
          try {

            return await axios.get(`http://localhost:5200/api/v1/bot/get-bots`).then(response => {
                const theBotData = response.data.allBots;

                if(!theBotData) { // if no bot data is found
                    alert(`No bot data found unfortunately!`)
                }

                setBotData(theBotData);

                 return response.data.allBots.forEach((botDataVal) => {
                    const {name, botCredits, type} = botDataVal;

                    botBidData.push({name, botCredits, type});
                   
                    return botBidData.forEach((val) => {
                        // Destructure vaclues
                        const {_id, name, botCredits, type} = val;
                        console.log(val);

                        if(!_id || !name || !botCredits || !type) { // If data is not valid

                        }

                        return botPlaceRandomBid(_id, name, botCredits, type);

                    });

                });
            })
          } 
          
          catch(error) {

            if(error) {

                console.error(error);
                throw new Error(error);
            }

          }

      }

    const findMinBid = (minBid) => {
        try {

            let smallestBid = minBid;

            for(let i = 0; i < bidData.length; i++) { // Loop through the bids
                const currentBid = bidData[i].bid;
    
                if(currentBid <= smallestBid) {
                    smallestBid = currentBid;
                }
            }

            setMinBidFound(true);

            if(minBidFound) {
                return smallestBid;
            }
    
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
    const findMaxBid = () => { // Finds the maximum bid placed
        let maxBid = 0;

        for (let i = FLAGS.DEFAULT; i < bidData.length; i++) {
            const currentBid = parseInt(bidData[i].bid);

        if (currentBid > maxBid) {
            maxBid = currentBid;
        }
    }
        return `Current Highest Bid ${maxBid}`;
    };

    // Counting Occurences algorithm that counts the number of bids that have been placed.
    const countTotalBids = () => {
        try {

            let bidCounter = 0

            bidData.forEach((value) => {
                
                if(value.hasOwnProperty('bid')) {
                    bidCounter++;
                    
                }

            });
            
             return `Current Total Bids : ${bidCounter}`;
            
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

            await axios.get(`http://localhost:5200/api/v1/credits/get-credits`).then(response => {
                const theCreditData = response.data.allCredits;

                setCreditData(theCreditData);
                setCreditsFetched(true);

                if(!theCreditData) {
                    return console.log(`No credit data found`);
                }

                return response.data.allCredits.forEach((creditVal) => {
                    const {openingBid, virtualCredits} = creditVal;

                    if(!openingBid || !virtualCredits) {
                        console.log(`Could not find opening bid or virtual credits`);
                    }

                    return submitBid(openingBid, virtualCredits);
                });

            }).catch(err => {

                if(err) {
                    setCreditsFetched(false);
                    console.error(err);
                    throw new Error(err);
                }
            })
        } 
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }

    function reloadPage() {
        setTimeout(() => {
            return window.location.reload(false);
        }, 1000);
    }

    const submitBid = async function(openingBid, virtualCredits) {

        try {

            const convertedBid = parseInt(bid);
            let specialCharsRegex = /[\!\@\#\$\%\^\&\*\)\(\+\=\.\<\>\{\}\[\]\:\;\'\"\|\~\`\_\-]/g;

            // If user places a bid > opening bid
            // If the username matches one of the special chars (not allowed)

            if(enteredUsername.match(specialCharsRegex)) {
                alert(`Special characters for username not allowed`);
                clearFields();
                setBidValid(false);

                return reloadPage();
            }

           else if(enteredUsername.trim().length === 0) {
                setBidValid(false);
                alert(`Cannot leave username field blank`);
                clearFields();

                return reloadPage();
            }

            else if(bid.trim().length === 0) {
                setBidValid(false);
                alert(`Cannot leave the bid field empty`);

                clearFields();
                return reloadPage();
            }

            else if(isNaN(convertedBid)) {
                setBidValid(false);
                alert(`Bid must be a number`);

                clearFields();
                return reloadPage();
            }

           
             else {
                 setBidValid(true);
             }
 
             if(bidValid) {
 
                 await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {username: enteredUsername, bid: bid}).then(response => {
                     const newBidData = response.data;

                     if(!newBidData) {
                        alert(`No data found regarding bids`);
                     }
                    
                     setBids(newBidData);
                     bidData.push({enteredUsername, bid});

                     const smallestBid = findMinBid(bid);
                     setBidSubmitted(true);

                     // After submitting user bid. Subtract Virtual Credits Available from the Entered bid
                     handleBidSubmission(bid, virtualCredits);

                     return smallestBid;
 
                 }).catch(error => {
 
                     if(error) {
                        console.error(error);
                        throw new Error(error);
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

    const handleBidSubmission = async function(bid, virtualCredits) {
        try {

            setEnteredUsername("");
            setBid("");

            let creditsLeft = virtualCredits - bid;
            let newResult = creditsLeft;
            virtualCredits = newResult;

            // Get the virtual credits left for the bot
            
            creditData.map((credit, key) => {

               const {_id} = credit; // Extract ID

               if(virtualCredits === 0) {

                return setTimeout(() => {
                        alert(`You have no more credits left USER`);
                       return window.location.reload(false);
      
                     }, 0);
                } 

              return updateNewBid(_id, virtualCredits);

            });
        } 
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }

    const updateNewBid = function(_id, virtualCredits) {

        try {

            if(!virtualCredits || !_id) {
                alert(`Invalid data to update`)
            }

            axios.put(`http://localhost:5200/api/v1/credits/update-credits/${_id}`, {_id: _id, virtualCredits: virtualCredits}).then(data => {console.log(data)}).catch(err => {console.log(err)});
            setUpdatedNewBid(true);
            alert(`Updated Data Virutal Cerdits`);
         } 
        
         catch(err) {

           if(err) {

                console.error(err);
                throw new Error(err);
            }
        }
     }

    // This routine is used to fetch all the bids that have been placed thus far. Sends a GET request to the back-end.
    const fetchAllBids = async () => {

        try {
            console.log(`All bids here`);
        } 
        
        catch(error) {

            if(error) {
                console.error(error);

                throw new Error(error);
            }
        }
    }   
    
    // This routine acts as an AI bot that randomly places a BID after a user does, or after a certain amount of time. The BOT will send a POST request to the server with the bid data. Once it is the bots turn, the user input fields.
    // User input fields gets disabled (readonly) and after 5 seconds, the bot randomly places a certain amount of bids between a range, depending on the type of bot which will be fetched from the backend
    const botPlaceRandomBid = async function(_id, botName, credits, type) {

        try {
            console.log(`The BOTTT NAMES ARE : ${botName} with ${credits} Virtual Credits left to bid`);
            // Code here for the AI bot that generates a random bid after the user turn is over
            // 1. Fetch the Bot Data from backend
            // 2. Store the bot data from backend in an array by looping (foreach) and pushing the data into a new array
            // 3. Randomly generate one of the three bots for the user to bid against
            // 4. Use switch / case statements. Determine if it's a low bot then randomly generate a bid between the specified range
            // 5. If the user turn is over, transmit a POST request to the server by randomly placing bids by the bot
            // 6. If the bot has placed a bid, set a timeout of 3 seconds and set user turn to true
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
                setFeedbackFormValid(false);
                console.error(error);
                throw new Error(error);
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

            <h1>{findMaxBid()}</h1>
            <h1>{countTotalBids()}</h1>

            {creditData.map((credit, key) => {
                const credits = credit;

                return <div key = {key}>

                <h1>User Virtual Credits Remaining: {updatedNewBid ? credits.virtualCredits : credits.virtualCredits}</h1>
                <h1 >Opening Bid: {credits.openingBid}</h1>
                </div>
            })}

            <h1>Current Round Number : {roundNumber}</h1>
            <h2>User's Desired Appliance : {appliance}</h2>

            {!mainRoundOver ? <h1 className = "first--pref">User's First Chosen Preference : {firstPreference}</h1> : null }

            {roundOneOver && roundNumber === 2 ?<h1 className = "second--pref">User's Second Chosen Preference: {secondPreference}</h1> : null }
            {roundNumber === 3 ? <h1 className = "third--pref">User's Third Chosen Preference: {thirdPreference}</h1> : null}
        
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
                        <input value = {bid} onChange = {(e) => {setBid(e.target.value)}} placeholder = "Enter Your Desired Bid Amount" id = "bid" type = "text"/>
                    </div>

                    <div className = "submit-bid--container">
                        <button className = "login--btn" type = "submit">Submit</button>
                    </div>

                </form>

                </RegisterCard>
            </div>

        </div> 

        {bidData.map((vals, key) => {

            return <div key = {key}>

                <h2>Round 1 Bids : £{vals.bid} placed by : {vals.enteredUsername}</h2>
            </div>
        })}
    </div>

: undefined}

</section>

        <section className = "section--login"></section>

        <div className = "container grid grid--2-cols">

            <RegisterCard>

                <form className = "login--form" method = "POST">
                
                <div className = "username--box">

                    <h1 className = "heading--primary login">Leave your Feedback</h1>
                        <label className = "username--lbl">Username</label>
                        <input placeholder = "Enter Username" type = "text"/>
                    </div>

                    <div className = "emailAddress--box">
                        <label className = "emailAddress--lbl">E-mail Address</label>
                        <input placeholder = "Enter Your Desired Bid Amount" id = "bid" type = "text"/>
                    </div>

                    <div className = "feeling--box">
                        <label className = "feeling--lbl">Feedback Feeling Bid</label>
                        <input placeholder = "Enter Your Desired Bid Amount" id = "bid" type = "text"/>
                    </div>

                    <div className = "description--box">
                        <label className = "description--lbl">Feedback Description</label>
                        <input placeholder = "Enter Your Desired Bid Amount" id = "bid" type = "text"/>
                    </div>

                    <div className = "submit-bid--container">
                        <button className = "login--btn" type = "submit">Submit</button>
                    </div>

                </form>
        </RegisterCard>

    </div>

    <footer className = "footer">
                <ul className = "footer--items">
                <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
            </ul>
    </footer>

</React.Fragment>
    )
}

export default FairNegotations // Export Component