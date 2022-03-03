/*
 * File Creation Date: December 2021
 * Author: Sabin Constantin Lungu
 * -----
 * Last Modified: Saturday 12th February 2022
 * Modified By: Sabin Constantin Lungu
 * -----
 * Copyright (c) 2021-2022 - eHouseholds Sabin Constantin Lungu - Edinburgh Napier Univeristy - All Rights Reserved
 * Any unauthorised broadcasting, public performance, copying or re-recording will constitute an infringement of copyright
 */


/* eslint-disable no-loop-func */
import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';
import './FairNegotiations.css';
import Modal from '../UI/Modal';

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

const remainingAppliances = [];

const nextApplianceData = [];
const lastApplianceData = [];
const lastRemainingAppliance = [];

let MAX_ROUNDS = 3;

const FairNegotations = (props) => {

    let location = useLocation();
    let history = useHistory();
    let {username, appliance, firstPreference, secondPreference, thirdPreference, nextAppliance, lastAppliance} = location.state.preference;

    const [auctionStarted, setAuctionStarted] = useState(false);
    const [botTypes, setBotTypes] = useState({LOW: 'Low', MEDIUM: 'Medium', INTENSE: 'Intense'});

    const [roundNumber, setRoundNumber] = useState(1);
    const [timerRunning, setTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(START_TIMER);
    
    const [bidValid, setBidValid] = useState(false);
    const [updatedNewBid, setUpdatedNewBid] = useState(false);
    const [clearedBids, setClearedBids] = useState(false);
   
    let [userInputDisabled, setUserInputDisabled] = useState(false);
    const [bidsFound, setBidsFound] = useState(false);

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
    const [roundTwoOver, setRoundTwoOver] = useState(false);

    const [lastRoundOver, setLastRoundOver] = useState(false);

    const [bids, setBids] = useState([]);
    const [botData, setBotData] = useState([]);

    const [userBidData, setUserBidData] = useState([]);
    const [creditData, setCreditData] = useState([]);
    const [creditsFetched, setCreditsFetched] = useState(false);
   
    const [biddingOver, setBiddingOver] = useState(false);
    const [lowBotWin, setLowBotWin] = useState(false);
    const [mediumBotWin, setMediumBotWin] = useState(false);
   
    const [modalShown, setModalShown] = useState();
    let [userCreditsLeft, setUserCreditsLeft] = useState({});

    const [nextRoundBid, setNextRoundBid] = useState('');
    const [lastRoundBid, setLastRoundBid] = useState('');

    const [userWinBid, setUserWinBid] = useState(false);
    const [nextRoundForm, setNextRoundForm] = useState(false);
    const [lastRoundForm, setLastRoundForm] = useState(false);

    const [lastApplianceSet, setLastApplianceSet] = useState(false);
    const [outOfCredits, setOutOfCredits] = useState(false);

    const [results, setResults] = useState([]);
    const [roundLost, setRoundLost] = useState(false);

    const [userWinsRoundOne, setUserWinsRoundOne] = useState(false);
    const [userWinsNextRound, setUserWinsNextRound] = useState(false);

    const [showSatisfactionForm, setShowSatisfactionForm] = useState(false);
    const [theSatisfaction, setTheSatisfaction] = useState("");
    const [satisfactionDescription, setSatisfactionDescription] = useState("");

    const [nextRoundPreferences, setNextRoundPreferences] = useState([]);
    const [userLost, setUserLost] = useState(false);


    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

    useEffect(() => {
        console.log(`Last round over ? ${lastRoundOver}`);
    }, [lastRoundOver])

    const beginLiveAuctionHandler = function() {
        return setAuctionStarted(!auctionStarted);
    }

    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

    const handleCounterReset = () => {
        setTimerRunning(null);
        return setSeconds(START_TIMER);
    }

    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

    const useInterval = (callback, delay) => {
        const savedCallback = useRef();
    
        useEffect(() => { // Hook to to set the current callback

            setTimerRunning(true);

            if(timerRunning) {
                savedCallback.current = callback;
            }

           else if(timerRunning === null) {

               alert(`Time is up!`);
            setSeconds(START_TIMER);

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
            setTimeUp(!timeUp);

            if(timeUp) { // if the time is up for round 1
                return handleCounterReset();
            }
          };

          if(roundNumber === 1 && seconds === 0) {

              setMainRoundOver(!mainRoundOver);
              getNextAppliance();

            return handleCounterReset();

          }

          if(roundNumber === 2 && seconds === 0) {
              alert(`Run out of time..`);

              setRoundTwoOver(true);
              getNextAppliance();

              return handleCounterReset();
          }

          if(roundNumber === 3 && seconds === 0) {

              setMainRoundOver(!mainRoundOver);
              setClearedBids(true);
              clearFields();

              if(roundTwoOver && clearedBids) {

                return handleCounterReset();

              }

          }

          if(roundNumber > MAX_ROUNDS) {
            
              setTimeout(() => {

                alert(`No more rounds found... End of auction`);
                setLastRoundOver(!lastRoundOver);

              }, 1000);

              return window.location.reload(false);
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
        return setBid("");
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

      /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */
      const chosenEnglishAuctionHandler = function() {
          return setAuctionChosen(!auctionChosen);
      };

      /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */
      
      const chosenSocialExchangeHandler = function() {
          return setSocialExchangeChosen(!socialExchangeChosen);
      }

      /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

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

    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

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

     /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

      const fetchBotData = async function() {

          try {

            return await axios.get(`http://localhost:5200/api/v1/bot/get-bots`).then(response => {

                let availableTypesOfBots = [botTypes.LOW, botTypes.MEDIUM, botTypes.INTENSE];
                let redirectPath = '/your-preferences';

                const theBotData = response.data.allBots;
                const botDataLength = response.data.allBots.length;
           
                if(botDataLength === 0) {


                    setTimeout(() => {
                        alert(`You are not allowed to start bidding because no households to bid against are found`);

                        return history.push('/');
                    }, 2000)

                }

                 if(botDataLength !== 0) {

                    setBotData(theBotData);

                    for(let i = 0; i < theBotData.length - 1; i++) {

                        const typesOfBots = theBotData[i].type;

                        if(!typesOfBots.includes(availableTypesOfBots[0]) && !typesOfBots.includes(availableTypesOfBots[1]) && !typesOfBots.includes(availableTypesOfBots[2])) {

                            return setTimeout(() => {
                                alert(`We could not find any Households. Sorry for the inconvenience`);
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

      /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

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

    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

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

      /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

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

      /**
         * 
         * @returns : null
         * @method: submitBidHandler()
         * @description: 
         * @param: null
         */

    const submitBidHandler = async (event) => {

        try {

            event.preventDefault();
           
            if(roundNumber === 1) {
                performBid();
            }

            if(roundNumber === 2) {
              
                performBid();
            }

            if(roundNumber === 3) {
                performBid();
            }

            if(roundNumber > 3) {
                alert(`No more rounds found...`);
                return;
            }
   
        } 
        
        catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }


    useEffect(() => {

    }, [bidSubmitted])

     /**
         * 
         * @returns : null
         * @method: performBid()
         * @description: This function is responsible for fetching the Virtual Credits from the backend, looping through them using a for each loop, destructuring the opening bid and virtual credits aavailable
         * @description: Finally, it invokes a routine called submit bid which sends off a POST request to the server to store the virtual credits entered by the user
         * @param: null
         */

    const performBid = async () => {

        await axios.get(`http://localhost:5200/api/v1/credits/get-credits`).then(response => {

                const theCreditData = response.data.allCredits;

                setCreditData(theCreditData);
                setCreditsFetched(true);

                if(!theCreditData) {
                    return console.log(`No credit data found`);
                }

                return response.data.allCredits.forEach((creditVal) => {

                    const {openingBid, virtualCredits} = creditVal;

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

       /**
         * 
         * @returns : Returns true OR false depending on the outcome of the pre-condition
         * @method: handleInvalidBidSubmission()
         * @param: convertedBid: The parsed bid to an integer
         * @param: convertedNextRoundBid: The parsed next round bid submitted by the user
         * @param: virtualCredits: The number of virtual credits remaining
         * @param: convertedLastRoundBid: The last round bid placed by the user
         */

    const handleInvalidBidSubmission = function(convertedBid, convertedNextRoundBid, convertedLastRoundBid, virtualCredits) {

        try {

            return (convertedBid > virtualCredits) || convertedNextRoundBid > virtualCredits || convertedLastRoundBid > virtualCredits;
        } 
        
        catch(err) {

            if(err) {

                console.error(err);
                throw new Error(err);
            }
        }

    }

    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: nullkkkkiojoi
         */

    const submitBid = async function(openingBid, virtualCredits) { // Submit Bid. Removed file again and submitting file

        const convertedNextRoundBid = parseInt(nextRoundBid);
        const convertedLastRoundBid = parseInt(lastRoundBid);

    

        if(roundNumber === 1 || roundNumber === 2 || roundNumber === 3) {
            

            const convertedBid = parseInt(bid);

            if(handleInvalidBidSubmission(convertedBid, convertedNextRoundBid, convertedLastRoundBid, virtualCredits)) {
                alert(`Insufficient Virtual Credits. Please bid again`); 
                // Display modal to display insufficient credits
                return;   
            }

            if(convertedLastRoundBid === 0 || convertedNextRoundBid === 0 || convertedBid === 0) {
                alert(`Cannot place a bid of 0`);
                setLastRoundBid("");
            }
    
            setBidValid(true);
            handleUserTurn();
            handleBotTurn();

             if(bidValid) {
 
                 await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {bid: bid, nextRoundBid: nextRoundBid, lastRoundBid: lastRoundBid}).then(response => {
                     const newBidData = response.data;

                     if(!newBidData) {
                        alert(`No data found regarding bids`);
                     }
                    
                     setBids(newBidData);
                     bidData.push({bid, nextRoundBid, lastRoundBid});

                
                     const smallestBid = findMinBid(bid);
                     handleBidSubmission(convertedBid, convertedNextRoundBid, lastRoundBid, virtualCredits, openingBid);

                     return smallestBid;
 
                 }).catch(error => {
 
                     if(error) {

                        console.error(error);
                        throw new Error(error);
                     }
                 })
             }

          
            }
    
        } 


        /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

    function handleUserTurn() {
        return setUserTurn(!userTurn);
    }

    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

    function handleInputBlur() {
        return setUserInputDisabled(true);
    }

  
    function handleBotTurn() {
        return setBotTurn(true);        
    }

    const handleBidSubmission = async function(convertedBid, convertedNextRoundBid, lastRoundBid, virtualCredits, openingBid) {

        try {

            if(roundNumber === 1) {

                clearFields(); // Clear fields first

                let nextRoundCredits = [];
                let creditsLeft = virtualCredits - convertedBid;

                let newResult = creditsLeft;
                virtualCredits = newResult;
            
                userCreditsLeft = {creditsLeft, openingBid};
                openingBid = userCreditsLeft;

                return creditData.map((credit) => { // Loop through the credit data

                    const {_id} = credit; // Extract ID
                   
                     return updateNewBid(_id, virtualCredits, openingBid, lastRoundBid, nextRoundCredits);
                 });
            }

            if(roundNumber === 2) {
            
                return creditData.map((credit) => {

                 let nextRoundCreditsRemain = virtualCredits - convertedNextRoundBid;
                 openingBid = userCreditsLeft;

                if(convertedBid > nextRoundCreditsRemain) {
                    alert(`You cannot place a bid > virtual credits available`);

                    window.location.reload(false);
                }

                    const {_id} = credit;
                    
                    return updateNewBid(_id, nextRoundCreditsRemain, openingBid, virtualCredits);

                })
            }

            if(roundNumber === 3) {
                return processLastRoundRemainingCredits(lastRoundBid, virtualCredits);
            }

            if(roundNumber > MAX_ROUNDS) {
                alert(`Not possible..`);
            }

        }
        
        catch(error) {

            if(error) {
                console.error(error.response.data);
                throw new Error(error);
            }
        }
    }

    const processLastRoundRemainingCredits = (lastRoundBid, virtualCredits) => {
        return creditData.map((credit) => {

            let lastRoundCreditsRemain = virtualCredits - lastRoundBid;

            const {_id} = credit;
            return updateNewBid(_id, lastRoundCreditsRemain, virtualCredits);


        })
    }

    /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

    const updateNewBid = function(_id, virtualCredits, openingBid, nextRoundCreditsRemain, lastRoundCreditsRemain) {

        if(roundNumber === 1) {

            try {
               
                axios.put(`http://localhost:5200/api/v1/credits/update-credits/${_id}`, {_id: _id, virtualCredits: virtualCredits}).then(data => {}).catch(err => {console.log(err)});
                setUpdatedNewBid(true);
               
                const [lowBotData, mediumBotData, intenseBotData] = botBidData;  
                return processBotDataBeforeTurn(lowBotData, mediumBotData, intenseBotData, openingBid, virtualCredits);  
            }
            
             catch(err) {
    
               if(err) {

                const theErr = err.response.data;
    
                console.error(theErr);
                    throw new Error(err);
                }
            }
        }

        if(roundNumber === 2) {
          
            axios.put(`http://localhost:5200/api/v1/credits/update-credits/${_id}`, {_id: _id, virtualCredits: virtualCredits}).then(data => {console.log(data)}).catch(err => {console.log(err)});
          
            setUpdatedNewBid(true);
            const [lowBotData, mediumBotData, intenseBotData] = botBidData;  

            return processBotDataBeforeTurn(lowBotData, mediumBotData, intenseBotData, openingBid, virtualCredits);  
            
        }

        if(roundNumber === 3) {
            axios.put(`http://localhost:5200/api/v1/credits/update-credits/${_id}`, {_id: _id, virtualCredits: virtualCredits}).then(data => {console.log(data)}).catch(err => {console.log(err)});
          
            setUpdatedNewBid(true);
            const [lowBotData, mediumBotData, intenseBotData] = botBidData;  

            return processBotDataBeforeTurn(lowBotData, mediumBotData, intenseBotData, openingBid, virtualCredits);  
            
        }

        if(roundNumber > MAX_ROUNDS) {
            alert(`No more rounds to process`)
        }
      
     } 

     /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

     const processBotDataBeforeTurn = function(lowBotData, mediumBotData, intenseBotData, virtualcredits) {
          
       return botPlaceRandomBid(lowBotData, mediumBotData, intenseBotData);
     }


   useEffect(() => {
       
       
   }, [lowBotWin, mediumBotWin, nextRoundForm, roundNumber, roundTwoOver, lastRoundForm, outOfCredits, biddingOver, userWinBid]);

   /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

   const getVirtualCreditsRemaining = async function(theUserBid) {

    await axios.get(`http://localhost:5200/api/v1/credits/get-credits`).then(response => {

        const virtualCreditsAvailable = response.data.allCredits;

       return virtualCreditsAvailable.forEach((val) => {
        
           let creditsAvailable = val.virtualCredits;

           if(roundNumber === 2) {

            if(creditsAvailable === 0) {
                
                setOutOfCredits(true);
                return;
            }
         
            if(theUserBid > creditsAvailable) {
                 return;
            }


           }
           
        })
     })
   }

   useEffect(() => {

   }, [roundLost, userWinsRoundOne, userWinsNextRound, userTurn, userLost])


   /**
         * 
         * @returns : Returns a string with the total number of bids enclosed by single quotes
         * @method: countTotalBids()
         * @param: null
         */

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

           let lowBotBidAvg = parsedLowBotCredits * 0.65;
           let mediumBotBidAvg = parsedMediumBotCredits * 0.85;
           let intenseBotBidAvg = parsedIntenseBotCredits * 1;

           theLowBots.push(allLowBotData);
           theMediumBots.push(allMediumBotData);
           theIntenseBots.push(allIntenseBotData);

           if((sizeOfLow && sizeOfMedium && sizeOfIntense) > 0) {

               let creditsRemainingObj = {};

            if(!userInputDisabled && botTurn && !userTurn && roundNumber === 1 || roundNumber === 2 || roundNumber === 3) {
             
                setTimeout(() => {

                    handleInputBlur();

                    setTimeout(() => {

                for(let k = 0; k < bidData.length; k++) {

                       const userBidVal = bidData[k].bid;
                       const lastUserBid = bidData[k].lastRoundBid;
                       const theUserBid = parseInt(userBidVal);

                      getVirtualCreditsRemaining(theUserBid);

                      if(!outOfCredits) {
                          setOutOfCredits(false);

                        for(let i = 0; i < numberOfLowBots; i++) {

                         const {name, type} = allLowBotData;
                        
                          let randBid = Math.floor(Math.random() * lowBotBidAvg);
                          let lowBotCreditsLeft = parsedLowBotCredits - randBid;

                          let newLowCredits = lowBotCreditsLeft;
                          
                          creditsRemainingObj = {lowBotCreditsLeft};
                          let theDifference = allLowBotData.botCredits - creditsRemainingObj.lowBotCreditsLeft;
  
                          lowBotCreditsLeft = newLowCredits;
                          convertedBotBid = randBid;
  
                          if(nextRoundBid < randBid && roundNumber === 2) {
                              alert(`You lost against another household. Another household has paid ${randBid} virtual credits and wins the round and receives the timeslot preferences for ${nextAppliance}`);

                              setRoundNumber(roundNumber + 1);
                              getNextAppliance();
                             
                              setRoundTwoOver(!roundTwoOver);
                              setLowBotWin(!lowBotWin);
  
                              setLastRoundForm(!lastRoundForm);
  
                            return;
                          }

                          if(nextRoundBid > randBid && roundNumber === 2) {

                                setTimeout(() => {
                                    setModalShown({title: "Preferences", message: "No preferences found"});

                                    setUserWinsNextRound(true);

                              setRoundNumber(roundNumber + 1);
                              getNextAppliance();
                             
                              setRoundTwoOver(!roundTwoOver);
                              setLowBotWin(!lowBotWin);
  
                              setLastRoundForm(!lastRoundForm);
 
                                }, 1000);
                                
                            return;
                          }

                          if(lastUserBid < randBid && roundNumber === 3) {
                              alert(`Another household has paid ${randBid} for the timeslot preferences for appliance ${lastAppliance} - the auction ends here.`);

                              setRoundNumber(roundNumber + 1);

                              if(roundNumber > MAX_ROUNDS) {
                                  alert(`The auction is over..`);

                                  setTimeout(() => {
                                    return window.location.reload(false);
                                  }, 2000);

                              }

                              return;
                          }

                          
  
                          if(theUserBid < randBid) {
                              
                              setRoundLost(!roundLost);

                              setModalShown({title: "Preferences", message: "No preferences found"});
                              setBiddingOver(true);

                              setTimeout(() => {
                                 
                                  setTimeout(() => {

                                     setModalShown(null);

                                  }, 5000);

                              }, 5000)
                             
  
                              for(const [userKey, userValue] of Object.entries(userCreditsLeft)) { // For every key value pair in the entries of user credits left
  
                                  if(userKey !== undefined && userValue !== undefined) { // if a user key exists
                                  
                                     allBotData.push({...creditsRemainingObj, name, theDifference, userCreditsLeft, theUserBid, type});
                                     allTheBidsData = [...allBotData];
  
                                       setTimeout(() => {
  
                                          setRoundNumber(roundNumber + 1);
                                          getNextAppliance();

                                          setMainRoundOver(!mainRoundOver);
                                          setBiddingOver(!biddingOver);
                                          
                                          setLowBotWin(!lowBotWin);
                                          
                                          setNextRoundForm(!nextRoundForm);

                                          lowBotPlacedBid = true;
                                          return processLowBotBid(convertedBotBid, lowBotPlacedBid, name);
                                           
                                     }, 5000);
            
                          }
  
                               return;
  
                              
                              }
  
                              return;
   
                          }

                          if(theUserBid > randBid && roundNumber === 1) { // if the bid of the user is > low bot bid and we are in round 1
                            setUserWinsRoundOne(true);

                            setTimeout(() => {
                                return alert(`You have won round ${roundNumber} - you have paid ${theUserBid} virtual credits for the timeslots associated with the appliance ${appliance}`)
                            }, 1000)

                            setUserWinBid(!userWinBid);

                            setRoundNumber(roundNumber + 1);
                          
                            setMainRoundOver(!mainRoundOver);
                            getNextAppliance();

                            return;
                     }


                        }
                      }
                }

                if(roundNumber === 1 || (roundNumber === 2) || (roundNumber === 3) && (userTurn && botTurn)) {

                     setTimeout(() => {

                             let medBotCreditsRemain = {};
      
                              for(let index = 0; index < bidData.length; index++) {

                                 const userBid = parseInt(bidData[index].bid);
                                 
                              for(let i = 0; i < numberOfMediumBots; i++) {
      
                                  const {name, type, botCredits} = allMediumBotData;
      
                                  let mediumBotRandomBids = Math.floor(Math.random() * mediumBotBidAvg);
                                  let mediumBotCreditsRemaining = parsedMediumBotCredits - mediumBotRandomBids;
                                  let medCredsLeft = mediumBotCreditsRemaining;
      
                                  convertedBotBid = mediumBotRandomBids;
                                  medBotCreditsRemain = {medCredsLeft};
                                  let medBotDifference = parsedMediumBotCredits - medBotCreditsRemain.medCredsLeft;

                                  if(nextRoundBid < mediumBotRandomBids) {
                                      alert(`You lost against another household. The household paid ${mediumBotRandomBids} virtual credits for the timeslot preferences for ${appliance}`);

                                    setUserLost(true);
                                    setRoundNumber(roundNumber + 1);
                                    getNextAppliance();

                                    setBiddingOver(!biddingOver);
                                   
                                    setRoundTwoOver(!roundTwoOver);
                                    setNextRoundBid("");
        
                                    setMediumBotWin(!mediumBotWin);
                                    setLastRoundForm(!lastRoundForm);

                                }

                                if(nextRoundBid > mediumBotRandomBids && roundNumber === 2) {
                                    alert(`You won round ${roundNumber} against another household`);
                                }
                            
                                    if(userBid < mediumBotRandomBids) {

                                        setModalShown({title: "Preferences", message: "No preferences found"});
                                        setBiddingOver(true);
          
                                        allBotData.push({...medBotCreditsRemain, medBotDifference, userCreditsLeft, userBid});
                                        allTheBidsData = [...allBotData];

                                           setTimeout(() => {

                                            setRoundNumber(roundNumber + 1);
                                            getNextAppliance();
                                    
                                            setMainRoundOver(true);
                                            setMediumBotWin(true);

                                            return;
                                           
                                         }, 5500);

                                         return;

                                      }
                                  
                                      if(type === botTypes.MEDIUM && botCredits > 0 && name != null && (userBid > mediumBotRandomBids)) {

                                        setModalShown({title: "Preferences", message: "No preferences found"});

                                            setBiddingOver(true);

                                            setTimeout(() => {
                                                
                                                setTimeout(() => {

                                                    setModalShown(null);

                                                }, 5500);

                                            }, 5000)

                                            allBotData.push({...medBotCreditsRemain, medBotDifference, userCreditsLeft, userBid});
                                            allTheBidsData = [...allBotData];


                                          setTimeout(() => {
                                           
                                        if(mediumBotRandomBids !== 0 && !(userBid) < mediumBotRandomBids) {

                                             setModalShown({title: "Preferences", message: "No preferences found"});
                                                setBiddingOver(true);

                                                setTimeout(() => {
                                                    
                                                    setTimeout(() => {

                                                        setModalShown(null);

                                                    }, 5500);

                                                }, 4500);


                                                allBotData.push({...medBotCreditsRemain, medBotDifference, userCreditsLeft, userBid});
                                                allTheBidsData = [...allBotData];
                             

                                           setMediumBotWin(!mediumBotWin); 
                                           processMediumBotBids(mediumBotRandomBids, name, type, mediumBotCreditsLeft);                                         

                                           getNextAppliance();
                                           setRoundNumber(roundNumber + 1);

                                          return;
                                           }
           
                                          }, 4500)
           
                                      }  
                              }

                            if(!mediumBotWin && !lowBotWin) {

                                setTimeout(() => {
                                    let intenseCreditsLeftObj;

                            for(let i = 0; i < bidData.length; i++) {

                                    const nextUserBid = parseInt(bidData[i].bid);

                                 for(let i = 0; i < numberOfIntenseBots; i++) {

                                    const {name, type, botCredits} = allIntenseBotData;

                                    if(!name || !type || !botCredits) {
                                        console.log(`Could not find data`);
                                    }

                                let intenseBotBid = Math.floor(Math.random() * intenseBotBidAvg);

                                let intenseBotCreditsRemaining = parsedIntenseBotCredits - intenseBotBid;
                                let intenseBotCreditsLeft = intenseBotCreditsRemaining;

                                convertedBotBid = intenseBotBid
                                intenseCreditsLeftObj = {intenseBotCreditsLeft};
                                let intenseBotDifference = parsedIntenseBotCredits - intenseCreditsLeftObj.intenseBotCreditsLeft;

                                if(nextUserBid < intenseBotBid) {
                                    
                                    setModalShown({title: "Preferences", message: "No preferences found"});
                                    setBiddingOver(true);

                                    setUserLost(true);

                                    setTimeout(() => {
                                       
                                        setTimeout(() => {
                                           setModalShown(null);
                                        }, 3000);


                                    getNextAppliance();
                                    setRoundNumber(roundNumber + 1);

                                    }, 2000)
                                   

                                    allBotData.push({...creditsRemainingObj, intenseBotDifference, userCreditsLeft, userBid});
                                    allTheBidsData = [...allBotData];

                                    setModalShown(null);

                                    return;

                                }

                                if(userBid > intenseBotBid) {

                                    setModalShown({title: "Preferences", message: "No preferences found"});
                                    setBiddingOver(true);
      
                                    allBotData.push({userBid: userBid});
                                    allTheBidsData = [...allBotData];

                                    setTimeout(() => {
                                   
                                        getNextAppliance();
                                        setRoundNumber(roundNumber + 1);
                                        
                                        setNextRoundForm(true);
                                        setLastRoundForm(false);

                                        setModalShown(null);
                                       
                                    }, 3000);

                                    setModalShown(null);
                                  
                                }

                                return;

                              
                                 }
            
                                }
    
    
                                }, 1000)
            
                            }

                          }


                         }, 1000)
                      }

                }, 1000); 


                }, 1000);
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

    }

    useEffect(() => {

    }, [results]);



        /**
     * 
     * @returns : String
     * @method: findMaxBetween()
     * @description: This function is used to find the maximum bid placed between the user and other households.
     * @description: This routine deals with mutability. The maximum bid is stored in the variable maxBidBetween and is returned
     * @param: null
     */



    const findMaxBetween = function() {

        let maxBidBetween = 0;

            for(let i = 0; i < allTheBidsData.length; i++) {

                const lowBotBid = parseInt(allTheBidsData[i].theDifference);
                const medBotBid = parseInt(allTheBidsData[i].medBotDifference);

                const intenseBotBid = parseInt(allTheBidsData[i].intenseBotDifference);
                const userBid = parseInt(allTheBidsData[i].userBid);

                if(lowBotBid > maxBidBetween) {
                    maxBidBetween = lowBotBid;                    
                }

                if(medBotBid > maxBidBetween) {
                    maxBidBetween = medBotBid;
                }

                if(intenseBotBid > maxBidBetween) {
                    maxBidBetween = intenseBotBid;
                
                }

                if(userBid > maxBidBetween) { // If user bid > max bid
                    maxBidBetween = userBid;
                }
    
                return `Round ${roundNumber} - the winning bidder placed a round wining bid of ${maxBidBetween} and receives the timeslots ${firstPreference} ${secondPreference} and ${thirdPreference} for the appliance ${appliance}`;
            } 

    }

    useEffect(() => {
       
    }, [lastApplianceSet])

         /**
         * 
         * @returns : null
         * @method: connectDB()
         * @description: Asynchronous Function fetches the next and last appliance that has been submitted by the user. It loops through the end of an array after fetching the preferences using axios and sending a GET request.
         * @description: It returns the last appliance by slicing the last index in the array and pushing it into another array
         * @param: null
         */

      const getNextAppliance = async () => {

        try {
     
            await axios.get(`http://localhost:5200/api/v1/preferences/fetch-preferences`).then(response => {
               let data = response.data.preferences;

               for(let i = 0; i < data.length - 1; i ++) {

                let nextAppliance = data.slice(-1)[0].nextAppliance;
                let lastAppliance = data.slice(-1)[0].lastAppliance;
                
                remainingAppliances.push(nextAppliance);
                lastRemainingAppliance.push(lastAppliance);

               }

               for(let k = 0; k < remainingAppliances.length - 1; k++) {

                 if(nextApplianceData.indexOf(remainingAppliances[k]) === -1) {

                     nextApplianceData.push(remainingAppliances[k]);
                 }

                }

                for(let i = 0; i < lastRemainingAppliance.length - 1; i++) {

                    if(lastApplianceData.indexOf(lastRemainingAppliance[i]) === -1) {

                        lastApplianceData.push(lastRemainingAppliance[i]);
                       
                        lastApplianceData.forEach((lastOne) => {

                            lastAppliance = lastOne;
                            setLastApplianceSet(true);
                           
                        })

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
                console.log(err);

                throw new Error(err);
            }
        }
    }

    const processLowBotBid = async function(convertedBotBid, lowBotPlacedBid, name) {

        try {

           await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {bid: convertedBotBid, username: name}).then(response => {
               console.log(`INSIDE PROCESS LOW BOT BID`);
             
           if(lowBotPlacedBid) {

               const botBid = response.data.newBid.bid;
               const botName = response.data.newBid.username;

               if(bid != null && username != null) {

                allBotBids.push(bid, username);
                results.push({winningBid: convertedBotBid, name});

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

          
        }).catch(err => {  

            if(err) {
                return console.log(err.response.data);
            }
        })
    }

     
    const modalHandler = () => {
        setTimeout(() => {
            {modalShown && setModalShown(null)}
        }, 2000)
    }

    const displayNextRoundWinner = () => {
        return `You win the round. You have paid ${nextRoundBid} virtual credits for the timeslots`;
    }

    return (

        <React.Fragment>

    <section className = "section--login">

          <h1 className = "fn--heading">Choose Algorithm</h1>
         
        <div className = "container grid grid--2-cols">
            <button onClick = {chosenEnglishAuctionHandler} className = "auction--btn">Auction</button>
            <button onClick = {chosenSocialExchangeHandler} className = "social--btn">Social Exchange</button>
        </div>

        {socialExchangeChosen ? alert(`Chosen Social Exchange`) : null}

        {auctionChosen ?
            <div className = "appliance--data">
            <button className = "start--auction" onClick = {beginLiveAuctionHandler} >Begin</button>
        </div>
     : null}

     {auctionStarted ? 
        <div className = "appliance--data">

        <div>

            <h1>Seconds Remaining: {seconds}</h1>

             {!mainRoundOver && roundNumber === 1 ? <h1 className = "first--pref">Submit Bid For {appliance} for the timeslots {firstPreference} - {secondPreference} - {thirdPreference}</h1> : null }
             
             {userLost ? <Modal title = "Round Winner" message = {displayNextRoundWinner()} onClick = {modalHandler}/> : null}

             {roundNumber === 2 ? <h1 className = "first--pref">Submit Bid For {nextAppliance} for the timeslots {firstPreference} - {secondPreference} - {thirdPreference}</h1> : null}
             {roundNumber === 3 ? <h1 className = "first--pref">Submit Bid For {lastAppliance}</h1> : null}

            <h1>{findMaxBid()}</h1>
            <h1>{countTotalBids()}</h1>

            {modalShown && roundNumber === 1 ? <Modal title = "Round Winner" message = {findMaxBetween()} /> : null}

            {creditData.map((credit, key) => {
                const credits = credit;

                return <div key = {key}>

                <h1>Virtual Credits Remaining: {updatedNewBid ? credits.virtualCredits : credits.virtualCredits}</h1>
             
            </div>

            })}


            <h1 style = {{marginBottom: '90px'}}>Round: {roundNumber}</h1>

            {nextRoundForm ? <div className = "container grid grid--2-cols">
          

<RegisterCard>

        <h1 className = "bid--header">Submit Bid</h1>

    <form id = "bidForm" className = "login--form" onSubmit = {submitBidHandler} method = "POST">

        <div className = "bid--container">

        <label className = "bid--lbl">Bid</label>

            {roundNumber === 2 && userInputDisabled && roundNumber !== 3 && !roundTwoOver ? 
                <input value = {nextRoundBid} onChange = {(event) => {setNextRoundBid(event.target.value)}} placeholder = "Enter Round Bid" id = "bid" type = "text"/>
        
            :
        
            <input value = {lastRoundBid} onChange = {(event) => {setLastRoundBid(event.target.value)}} placeholder = "Enter Round Bid" id = "bid" type = "text" /> }

          
        </div>


        <div className = "submit-bid--container">
            <button className = "login--btn">Submit</button>
        </div>

    </form> 

        </RegisterCard>  

        </div>
                    
            
             :
                    
             <div className = "container grid grid--2-cols">

        <RegisterCard>
                <h1 className = "bid--header">Submit Bid</h1>

            <form id = "bidForm" className = "login--form" onSubmit = {submitBidHandler} method = "POST">

                <div className = "bid--container">

                <label className = "bid--lbl">Bid</label>

            {roundNumber === 1 && userInputDisabled && roundNumber !== 2 && roundNumber !== 3  && lastRoundForm ? 
        
            <input value = {bid} onChange = {(event) => {setBid(event.target.value)}} placeholder = "Enter your Round Bid" id = "bid" type = "hidden" /> :
            
            <input value = {bid} onChange = {(event) => {setBid(event.target.value)}} placeholder = "Enter your Round Bid" id = "bid" type = "text"/> }

          
        </div>


        <div className = "submit-bid--container">
            <button className = "login--btn">Submit</button>
        </div>

    </form> 

</RegisterCard>  


</div>

}

     </div> 

     

        </div>
        

: undefined }

    
            {mainRoundOver ? results.map((win, key) => {

                return <div key = {key}>
                    <h1>Round {roundNumber - 1} results - another household spent {win.winningBid} credits for {appliance}</h1>
                </div>

            }) : null}


        
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