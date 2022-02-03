import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';
import './FairNegotiations.css';

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

let DELAY = 1200;
let START_TIMER = 15;
let REFRESH_SECONDS = 30000;

const FLAGS = {
    DEFAULT: 0,
    DELAY: DELAY,
    START_TIMER: START_TIMER,
    REFRESH_SECONDS: REFRESH_SECONDS
};

let bidData = []; // Array that stores the bid data
let botBidData = [];
let allBotBids = [];

let theLowBots = [];
let theMediumBots = [];
let theIntenseBots = [];
const allCombinedCreditsLeft = [];

const FairNegotations = (props) => {

    let location = useLocation();
    let history = useHistory();

    let {username, appliance, firstPreference, secondPreference, thirdPreference, nextAppliance} = location.state.preference;

    const [auctionStarted, setAuctionStarted] = useState(false);
    const [botTypes, setBotTypes] = useState({LOW: 'Low', MEDIUM: 'Medium', INTENSE: 'Intense'})
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

    const [lowBotBids, setLowBotBids] = useState([]);
    const [mediumBotBids, setMediumBotBids] = useState([]);
    const [intenseBotBids, setIntenseBotBids] = useState([]);
    const [theNextAppliance, setTheNextAppliance] = useState('');

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
        return `Current Highest Bid ${maxBid}`;
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
            let lowBotPlacedBid = false;
            
           const {...allLowBotData} = lowBotData;
           const {...allMediumBotData} = mediumBotData;
           const {...allIntenseBotData} = intenseBotData;

           let convertedBotBid = parseInt(bid);
           
           const sizeOfLow = Object.keys(allLowBotData).length;
           const sizeOfMedium = Object.keys(allMediumBotData).length;
           const sizeOfIntense = Object.keys(allIntenseBotData).length;

           const parsedLowBotCredits = parseInt(allLowBotData.botCredits);
           const parsedMediumBotCredits = parseInt(allMediumBotData.botCredits);
           const parsedIntenseBotCredits = parseInt(allIntenseBotData.botCredits);

           const numberOfLowBots = parseInt(allLowBotData.numberOfBots);
           const numberOfMediumBots = parseInt(allMediumBotData.numberOfBots);
           const numberOfIntenseBots = parseInt(allIntenseBotData.numberOfBots);

           let mediumBotCreditsLeft = parsedMediumBotCredits - convertedBotBid;
           let newMediumCredits = mediumBotCreditsLeft;
           mediumBotCreditsLeft = newMediumCredits;

           let lowBotBidAvg = parsedLowBotCredits * 0.10;
           let mediumBotBidAvg = parsedMediumBotCredits * 0.50;
           let intenseBotBidAvg = parsedIntenseBotCredits * 0.85;

           if(handleBiddingAggressiveness(lowBotBidAvg, mediumBotBidAvg, intenseBotBidAvg)) {
               console.log(`Low Bot Biding Average cannot be bigger than medium and intense`);
           }
        
           theLowBots.push(allLowBotData);
           theMediumBots.push(allMediumBotData);
           theIntenseBots.push(allIntenseBotData);

           if((sizeOfLow && sizeOfMedium && sizeOfIntense) > 0) {
               let creditsRemainingObj = {};

            if(!userInputDisabled && botTurn && !userTurn) {
                
                setTimeout(() => {

                    handleInputBlur();

                    setTimeout(() => {

                for(let k = 0; k < bidData.length; k++) {

                       const userBidVal = bidData[k].bid;
                       const theUserBid = parseInt(userBidVal);
                       
                        // Loop through the number of low bots available
                      for(let i = 0; i < numberOfLowBots; i++) {

                          const {name} = allLowBotData;
                          let isBetweenAvg = false;
                        
                        let randBid = Math.floor(Math.random() * lowBotBidAvg);
                        let lowBotCreditsLeft = parsedLowBotCredits - randBid;
                        let newLowCredits = lowBotCreditsLeft;

                        creditsRemainingObj = {lowBotCreditsLeft};
                        let theDifference = allLowBotData.botCredits - creditsRemainingObj.lowBotCreditsLeft;

                             
                        // If there are more than 1 low bot, find the combined bids
                        if(numberOfLowBots > 1) {
                            let lowBidTotal = randBid++;
                            console.log(lowBidTotal);
                        }

                        lowBotCreditsLeft = newLowCredits;
                        convertedBotBid = randBid;

                        // Check to see if the low bot bid is > users
                        if(randBid > theUserBid) {
                           
                            setTimeout(() => {

                                setRoundOneOver(true);
                                setSeconds(300);
                                setRoundNumber(roundNumber + 1); // Start next round;
                                setTheNextAppliance(nextAppliance);
                               
                                // Send PUT request to reset virtual credits back to initial value

                            }, 2000);
                        
                        }

                        if(randBid === 0) { // If the random low bot bid is 0
                            setTimeout(() => {
                                return window.location.reload(false);
                            }, 1000)
                        }

                        if(randBid >= 0 && randBid <= lowBotBidAvg) {

                            isBetweenAvg = true;

                            if(isBetweenAvg) {
                                console.log(convertedBotBid);

                                // eslint-disable-next-line no-loop-func
                                setTimeout(() => {
                                    lowBotPlacedBid = true;
                                    processLowBotBid(convertedBotBid, lowBotPlacedBid, name);

                
                                }, 2000)
                            }
                          
                        }
                      }

                    }

                      setTimeout(() => {
                          let medBotCreditsRemain = {};

                        for(let index = 0; index < bidData.length; index++) {
                           const userBid = parseInt(bidData[index].bid);
                           
                        for(let i = 0; i < numberOfMediumBots; i++) {

                            const {name, type, botCredits} = allMediumBotData;
  
                            let mediumBotRandomBids = Math.floor(Math.random() * mediumBotBidAvg);
                                let mediumBotCreditsRemaining = parsedMediumBotCredits - mediumBotRandomBids;
                                let mediumBotCreditsLeft = mediumBotCreditsRemaining;

                                convertedBotBid = mediumBotRandomBids;
                                medBotCreditsRemain = {mediumBotCreditsLeft};

                                let medBotDifference = parsedMediumBotCredits - medBotCreditsRemain.mediumBotCreditsLeft;

                                console.log(`Medium bot placed...`);
                                console.log(mediumBotRandomBids);


                                if(type === botTypes.MEDIUM && botCredits > 0 && name != null && (userBid > mediumBotRandomBids)) {
                              
                                    setTimeout(() => {
                                     // Find the maximum bid placed and show who the winner was with what bid was placed.
                                     // The highest bid placed gets the timeslot and delete it from the array and store the remaining credits left.
                                     
                                     if(mediumBotRandomBids !== 0 && !(userBid) < mediumBotRandomBids) {
                                        return processMediumBotBids(mediumBotRandomBids, name, type, mediumBotCreditsLeft);

                                     }
     
                                    }, 2000)
     
                                }
     
                        }
                    }

                    console.log(`Now processing the intense bots...`);

                    // After processing Intense Bots, store all of the data from a main big object, destructure all of its properties, put them into an array
                    // Loop through the array, check to see if the name of the bots does not include any one of Low, Medium or Intense
                    // If not found, then stop the loop and show the results screen because there are no more bots to place bids
                
                        
                    }, 2000);

                      

                    }, 2000); 

                
                }, 2000);
            }
            
         }

        }
        
        catch(error) {

            if(error) {
                const someErrMsg = error.message;
                console.error(someErrMsg);

                throw new Error(someErrMsg);
            }
      }

      finally {
          return console.log(`Error here processed gfracefully`);
      }
    }

    const displayWinner = () => { // Displays who the winner of Round 1 is

    }

    const processLowBotBid = async function(mediumBotRandomBids, lowBotPlacedBid, name) {
        try {

           await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {bid: mediumBotRandomBids, username: name}).then(response => {
             
           if(lowBotPlacedBid) {
              console.log(response.data);

               const bid = response.data.newBid.bid;
               const username = response.data.newBid.username;

               allBotBids.push(bid, username);
              

           }
               

           }).catch(err => {

               if(err) {
                   console.log(err);

                   throw new Error(err);
               }
           })

        } 
        
        catch(err) {

            if(err) {
                return console.error(err);
            }
        }
    }

    const processMediumBotBids = async function(convertedBotBid, name, type, mediumBotCreditsLeft) {

        return await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {bid: convertedBotBid, username: name, botType: type, creditsLeft: mediumBotCreditsLeft}).then(response => {

            const data = response.data.newBid;
            const mediumBids = response.data.newBid.bid;
            const creditsLeft = parseInt(response.data.newBid.creditsLeft);

            // Check to see if there is data present
            if(data) {

            }

            

           
        }).catch(err => {  

            if(err) {
                console.log(err.response.data);
         }
        })
    }

    const processIntenseBots = async function(allIntenseBotData) {
        console.log(`Inside process intense bots `);
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

    const findMaxBidBetweenBotAndUser = function() {

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

            <h1>Username: {username} </h1>
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
            <h2>User's Initial Appliance : {appliance}</h2>
            {roundOneOver && roundNumber === 2 ?  <h2>Next Appliance: {nextAppliance}</h2> :undefined }
           

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

            {allBotBids.map((botBid, key) => {

                return <div key = {key}>
                    <h2>Bot: {botBid}</h2>
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