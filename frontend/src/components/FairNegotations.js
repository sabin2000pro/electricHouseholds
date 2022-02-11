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

const FairNegotations = (props) => {

    let location = useLocation();
    let history = useHistory();
    let {_id, username, appliance, firstPreference, secondPreference, thirdPreference, nextAppliance, lastAppliance} = location.state.preference;

    const [auctionStarted, setAuctionStarted] = useState(false);
    const [botTypes, setBotTypes] = useState({LOW: 'Low', MEDIUM: 'Medium', INTENSE: 'Intense'})
    const [roundNumber, setRoundNumber] = useState(1);
    const [timerRunning, setTimerRunning] = useState(false);
    const [seconds, setSeconds] = useState(START_TIMER);

    const [bidValid, setBidValid] = useState(false);
    const [updatedNewBid, setUpdatedNewBid] = useState(false);
    const [clearedBids, setClearedBids] = useState(false);
   
    let [userInputDisabled, setUserInputDisabled] = useState(false);
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
    const [roundTwoOver, setRoundTwoOver] = useState(false);

    const [lastRoundOver, setLastRoundOver] = useState(false);

    const [feedbackData, setFeedbackData] = useState([]);
    const [bids, setBids] = useState([]);
    const [botData, setBotData] = useState([]);

    const [userBidData, setUserBidData] = useState([]);
    const [creditData, setCreditData] = useState([]);
    const [creditsFetched, setCreditsFetched] = useState(false);
   
    const [roundOver, setRoundOver] = useState(false);
    const [biddingOver, setBiddingOver] = useState(false);
    const [lowBotWin, setLowBotWin] = useState(false);
    const [mediumBotWin, setMediumBotWin] = useState(false);
    const [intenseBotWin, setIntenseBotWin] = useState(false);
   
    const [modalShown, setModalShown] = useState();

    let [userCreditsLeft, setUserCreditsLeft] = useState({});

    const [nextRoundBid, setNextRoundBid] = useState('');
    const [lastRoundBid, setLastRoundBid] = useState('');

    const [userWinBid, setUserWinBid] = useState(false);
    const [nextRoundForm, setNextRoundForm] = useState(false);
    const [lastRoundForm, setLastRoundForm] = useState(false);
    const [lastApplianceSet, setLastApplianceSet] = useState(false);
    const [outOfCredits, setOutOfCredits] = useState(false);
    const [feedbackFormDisplay, setFeedbackFormDisplay] = useState(false);
    const [results, setResults] = useState([]);

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
                        alert(`You are not allowed to start bidding because no households to bid against are found`)
                    }, 2000)
                }

                 if(botDataLength !== 0) {

                    setBotData(theBotData);

                    for(let i = 0; i < theBotData.length - 1; i++) {
                        const botTypes = theBotData[i].type;

                        if(!botTypes.includes(availableTypesOfBots[0]) && !botTypes.includes(availableTypesOfBots[1]) && !botTypes.includes(availableTypesOfBots[2])) {

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
           
            if(roundNumber === 1) {
                performBid();
            }

            if(roundNumber === 2) {
              
                performBid();
            }
            if(roundNumber === 3) {
                alert(`In Round Final`);
                performBid();
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

    const submitBid = async function(openingBid, virtualCredits) {
        const convertedNextRoundBid = parseInt(nextRoundBid);

        if(roundNumber === 1 || roundNumber === 2) {
            const convertedBid = parseInt(bid);
            
            if(processOpeningBid(openingBid, convertedBid)) {
                alert(`Entered bid cannot be the same as the opening bid`);
                
                window.location.reload(false);
                clearFields();
                setSeconds(FLAGS.DEFAULT);
            }
            
            setBidValid(true);
            handleUserTurn();
            handleBotTurn();

             if(bidValid) {
 
                 await axios.post(`http://localhost:5200/api/v1/bids/create-bid`, {bid: bid, nextRoundBid: nextRoundBid}).then(response => {
                     const newBidData = response.data;


                     if(!newBidData) {
                        alert(`No data found regarding bids`);
                     }
                    
                     setBids(newBidData);
                     bidData.push({bid, nextRoundBid});

                   
                     const smallestBid = findMinBid(bid);
                     handleBidSubmission(convertedBid, convertedNextRoundBid, virtualCredits, openingBid);

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


    function handleUserTurn() {
        return setUserTurn(!userTurn);
    }

    function handleInputBlur() {
        return setUserInputDisabled(true);
    }

    function handleBotTurn() {
        return setBotTurn(true);        
    }

    const handleBidSubmission = async function(convertedBid, convertedNextRoundBid, virtualCredits, openingBid) {

        try {


            if(roundNumber === 1) {
                clearFields();
                let nextRoundCredits = [];
         
                let creditsLeft = virtualCredits - convertedBid;

                let newResult = creditsLeft;
                virtualCredits = newResult;
            
                userCreditsLeft = {creditsLeft, openingBid};
                openingBid = userCreditsLeft;


                return creditData.map((credit) => {

                    const {_id} = credit; // Extract ID
                   
                     return updateNewBid(_id, virtualCredits, openingBid, convertedNextRoundBid, nextRoundCredits);
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


            }
        
        catch(error) {

            if(error) {
                console.error(error.response.data);
                throw new Error(error);
            }
        }
    }

    // Routine that updates the number of virtual credits left
    const updateNewBid = function(_id, virtualCredits, openingBid, nextRoundCreditsRemain) {


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
      
     } 

     const processBotDataBeforeTurn = function(lowBotData, mediumBotData, intenseBotData, openingBid, virtualcredits) {
          
       return botPlaceRandomBid(lowBotData, mediumBotData, intenseBotData, openingBid);
     }

   useEffect(() => {
       
       
   }, [lowBotWin, mediumBotWin, nextRoundForm, roundNumber, roundTwoOver, lastRoundForm, outOfCredits, biddingOver, userWinBid]);

   const getVirtualCreditsRemaining = async function(theUserBid) {

    await axios.get(`http://localhost:5200/api/v1/credits/get-credits`).then(response => {
        const virtualCreditsAvailable = response.data.allCredits;

        virtualCreditsAvailable.forEach((val) => {
        
           let creditsAvailable = val.virtualCredits;

    
           if(roundNumber === 2) {

            if(creditsAvailable === 0) {
              
                return;
            }
         

            if(theUserBid > creditsAvailable) {
                 return;
            }

           }
           
        })
     })
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

           let lowBotBidAvg = parsedLowBotCredits * 0.10;
           let mediumBotBidAvg = parsedMediumBotCredits * 0.30;
           let intenseBotBidAvg = parsedIntenseBotCredits * 0.80;

           theLowBots.push(allLowBotData);
           theMediumBots.push(allMediumBotData);
           theIntenseBots.push(allIntenseBotData);

           if((sizeOfLow && sizeOfMedium && sizeOfIntense) > 0) {
               let creditsRemainingObj = {};

            if(!userInputDisabled && botTurn && !userTurn && roundNumber === 1 || roundNumber === 2) {

             
                setTimeout(() => {

                    handleInputBlur();

                    setTimeout(() => {

                for(let k = 0; k < bidData.length; k++) {

                       const userBidVal = bidData[k].bid;
                       const theUserBid = parseInt(userBidVal);

                      getVirtualCreditsRemaining(theUserBid);

                      if(!outOfCredits) {

                        for(let i = 0; i < numberOfLowBots; i++) {

                            const {name, type} = allLowBotData;
                            let isBetweenAvg = false;
                          
                          let randBid = Math.floor(Math.random() * lowBotBidAvg);
                          let lowBotCreditsLeft = parsedLowBotCredits - randBid;
                          let newLowCredits = lowBotCreditsLeft;
                          let nextApplianceRound;
  
                          creditsRemainingObj = {lowBotCreditsLeft};
                          let theDifference = allLowBotData.botCredits - creditsRemainingObj.lowBotCreditsLeft;
  
                          lowBotCreditsLeft = newLowCredits;
                          convertedBotBid = randBid;
  
                        nextApplianceData.forEach((nextApp) => {
  
                          nextApplianceRound = nextApp;
  
                          if(nextRoundBid < randBid && roundNumber === 2) {
                            alert(`You lose the second round`);

                            setRoundNumber(roundNumber + 1);
                            getNextAppliance();

                              setRoundTwoOver(true);
                              setLastRoundForm(true);
                              setNextRoundBid("");
  
                              setLowBotWin(!lowBotWin);
                              setLastRoundForm(!lastRoundForm);
                              
  
                             
  
                              return;
  
                          }
  
                          return;
  
                          })
  
                          if(nextRoundBid > randBid && roundNumber === 2) {
                              alert(`You win the second round`);
                             
                              setRoundTwoOver(true);
                              setLowBotWin(false);
  
                              setLastRoundForm(true);
  
                              continue;
                          }
  
  
                          if(theUserBid < randBid) {
  
                              setModalShown({title: "Preferences", message: "No preferences found"});
                              setBiddingOver(true);

                              setTimeout(() => {
                                 
                                  setTimeout(() => {
                                     setModalShown(null);
                                  }, 4500);
                              }, 4000)
                             
  
                              for(const [userKey, userValue] of Object.entries(userCreditsLeft)) { // For every key value pair in the entries of user credits left
  
                                  if(userKey !== undefined && userValue !== undefined) { // if a user key exists
                                  
                                     allBotData.push({...creditsRemainingObj, name, theDifference, userCreditsLeft, theUserBid, type});
                                     allTheBidsData = [...allBotData];
  
                                       setTimeout(() => {
  
                                          setRoundNumber(roundNumber + 1);
                                          
                                          setLowBotWin(true);
                                          setMainRoundOver(true);
                                          getNextAppliance();
                                          setNextRoundForm(true);
  
                                         return;
                                         
                                       }, 3000);
  
                                     
                if(theUserBid > randBid) {

                    setUserWinBid(true);
  
  
                      // eslint-disable-next-line no-loop-func
                      setTimeout(() => {
  
                          lowBotPlacedBid = true;
                           processLowBotBid(convertedBotBid, lowBotPlacedBid, name);
  
                           setLowBotWin(false);
                          
                      }, 4500)
  
              }
  
  
                          }
  
                               return;
  
                              
                              }
  
                              return;
   
  
                          }
  
  
                        }
                      }
                }

                if(roundNumber === 1 || (roundNumber === 2) && (userTurn && botTurn)) {
                    

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

                                  if(nextRoundBid < mediumBotRandomBids && roundNumber === 2) {
                                    setBiddingOver(true);
                                   
                                    setRoundTwoOver(true);
                                    setNextRoundBid("");
        
                                    setMediumBotWin(true);
                                    setRoundNumber(roundNumber + 1);
                                    setLastRoundForm(true);
                                    

                                    if(mediumBotWin) {

                                       setTimeout(() => {

                                           return;

                                     }, 4500)

                                    }
        
        
                                    return;
        
                                }
                            
                                    if(userBid < mediumBotRandomBids) {

                                        setModalShown({title: "Preferences", message: "No preferences found"});
                                        setBiddingOver(true);
          
                                        setTimeout(() => {
                                           
                                            setTimeout(() => {
                                               setModalShown(null);
                                            }, 4500);
                                        }, 4000)
                                       
                                   
                                           allBotData.push({...medBotCreditsRemain, medBotDifference, userCreditsLeft, userBid});
                                           allTheBidsData = [...allBotData];

                                           setTimeout(() => {

                                            setRoundNumber(roundNumber + 1);
                                            setMainRoundOver(true);
                                            setMediumBotWin(true);

                                            return;
                                           
                                         }, 4500);

                                         return;

                                      }
                                  
                                      if(type === botTypes.MEDIUM && botCredits > 0 && name != null && (userBid > mediumBotRandomBids)) {

                                        setModalShown({title: "Preferences", message: "No preferences found"});
                                            setBiddingOver(true);

                                            setTimeout(() => {
                                                
                                                setTimeout(() => {

                                                    setModalShown(null);

                                                }, 4500);

                                            }, 4000)

                                            allBotData.push({...medBotCreditsRemain, medBotDifference, userCreditsLeft, userBid});
                                            allTheBidsData = [...allBotData];

                                            
                                    
                                          setTimeout(() => {
                                           
                                        if(mediumBotRandomBids !== 0 && !(userBid) < mediumBotRandomBids) {
                                           processMediumBotBids(mediumBotRandomBids, name, type, mediumBotCreditsLeft);

                                             setModalShown({title: "Preferences", message: "No preferences found"});
                                                setBiddingOver(true);

                                                setTimeout(() => {
                                                    
                                                    setTimeout(() => {

                                                        setModalShown(null);

                                                    }, 4500);

                                                }, 4000)

                                                allBotData.push({...medBotCreditsRemain, medBotDifference, userCreditsLeft, userBid});
                                                allTheBidsData = [...allBotData];
                             

                                           setMediumBotWin(!mediumBotWin);                                          

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

                                      for(let index = 0; index < bidData.length; index++) {

                                    const userBid = parseInt(bidData[index].bid);

                                    
                                 for(let i = 0; i < numberOfIntenseBots; i++) {
                                
                                let intenseBotBid = Math.floor(Math.random() * intenseBotBidAvg);

                                let intenseBotCreditsRemaining = parsedIntenseBotCredits - intenseBotBid;
                                let intenseBotCreditsLeft = intenseBotCreditsRemaining;

                                convertedBotBid = intenseBotBid
                                intenseCreditsLeftObj = {intenseBotCreditsLeft};
                                let intenseBotDifference = parsedIntenseBotCredits - intenseCreditsLeftObj.intenseBotCreditsLeft;

                                if(userBid < intenseBotBid) {
                                    setModalShown({title: "Preferences", message: "No preferences found"});
                                    setBiddingOver(true);
      
                                    setTimeout(() => {
                                       
                                        setTimeout(() => {
                                           setModalShown(null);
                                        }, 3000);

                                    }, 2000)
                                   

                                    allBotData.push({...creditsRemainingObj, intenseBotDifference, userCreditsLeft, userBid});
                                    allTheBidsData = [...allBotData];

                 

                                }

                                if(userBid > intenseBotBid) {
                                    setModalShown({title: "Preferences", message: "No preferences found"});
                                    setBiddingOver(true);
      
                                    setTimeout(() => {
                                       
                                        setTimeout(() => {
                                           setModalShown(null);
                                        }, 4500);
                                    }, 4000)
                                   
                                
                                    allBotData.push({userBid: userBid});
                                    allTheBidsData = [...allBotData];

                                  
                                    setTimeout(() => {
                                   
                                        getNextAppliance();
                                        setRoundNumber(roundNumber + 1);
                                        
                                        setNextRoundForm(true);
                                        setLastRoundForm(false);
                                       
                                    }, 3000)
                                  
                                }

                              
                                 }
            
                                }
    
    
                                }, 2000)
            
                            }

                          }


                         }, 1300)
                      }

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

    }

    useEffect(() => {

    }, [results]);

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

                if(userBid > maxBidBetween) {
                    maxBidBetween = userBid;
                }
    
    
                 
                return `Round ${roundNumber} - the winning bidder placed a round wining bid of ${maxBidBetween} and receives the timeslots ${firstPreference} ${secondPreference} and ${thirdPreference} for the appliance ${appliance}`;
            } 
    
        
    }

    useEffect(() => {
       
    }, [lastApplianceSet])

      const getNextAppliance = async function() {

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

          
        }).catch(err => {  

            if(err) {
                return console.log(err.response.data);
         }
        })
    }

    const submitFeedbackHandler = async (event) => {
        try {

            event.preventDefault();
            
            const {data} = await axios.post(`http://localhost:5200/api/v1/feedback/create-feedback`, {feedbackUsername: enteredFeedbackUsername, feedbackEmailAddress: enteredFeedbackEmailAddress, feedbackFeeling: chosenFeedbackFeeling, feedbackDescription: enteredFeedbackDescription});

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
            // 3rd Algorithm
        } 
        
        catch(error) {

            if(error) {

                console.error(error);
                throw new Error(error);
            }
        }

    }

    // Routine invoked to display the winner.
    const viewResultsHandler = () => {
        try {
            console.log(`Inside the view results handler`);
        } 
        
        catch(err) {

            if(err) {
                console.log(err);
                throw new Error(err);
               
            }
        }
    }

    
    return (

        <React.Fragment>

    <section className = "section--login">

          <h1 className = "fn--heading">Choose Your Desired Algorithm Below</h1>

         
        <div className = "container grid grid--2-cols">
            <button onClick = {chosenEnglishAuctionHandler} className = "auction--btn">First Priced Sealed Bid </button>
            <button onClick = {chosenSocialExchangeHandler} className = "social--btn">Social Exchange</button>
        </div>

        {auctionChosen ?
            <div className = "appliance--data">
            <button className = "start--auction" onClick = {beginLiveAuctionHandler} >Begin</button>
        </div>
     : null}

     {auctionStarted ? 
        <div className = "appliance--data">

        <div>

            <button className = "household--btn" type = "submit">View Household Bid Data</button>

            <h1>Username: {username} </h1>
            <h1>Bidding Seconds: {seconds}</h1>


             {!mainRoundOver && roundNumber === 1 ? <h1 className = "first--pref">First Chosen Preference : {firstPreference}</h1> : null }
             {!mainRoundOver && roundNumber === 1 ? <h1 className = "first--pref">Next Chosen Preference : {secondPreference}</h1> : null }
             {!mainRoundOver && roundNumber === 1 ?  <h1 className = "first--pref">Last Chosen Preference : {thirdPreference}</h1> : null }


            <h1>{findMaxBid()}</h1>
            <h1>{countTotalBids()}</h1>

            {modalShown && roundNumber === 1 ? <Modal title = "Round Winner" message = {findMaxBetween()} /> : null}


            {creditData.map((credit, key) => {
                const credits = credit;

                return <div key = {key}>

                <h1>User Virtual Credits Remaining: {updatedNewBid ? credits.virtualCredits : credits.virtualCredits}</h1>
             
            </div>

            })}

            {!mainRoundOver ? <h2 >User's Initial Appliance : {appliance}</h2> : null}

            {mainRoundOver && roundNumber === 2 ? nextApplianceData.map((val, key) => {
               return <div key = {key}>
               <h1>Your next appliance {val}</h1>
               </div>

            }) : null}

            {roundTwoOver ? lastApplianceData.map((val, key) => {
              
                return <div key = {key}>

               <h1>Your last appliance {val}</h1>

               </div>

            }) : null}
      
            <h1 style = {{marginBottom: '90px'}}>Round Number : {roundNumber}</h1>

            {nextRoundForm ? <div className = "container grid grid--2-cols">
          

<RegisterCard>
        <h1 className = "bid--header">Submit Round Bid</h1>

    <form id = "bidForm" className = "login--form" onSubmit = {submitBidHandler} method = "POST">

        <div className = "bid--container">

        <label className = "bid--lbl">Round Bid</label>

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
                <h1 className = "bid--header">Submit Round Bid</h1>

            <form id = "bidForm" className = "login--form" onSubmit = {submitBidHandler} method = "POST">

                <div className = "bid--container">

                <label className = "bid--lbl">Round Bid</label>

            {roundNumber === 1 && userInputDisabled && roundNumber !== 2 && roundNumber !== 3  && lastRoundForm ? 
        
            <input value = {bid} onChange = {(event) => {setBid(event.target.value)}} placeholder = "Enter your Round Bid" id = "bid" type = "hidden" /> :
            
            <input value = {bid} onChange = {(event) => {setBid(event.target.value)}} placeholder = "Enter your Round Bid" id = "bid" type = "text"/> }

          
        </div>


        <div className = "submit-bid--container">
            <button className = "login--btn">Submit</button>
        </div>

    </form> 

</RegisterCard>  


</div>}

        
        </div> 

        </div>

: undefined }


 {/* <div className = "container grid grid--2-cols">

        <RegisterCard>
                <h1 className = "bid--header">Submit Round Bid</h1>

            <form id = "bidForm" className = "login--form" onSubmit = {submitBidHandler} method = "POST">

            </form>

            </RegisterCard>

            </div> */}
            

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