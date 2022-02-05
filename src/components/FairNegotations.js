import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';
import './FairNegotiations.css';

let DELAY = 1200;
let START_TIMER = 60;
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

let theLowBots = []; // Array of low bots
let theMediumBots = []; // Array of medium bots
let theIntenseBots = []; // Array of intense bots

let allBotData = []; // All of the bot data after bidding
let allTheBidsData = [];

const FairNegotations = (props) => {

    let location = useLocation();
    let history = useHistory();
    let {username, appliance, firstPreference, secondPreference, thirdPreference, nextAppliance, lastAppliance} = location.state.preference;

    const [auctionStarted, setAuctionStarted] = useState(false);
    const [botTypes, setBotTypes] = useState({LOW: 'Low', MEDIUM: 'Medium', INTENSE: 'Intense'})
    const [roundNumber, setRoundNumber] = useState(1);
    const [timerRunning, setTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(START_TIMER);

    const [numOfBids, setNumOfBids] = useState(FLAGS.DEFAULT);
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
    const [roundOneOver, setRoundOneOver] = useState(false);
    const [roundTwoOver, setRoundTwoOver] = useState(false);

    const [feedbackData, setFeedbackData] = useState([]);
    const [bids, setBids] = useState([]);
    const [botData, setBotData] = useState([]);
    const [userBidData, setUserBidData] = useState([]);
    const [creditData, setCreditData] = useState([]);
    const [creditsFetched, setCreditsFetched] = useState(false);
   
    const [remainingAppliances, setRemainingAppliances] = useState([]);

    let [userCreditsLeft, setUserCreditsLeft] = useState({});
    let [masterObject, setMasterObject] = useState({});

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
                let availableTypesOfBots = [botTypes.LOW, botTypes.MEDIUM, botTypes.INTENSE];
                let redirectPath = '/your-preferences';

                const theBotData = response.data.allBots;
                const botDataLength = response.data.allBots.length;
           
                if(botDataLength === 0) {

                    setTimeout(() => {
                        alert(`You are not allowed to start bidding because no bots are found`)
                    }, 2000)
                }

                 if(botDataLength !== 0) {

                    setBotData(theBotData);

                    for(let i = 0; i < theBotData.length - 1; i++) {
                        const botTypes = theBotData[i].type;

                        if(!botTypes.includes(availableTypesOfBots[0]) && !botTypes.includes(availableTypesOfBots[1]) && !botTypes.includes(availableTypesOfBots[2])) {

                            return setTimeout(() => {
                                alert(`We could not find one of the bots. Sorry for the incovenience`);
                                return history.push(redirectPath);
                            }, 2000)
                        }
                    }

                    return response.data.allBots.forEach((botDataVal) => { // For every bot in the array

                        const {_id, name, botCredits, type, numberOfBots} = botDataVal;
                        return botBidData.push({_id, name, botCredits, type, numberOfBots});
                    });  

                }


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
        return `Current Highest Bid £${maxBid}`;
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

    const processNullCredits = (virtualCredits) => {
        try {
            return virtualCredits !== 0;
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
                     handleBidSubmission(convertedBid, virtualCredits, openingBid);
                     
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
        return setUserTurn(!userTurn);
    }

    function handleInputBlur() {
        return setUserInputDisabled(true);
    }

    function handleBotTurn() {
        return setBotTurn(true);        
    }

    const processLessThanCredits = function(convertedBid, userCreditsLeft) {
        try {

        } 
        
        catch(err) {

        }
    }

    const handleBidSubmission = async function(convertedBid, virtualCredits, openingBid) {

        try {
        
            clearFields();

            let creditsLeft = virtualCredits - convertedBid;
            let newResult = creditsLeft;
            virtualCredits = newResult;
        
            userCreditsLeft = {creditsLeft, openingBid};
            openingBid = userCreditsLeft;

           

                return creditData.map((credit) => {

                    const {_id} = credit; // Extract ID
                     return updateNewBid(_id, virtualCredits, openingBid);
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
    const updateNewBid = function(_id, virtualCredits, openingBid) {

        try {
            axios.put(`http://localhost:5200/api/v1/credits/update-credits/${_id}`, {_id: _id, virtualCredits: virtualCredits}).then(data => {console.log(data)}).catch(err => {console.log(err)});
            setUpdatedNewBid(true);
            alert(`Updated Data Virutal Credits`);

            const [lowBotData, mediumBotData, intenseBotData] = botBidData;  
            return processBotDataBeforeTurn(lowBotData, mediumBotData, intenseBotData, openingBid);  
        }
        
         catch(err) {

           if(err) {
            const theErr = err.response.data;

            console.error(theErr);
                throw new Error(err);
            }
        }
     } 

     const processBotDataBeforeTurn = function(lowBotData, mediumBotData, intenseBotData, openingBid) {
          
       return botPlaceRandomBid(lowBotData, mediumBotData, intenseBotData, openingBid);
     }

   

    const botPlaceRandomBid = async function(lowBotData, mediumBotData, intenseBotData, openingBid) {

        try {

            let masterBotBids = {};
            let intenseCreditsRemain = {};
            let lowBotPlacedBid = false;
            let theOpeningBid = parseInt(openingBid.openingBid);

           const {...allLowBotData} = lowBotData;
           const {...allMediumBotData} = mediumBotData;
           const {...allIntenseBotData} = intenseBotData;

           let convertedBotBid = parseInt(bid);
           
           const sizeOfLow = Object.keys(allLowBotData).length;
           const sizeOfMedium = Object.keys(allMediumBotData).length;
           const sizeOfIntense = Object.keys(allIntenseBotData).length;

           // If no data is found
           if(sizeOfLow === 0 || sizeOfMedium === 0 || sizeOfIntense === 0) {
                alert(`No data found in these objects`);
           }

           const parsedLowBotCredits = parseInt(allLowBotData.botCredits);
           const parsedMediumBotCredits = parseInt(allMediumBotData.botCredits);
           const parsedIntenseBotCredits = parseInt(allIntenseBotData.botCredits);

           const numberOfLowBots = parseInt(allLowBotData.numberOfBots);
           const numberOfMediumBots = parseInt(allMediumBotData.numberOfBots);
           const numberOfIntenseBots = parseInt(allIntenseBotData.numberOfBots);

           let mediumBotCreditsLeft = parsedMediumBotCredits - convertedBotBid;
           let newMediumCredits = mediumBotCreditsLeft;
           mediumBotCreditsLeft = newMediumCredits;

           let lowBotBidAvg = parsedLowBotCredits * 0.30;
           let mediumBotBidAvg = parsedMediumBotCredits * 0.60;
           let intenseBotBidAvg = parsedIntenseBotCredits * 0.90;

           if(handleBiddingAggressiveness(lowBotBidAvg, mediumBotBidAvg, intenseBotBidAvg)) {
               console.log(`Low Bot Biding Average cannot be bigger than medium and intense`);
           }
        
           theLowBots.push(allLowBotData);
           theMediumBots.push(allMediumBotData);
           theIntenseBots.push(allIntenseBotData);

           if((sizeOfLow && sizeOfMedium && sizeOfIntense) > 0) {
               let creditsRemainingObj = {};

            if(!userInputDisabled && botTurn && !userTurn) { // If it's the bot turn and not the user turn
                
                setTimeout(() => {

                    handleInputBlur();

                    setTimeout(() => {

                for(let k = 0; k < bidData.length; k++) {

                       const userBidVal = bidData[k].bid;
                       const theUserBid = parseInt(userBidVal);
                       
                        // Loop through the number of low bots available
                      for(let i = 0; i < numberOfLowBots; i++) {

                          const {name, type} = allLowBotData;
                          let isBetweenAvg = false;
                        
                        let randBid = Math.floor(Math.random() * lowBotBidAvg);
                        let lowBotCreditsLeft = parsedLowBotCredits - randBid;
                        let newLowCredits = lowBotCreditsLeft;

                        creditsRemainingObj = {lowBotCreditsLeft};
                        let theDifference = allLowBotData.botCredits - creditsRemainingObj.lowBotCreditsLeft;

                        lowBotCreditsLeft = newLowCredits;
                        convertedBotBid = randBid;
                    
                        if(theUserBid < randBid) {

                            alert(`You have lost the auction against the ${type} bot(s)`);
                            
                            for(const [userKey, userValue] of Object.entries(userCreditsLeft)) { // For every key value pair in the entries of user credits left

                                if(userKey !== undefined && userValue !== undefined) { // if a user key exists
                                
                                   allBotData.push({...creditsRemainingObj, name, theDifference, userCreditsLeft, theUserBid, type});
                                   allTheBidsData = [...allBotData];
                                   masterBotBids = {...allTheBidsData};

                                  findMaxBetweenLowBot(allTheBidsData, theOpeningBid);
                                
                                    alert(`The winner is the ${type} bot(s) with a bid of ${randBid}`);

                                    alert(`The bot : ${type} receives the timeslot preference : ${firstPreference} for this round`);

                                    setTimeout(() => {
                                        getNextAppliance();
                                    }, 1000);
                                   
                                   break;
                                 
                                }
                            }

                             if(randBid === 0) { // If the random low bot bid is 0 reload the page

                            setTimeout(() => {
                                alert(`The user wins as the low bot hits 0`);
                            }, 1000)
                        }

                            // Display Results 
                            // BEGIN NEXT ROUND
                         
                            // eslint-disable-next-line no-loop-func
                            setTimeout(() => {
                              
                                setRoundNumber(roundNumber + 1);

                                setUserTurn(true);
                                setBotTurn(false);

                                alert(`User - Place your bid for round 2 now..`);
                               
                                setTimeout(() => {
                                    
                                      botPlaceRandomBid(lowBotData, mediumBotData, intenseBotData, openingBid);
                                      findMaxBetweenLowBot(allTheBidsData, theOpeningBid);
                                      
                                      console.log(`The LOW bot now placed a bid of :`);
                                      console.log(randBid);

                                    
                                }, 7000);

                                // Send PUT request to reset virtual credits back to initial value

                            }, 1000);
                            return;
                        }

                    
                        if(randBid >= 0 && randBid <= lowBotBidAvg) {

                            isBetweenAvg = true;

                            if(isBetweenAvg) {
                                console.log(convertedBotBid);

                                // eslint-disable-next-line no-loop-func
                                setTimeout(() => {

                                    lowBotPlacedBid = true;
                                    return processLowBotBid(convertedBotBid, lowBotPlacedBid, name);
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

                            if(!name || !type || !botCredits) {

                            }
  
                            let mediumBotRandomBids = Math.floor(Math.random() * mediumBotBidAvg);
                            let mediumBotCreditsRemaining = parsedMediumBotCredits - mediumBotRandomBids;
                            let mediumBotCreditsLeft = mediumBotCreditsRemaining;

                            convertedBotBid = mediumBotRandomBids;
                            medBotCreditsRemain = {mediumBotCreditsLeft};
                            let medBotDifference = parsedMediumBotCredits - medBotCreditsRemain.mediumBotCreditsLeft;

                             console.log(`The Medium Bot(s) Placed a bid of : ${mediumBotRandomBids}`);
                            
                                if(userBid < mediumBotRandomBids) {

                                     allBotData.push({...medBotCreditsRemain, medBotDifference, userCreditsLeft, userBid});
                                     allTheBidsData = [...allBotData, type];
                                     masterBotBids = {...allTheBidsData};

                                     console.log(`Starting round 2...`)
                                     setRoundNumber(roundNumber + 1);

                                     setTimeout(() => {
                                        return botPlaceRandomBid(lowBotData, mediumBotData, intenseBotData, openingBid);
                                     }, 8000)

                                     break;
                                }
                            
                                if(type === botTypes.MEDIUM && botCredits > 0 && name != null && (userBid > mediumBotRandomBids)) {
                              
                                    setTimeout(() => {
                                     
                                     if(mediumBotRandomBids !== 0 && !(userBid) < mediumBotRandomBids) {
                                        return processMediumBotBids(mediumBotRandomBids, name, type, mediumBotCreditsLeft);
                                     }
     
                                    }, 2000)
     
                                }
     
                        }
                    }
                    
            
                    setTimeout(() => {
                        console.log(`Inside process intense bots. This is your final bot.`);

                        try {
                           
                        } 
                        
                        catch(err) {

                            if(err) {

                                console.log(err);
                                throw new Error(err);
                            }
                        }

                    }, 3000)
                

                    }, 1300);


                }, 1300); 

                
                }, 1300);
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
          return console.log(`Error here processed gracefully`);
      }
    }

    useEffect(() => {
       console.log(roundNumber);
    }, [roundNumber]);


    const findMaxBetweenLowBot = function() {
        let maxBidBetween = 0;

        for(let i = 0; i < allTheBidsData.length; i++) {
            const lowBotBid = parseInt(allTheBidsData[i].theDifference);
             
            if(lowBotBid > maxBidBetween) {

                maxBidBetween = lowBotBid;
            }

           return maxBidBetween;
        }
    }

      const getNextAppliance = async function() {
        try {
            // Send GET request to get the next user appliance for round 2
            if(roundNumber === 2) {
                console.log(`Inside the get next appliance function`);
            }
        } 
        
        catch(err) {

            if(err) {
                console.log(err);

                throw new Error(err);
            }
        }
    }

    const displayWinner = () => { // Displays who the winner of Round 1 is
        try {

        } 
        
        catch(error) {
            
        }
    }

    const processLowBotBid = async function(mediumBotRandomBids, lowBotPlacedBid, name) {
        try {

           await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {bid: mediumBotRandomBids, username: name}).then(response => {
             
           if(lowBotPlacedBid) {
               const bid = response.data.newBid.bid;
               const username = response.data.newBid.username;

               if(bid != null && username != null) {
                return allBotBids.push(bid, username);

               }
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

                <h1>User Virtual Credits Remaining: £{updatedNewBid ? credits.virtualCredits : credits.virtualCredits}</h1>
                <h1>Opening Bid: £{credits.openingBid}</h1>
            </div>
            })}

            <h1>Current Round Number : {roundNumber}</h1>
            <h2>User's Initial Appliance : {appliance}</h2>

            {roundOneOver && roundNumber === 2 ?  <h2>Next Appliance: {nextAppliance}</h2> :undefined }
             <h2>Last Appliance: {lastAppliance}</h2>

            {!mainRoundOver ? <h1 className = "first--pref">User's First Chosen Preference : {firstPreference}</h1> : null }

            {/* {roundOneOver && roundNumber === 2 ?<h1 className = "second--pref">User's Second Chosen Preference: {secondPreference}</h1> : null }
            {roundNumber === 3 ? <h1 className = "third--pref">User's Third Chosen Preference: {thirdPreference}</h1> : null}
         */}
            <div className = "container grid grid--2-cols">

                <RegisterCard>
                    <h1 className = "bid--header">Submit Bid</h1>

                    <form className = "login--form" onSubmit = {submitBidHandler} method = "POST">

                    <div className = "bid--container">

                    <label className = "bid--lbl">Bid</label>
                        {roundOneOver && userInputDisabled ? 
                    
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