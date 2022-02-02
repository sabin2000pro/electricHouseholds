import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';
import './FairNegotiations.css';
import ResultsScreen from '../components/ResultsScreen';

let DELAY = 1200;
let START_TIMER = 100;
let REFRESH_SECONDS = 30000;

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
let botBidData = [];
let botMaxBids = [];

let theLowBots = [];
let theMediumBots = [];
let theIntenseBots = [];


const FairNegotations = (props) => {

    let location = useLocation();
    let history = useHistory();
    const {username, appliance, firstPreference, secondPreference, thirdPreference} = location.state.preference;

    const [auctionStarted, setAuctionStarted] = useState(false);
    const [roundNumber, setRoundNumber] = useState(1);
    const [timerRunning, setTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(START_TIMER);
    const [minBid, setMinBid] = useState(null);
    const [numOfBids, setNumOfBids] = useState(FLAGS.DEFAULT);
    const [startTimer, setStartTimer] = useState(START_TIMER);
    const [startTimerShown, setStartTimerShown] = useState(false);
    const [bidValid, setBidValid] = useState(false);
    const [updatedNewBid, setUpdatedNewBid] = useState(false);
    const [clearedBids, setClearedBids] = useState(false);
    const [outOfCredits, setOutOfCredits] = useState(false);
    let [userInputDisabled, setUserInputDisabled] = useState(false);
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
    const [auctionChosen, setAuctionChosen] = useState(false);
    const [socialExchangeChosen, setSocialExchangeChosen] = useState(false);
    const [timeUp, setTimeUp] = useState(false);
    const [bidSubmitted, setBidSubmitted] = useState(false);

    const [botTurn, setBotTurn] = useState(false);
    const [userTurn, setUserTurn] = useState(true);

    const [userTurnOver, setUserTurnOver] = useState(false);
    const [botTurnOver, setBotTurnOver] = useState(false);
    
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


      // Clears the input field
      function clearFields() {
        setBid("");
      }

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
                setCreditsFetched(true);

                if(!credits) {
                    console.log(`Could not find any credit data`);
                }

                else {
                    setCreditData(credits);
                    console.log(credits);
                }

            }).catch(error => {

                if(error) {
                     console.error(error.response.data);
                     throw new Error(error);
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

                  response.data.allBots.forEach((botDataVal) => { // For every bot in the array
                    const {_id, name, botCredits, type, numberOfBots} = botDataVal;
                    botBidData.push({_id, name, botCredits, type, numberOfBots});
                });     

                

            });

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

    const findMaxBid = () => { // Finds the maximum bid placed
        let maxBid = 0;

        for (let i = FLAGS.DEFAULT; i < bidData.length; i++) {
            const currentBid = parseInt(bidData[i].bid);

        if (currentBid > maxBid) {
            maxBid = currentBid;
        }

    }
        return `Current Highest User Bid ${maxBid}`;
    };

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

                    else {
                        return submitBid(openingBid, virtualCredits);
                    }

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

        return setTimeout(() => {
            return window.location.reload(false);
        }, 1000);
    }

    const processOpeningBid = function(openingBid, convertedBid) {

        try {

           return convertedBid === openingBid;
        }
        
        catch(err) {

            if(err) {
                console.error(err);

                throw new Error(err);
            }
        }
    }

    const processNullCredits = async (convertedBid, virtualCredits) => {
        try {

            if(handleInvalidBidSubmission(convertedBid, virtualCredits)) {

                return setTimeout(() => {
                    window.location.reload(false);
                }, 2000);
            }
    
           else if(virtualCredits < FLAGS.DEFAULT) {
                alert(`You are out of credits. STOP`);
                setOutOfCredits(true);

                clearFields();

                return setTimeout(() => {                 
                    setSeconds(FLAGS.DEFAULT);
            
                    return history.push("/results");

                }, 1000);
            }

            else {
                // Otherwise reload page
            }

        }

        catch(error) {

            if(error) {
                const someErrMsg = error.response.data;
                console.error(someErrMsg);

                throw new Error(someErrMsg);
            }
        }
    }

    const handleInvalidBidSubmission = function(convertedBid, virtualCredits) {
        try {

            return (convertedBid > virtualCredits);
        } 
        
        catch(err) {

            if(err) {
                console.error(err);

                throw new Error(err);
            }
        }

    }

    function handleBidValidity() {
       return setBidValid(true);
    }

    const submitBid = async function(openingBid, virtualCredits) {

        try {

            const convertedBid = parseInt(bid);

            if(processOpeningBid(openingBid, convertedBid)) {
                alert(`Entered bid cannot be the same as the opening bid`);
                
                window.location.reload(false);
                clearFields();
                setSeconds(FLAGS.DEFAULT);
            }

           else if(bid.trim().length === FLAGS.DEFAULT) {
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
                handleUserTurn();
                handleBotTurn();
            }

             if(bidValid) {
 
                 await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {bid: bid}).then(response => {
                     const newBidData = response.data;

                     if(!newBidData) {
                        alert(`No data found regarding bids`);
                     }
                    
                     setBids(newBidData);
                     bidData.push({bid});

                     const smallestBid = findMinBid(bid);
                     handleBidSubmission(convertedBid, virtualCredits);
                     
                     return smallestBid;
 
                 }).catch(error => {
 
                     if(error) {
                        console.error(error);
                        throw new Error(error);
                     }
                 })
 
            }
        } 
        
        catch(error) {

            if(error) {
                console.error(error);

                throw new Error(error);
            }
        }
    }

    function handleUserTurn() {
        return setUserTurn(false);
    }

    function handleInputBlur() {
        return setUserInputDisabled(true);
    }

    function handleBotTurn() {
        return setBotTurn(true);        
    }


    const handleBidSubmission = async function(convertedBid, virtualCredits) {
        try {
        
            clearFields();

            let creditsLeft = virtualCredits - convertedBid;
            let newResult = creditsLeft;
            virtualCredits = newResult;
            
            creditData.map((credit) => {

               const {_id} = credit; // Extract ID
                return updateNewBid(_id, virtualCredits);
            });
        } 
        
        catch(error) {

            if(error) {
                console.error(error.response.data);
                throw new Error(error);
            }
        }
    }

    // Routine that updates the number of virtual credits left
    const updateNewBid = function(_id, virtualCredits) {

        try {

            axios.put(`http://localhost:5200/api/v1/credits/update-credits/${_id}`, {_id: _id, virtualCredits: virtualCredits}).then(data => {console.log(data)}).catch(err => {console.log(err)});
            setUpdatedNewBid(true);
            alert(`Updated Data Virutal Credits`);

            const [lowBotData, mediumBotData, intenseBotData] = botBidData;  
            return processBotDataBeforeTurn(lowBotData, mediumBotData, intenseBotData);  
        }
        
         catch(err) {

           if(err) {
            const theErr = err.response.data;

            console.error(theErr);
                throw new Error(err);
            }
        }
     } 

     const processBotDataBeforeTurn = function(lowBotData, mediumBotData, intenseBotData) {
        return botPlaceRandomBid(lowBotData, mediumBotData, intenseBotData);
     }

    const botPlaceRandomBid = async function(lowBotData, mediumBotData, intenseBotData) {

        try {
            
           const {...allLowBotData} = lowBotData;
           const {...allMediumBotData} = mediumBotData;
           const {...allIntenseBotData} = intenseBotData;

           const convertedBotBid = parseInt(bid);
           const lowBotCounter = parseInt(allLowBotData.numberOfBots);

           console.log(allLowBotData);
           console.log(allMediumBotData);
           console.log(allIntenseBotData);
           
           const sizeOfLow = Object.keys(allLowBotData).length;
           const sizeOfMedium = Object.keys(allMediumBotData).length;
           const sizeOfIntense = Object.keys(allIntenseBotData).length;

           const parsedLowBotCredits = parseInt(allLowBotData.botCredits);
           const parsedMediumBotCredits = parseInt(allMediumBotData.botCredits);
           const parsedIntenseBotCredits = parseInt(allIntenseBotData.botCredits);

           let lowBotCreditsLeft = parsedLowBotCredits - convertedBotBid;
           let newLowCredits = lowBotCreditsLeft;
           lowBotCreditsLeft = newLowCredits;

           let mediumBotCreditsLeft = parsedMediumBotCredits - convertedBotBid;
           let newMediumCredits = mediumBotCreditsLeft;
           mediumBotCreditsLeft = newMediumCredits;

           let lowBotBidAvg = parsedLowBotCredits * 0.10;
           let mediumBotBidAvg = parsedMediumBotCredits * 0.50;
           let intenseBotBidAvg = parsedIntenseBotCredits;

           if(handleBiddingAggressiveness(lowBotBidAvg, mediumBotBidAvg, intenseBotBidAvg)) {
               console.log(`Low Bot Biding Average cannot be bigger than medium and intense`);
           }

           console.log(`Number of low bots : `);
           console.log(lowBotCounter);

           theLowBots.push(allLowBotData);

        
           // If there are bot data present
           if((sizeOfLow && sizeOfMedium && sizeOfIntense) > 0) {

            if(!userInputDisabled && botTurn && !userTurn) {
                setTimeout(() => {

                    handleInputBlur();

                    alert(`Bots turn starting soon...`);

                    setTimeout(() => {
                        alert(`Low Bot turn starting now`);

                        console.log(`There are low bots in the object : `);

                        for(const [key, value] of Object.entries(allLowBotData)) {
                            const {name, botCredits, type, numberOfBots} = allLowBotData;
                            console.log(numberOfBots);

                            if(name !== undefined && type === 'Low') {
                                return processLowBotBids();
                            }
                        }

                    }, 2000); 

                    return processRemainingBotData(allMediumBotData, allIntenseBotData, sizeOfMedium, parsedMediumBotCredits, mediumBotCreditsLeft);

                }, 2000);
            }
            
         }

         // START BOT BID -> Loop through the bot array
            // Get type of the BOT
            // Place of the
            // If user turn is false && bot turn is TRUE
            // Loop through the entire low, medium and intense object of bots
            // Extract the type of bot present
            // Switch / Case -> determine what type of bot is now
            // Invoke a routine that checks, IF the bot type in the array DEFAULT (LOW)
            // Generate a random bid BETWEEN the specified range (0-10)
            // Else if type of bot medium then generate a random bid using math.random between the range specified
            // Else if type of bot is BOT_TYPES.INTENSE - place all the bids
            // Otherwise throw an error if the types are not in the array


            // Code here for the AI bot that generates a random bid after the user turn is over
            // 2. Store the bot data from backend in an array by looping (foreach) and pushing the data into a new array
            // 3. Randomly generate one of the three bots for the user to bid against
            // 4. Use switch / case statements. Determine if it's a low bot then randomly generate a bid between the specified range
            // 5. If the user turn is over, transmit a POST request to the server by randomly placing bids by the bot
            // 6. If the bot has placed a bid, set a timeout of 3 seconds and set user turn to true
        }
        
        catch(error) {

            if(error) {
                const someErrMsg = error.message;
                console.error(someErrMsg);

                throw new Error(someErrMsg);
            }
      }

      finally {
          alert(`Error here processed gfracefully`);
      }
    }

    const handleBiddingAggressiveness = function(lowBotBidAvg, mediumBotBidAvg, intenseBotBidAvg) {
        try {
            return (lowBotBidAvg < mediumBotBidAvg) && (mediumBotBidAvg < intenseBotBidAvg) && (lowBotBidAvg < intenseBotBidAvg);
        } 
        
        catch(err) {

            if(err) {

                console.error(err);
                throw new Error(err);
            }
        }

        finally {
           return console.log(`Bidding Aggressiveness Errors Dealt With`);
        }
    }

    const processRemainingBotData = function(allMediumBotData, allIntenseBotData, sizeOfMedium, parsedMediumBotCredits, mediumBotCreditsLeft) {
        try {

        } 
        
        catch(err) {

        }

        finally {
            alert(`Error processed gracefully`);
        }
    }

    const processLowBotBids = function() {
        try {

        } 
        
        catch(err) {

            if(err) {
                const theErr = err.message;
            }
        }
    }

    function handleNewTurn() {

        setUserTurn(false);
        setBotTurn(true);
    }

    // Routine used to submit feedback by the user. This routine will handle a POST request

    const submitFeedbackHandler = async (event) => {
        try {

            event.preventDefault();
            
            const {data} = await axios.post(`http://localhost:5200/api/v1/feedback/create-feedback`, {feedbackUsername: enteredFeedbackUsername, feedbackEmailAddress: enteredFeedbackEmailAddress, feedbackFeeling: chosenFeedbackFeeling, feedbackDescription: enteredFeedbackDescription});
            console.log(data);

            alert(`Feedback Submitted Success`);
           
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

    const findMaxBidBetween = function() {

        try {

            let userMaxBid = 0;
            let bidMaxBid = 0;
        } 
        
        catch(err) {
            if(err) {
                const maxErrMsg = err.message;
                console.log(maxErrMsg);
            }
        }
    }

    useEffect(() => {
        return socialExchangeHandler();
    }, []);

    const socialExchangeHandler = () => {

        try {
            // 3rd Algorithm
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
                    <h1 className = "bid--header">Submit Bid</h1>

                    <form className = "login--form" onSubmit = {submitBidHandler} method = "POST">

                    <div className = "bid--container">

                        
                    <label className = "bid--lbl">Bid</label>
                        {userInputDisabled ? 
                    
                        
                        <input value = {bid} onChange = {(event) => {setBid(event.target.value)}} placeholder = "Enter your Bid" id = "bid" type = "hidden" /> :
                        
                        <input value = {bid} onChange = {(event) => {setBid(event.target.value)}} placeholder = "Enter your Bid" id = "bid" type = "text"/>

}
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
                <h2>Round 1 Bids : £{vals.bid} placed by : {username}</h2>
            </div>
        })}
    </div>

: undefined}

        {mainRoundOver ? <h1>{`${findMaxBid()} the user receives the timeslot`}</h1>
: undefined}

</section>

        <section className = "section--login"></section>

        <div className = "container grid grid--2-cols">

            <RegisterCard>

                <form onSubmit = {submitFeedbackHandler} className = "login--form" method = "POST">

                <h1 className = "feedback--heading">Leave your Feedback</h1>
                
                <div className = "feedback--box">

                        <label className = "feedbackusername--lbl">Username</label>
                        <input value = {enteredFeedbackUsername} onChange = {(event) => {setEnteredFeedbackUsername(event.target.value)}} placeholder = "Enter Username" type = "text"/>
                    </div>

                    <div className = "emailAddress--box">
                        <label className = "emailAddress--lbl">E-mail Address</label>
                        <input value = {enteredFeedbackEmailAddress} onChange = {(event) => {setEnteredFeedbackEmailAddress(event.target.value)}} placeholder = "Enter Your E-mail Address" id = "email" type = "text"/>
                    </div>

                    <div className = "feeling--box">
                        <label className = "feeling--lbl">Feedback Feeling</label>
                        <input value = {chosenFeedbackFeeling} onChange = {(event) => {setChosenFeedbackFeeling(event.target.value)}} placeholder = "Enter Your Feeling" id = "feeling" type = "text"/>
                    </div>

                    <div className = "description--box med-left">
                        <label>Description</label>
                        <input value = {enteredFeedbackDescription} onChange = {(event) => {setEnteredFeedbackDescription(event.target.value)}} placeholder = "Enter Description" id = "description" type = "text"/>
                    </div>

                    <div className = "submit--container">
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