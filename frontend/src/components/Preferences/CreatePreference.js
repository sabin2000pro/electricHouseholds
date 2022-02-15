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



/* eslint-disable no-lone-blocks */
import React, {useState, Fragment, useEffect} from 'react';
import './CreatePreference.css';
import {Link, useHistory} from 'react-router-dom';
import RegisterCard from '../Admin/RegisterCard';
import axios from 'axios';
import Modal from '../../UI/Modal';

let DEFAULT_TEXT = {
    preferenceHeader: 'Your Preferences'
}

const applianceNames = [];

let otherPreferences = [

    {
      firstOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
      secondOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
      thirdOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
    }
  
  ];

  let filteredAppliances = [];
  let newAppliance = [];
  let newLastAppliance = [];
  let sanitizedInputs = [];

const CreatePreference = (props) => {
    let history = useHistory();
    const [enteredUsername, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [firstApplianceFound, setFirstApplianceFound] = useState(false);

    const [otherFirstPref, setOtherFirstPref] = useState('');
    const [otherSecondPref, setOtherSecondPref] = useState('');
    const [otherThirdPref, setOtherThirdPref] = useState('');

    const [chosenFirstPreference, setChosenFirstPreference] = useState("");
    const [chosenSecondPreference, setChosenSecondPreference] = useState("");
    const [chosenThirdPreference, setChosenThirdPreference] = useState("");

    const [appliances, setAppliances] = useState([]); // Array of appliances
    const [preferences, setPreferences] = useState([]);
    const [formValid, setFormValid] = useState(true);
    const [applianceFound, setApplianceFound] = useState(false);

    const [preferencesBtnClicked, setPreferencesBtnClicked] = useState(false);
    const [preferenceSubmitted, setPreferenceSubmitted] = useState(false);
    const [modalShown, setModalShown] = useState();
    const [showForm, setShowForm] = useState(true);
    const [showOkBtn, setShowOkBtn] = useState(true);

    const [enteredCommentTitle, setEnteredCommentTitle] = useState('');
    const [enteredCommentUsername, setEnteredCommentUsername] = useState('');
    const [enteredCommentReason, setEnteredCommentReason] = useState('');
    const [enteredCommentDescription, setEnteredCommentDescription] = useState('');

    const [enteredCommentTitleValid, setEnteredCommentTitleValid] = useState(true);
    const [enteredCommentUsernameValid, setEnteredCommentUsernameValid] = useState(true);
    const [enteredCommentReasonValid, setEnteredCommentReasonValid] = useState(true);
    const [enteredCommentDescriptionValid, setEnteredCommentDescriptionValid] = useState(true);

    const [firstApplianceData, setFirstApplianceData] = useState([]);

    let [nextApplianceData, setNextApplianceData] = useState([]);
    let [lastApplianceData, setLastApplianceData] = useState([]);

    const [chosenNextAppliance, setChosenNextAppliance] = useState('');
    const [chosenLastAppliance, setChosenLastAppliance] = useState('');

    const [nextApplianceDataInserted, setNextApplianceDataInserted] = useState(false);
    const [lastApplianceDataInserted, setLastApplianceDataInserted] = useState(false);
    const [chosenAppliance, setChosenAppliance] = useState("");

    const [lastApplianceFound, setLastApplianceFound] = useState(false);
    const [secondPrefSubmitted, setSecondPrefSubmitted] = useState(false);
    const [lastPrefSubmitted, setLastPrefSubmitted] = useState(false);
    const [chosenDay, setChosenDay] = useState(false);

    useEffect(() => {
        console.log(`Pref submitted ? `);
        console.log(preferenceSubmitted);
    }, [preferenceSubmitted])


    const preferencesSubmitHandler = async (e) => {

        try {
            e.preventDefault();

            // Validate Preferences
            if(enteredUsername.trim().length === 0) {
                setUsernameValid(false);
                setShowForm(false);
                return setModalShown({title: 'Username Error', message: "Username Cannot be blank."});
            };

            if(chosenFirstPreference === chosenSecondPreference) {
                setFormValid(false);
                setShowForm(false);
                return setModalShown({title: 'Preference Error', message: "Invalid First Preference"});
            }

            else if(chosenSecondPreference === chosenThirdPreference) {
                setFormValid(false);
                setShowForm(false);
                return setModalShown({title: 'Preference Error', message: "Invalid Second Preference"});
            }

            else if(chosenFirstPreference === chosenThirdPreference) {
                setFormValid(false);
                setShowForm(false);
                return setModalShown({title: 'Preference Error', message: "Invalid Third Preference"});
            }

            else {

                processPreference();
                setFormValid(true);
                setShowOkBtn(false);


            }
          
        } 
        
        catch(err) {

            if(err) {
                setFormValid(false);
                return console.error(err);
            }

        }
    }

    useEffect(() => {

    }, [preferenceSubmitted, firstApplianceFound, secondPrefSubmitted, lastPrefSubmitted, lastApplianceFound]);

    const processPreference = async () => {

        let invalidChars = ['<', '>', '()', "'", ';'];

        for(let i = 0; i < invalidChars.length; i++) {
            const invalidEntries = invalidChars[i];

            if(invalidEntries.includes(invalidEntries) || invalidEntries.includes(invalidEntries[i+1])) {
               
                const replacedSymbols = invalidChars[i].replace(invalidChars[i], "&lt");
                
               sanitizedInputs.push({enteredUsername, replacedSymbols, invalidEntries});
              
               break;
            }
        }
 
           return await axios.post(`http://localhost:5200/api/v1/preferences/create-preference`, {username: enteredUsername, appliance: firstApplianceData[0], nextAppliance: nextApplianceData[0] , lastAppliance: chosenAppliance, firstPreference: chosenFirstPreference, secondPreference: chosenSecondPreference , thirdPreference: chosenThirdPreference}).then(response => {
                setModalShown({title: 'Preferences', message: 'Your Preferences Have Been Submitted', showForm: false, showDefaultBtn: true});

                setChosenAppliance("");
                setChosenFirstPreference("");
                setChosenSecondPreference("");
                setChosenThirdPreference("");
        
                setPreferenceSubmitted(!preferenceSubmitted);
                setFirstApplianceFound(false);
        
                setSecondPrefSubmitted(!secondPrefSubmitted)
                setLastApplianceFound(true);
        
                setLastPrefSubmitted(true);
                setLastApplianceFound(true);
        
                if(preferenceSubmitted && secondPrefSubmitted) {
                    processNextAppliance();
                }
        
            }).catch(err => {

                if(err) {

                    console.log(err);
                }
            })
        
    }
    
    const modalHandler = () => {
        {modalShown && setModalShown(null)}
    }

    useEffect(() => {
        return fetchAllAppliances();
    }, []);

    useEffect(() => {

    }, [firstApplianceFound, lastApplianceFound])

    const fetchAllAppliances = async () => {
        try {

            return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {

                const allAppliances = response.data.appliances;
                setAppliances(allAppliances);

                let appName;
                let nextAppName;
                let lastAppName;

               for(let i = 0; i < allAppliances.length; i++) {
                   appName = allAppliances[0].name;
                   nextAppName = allAppliances[1].name; 
                   lastAppName = allAppliances.slice(-1)[0];
               }

               firstApplianceData.push(appName);
               nextApplianceData.push(nextAppName);
               lastApplianceData.push(lastAppName);

               setApplianceFound(true);
               setFirstApplianceFound(true); 

               console.log(firstApplianceData);
               console.log(nextApplianceData);

        
              
            }).catch(err => {

                if(err) {
                    return console.error(err);
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

    useEffect(() => {
    }, [applianceFound]);

    const processNextAppliance = async () => {

        try {

            let firstApplianceObj = {};
            let nextApplianceObj = {};
            let lastApplianceObj = {};

            await new Promise(resolve => setTimeout(resolve))

                for(let i = 0; i < applianceNames.length - 1; i++) {

                        const firstAppliance = applianceNames[i];
                        const nextApplianceAvailable = applianceNames[i + 1];

                        const lastAppliance = applianceNames.slice(-1)[0];
                        const applianceIndexes = applianceNames.indexOf(nextApplianceAvailable);

                   await new Promise(resolve => setTimeout((resolve)));
                        
                        if(applianceIndexes < applianceNames.length - 1) { 

                             firstApplianceObj = {firstAppliance};
                             nextApplianceObj = {nextApplianceAvailable};
                             lastApplianceObj = {lastAppliance};

                            firstApplianceData.push(firstApplianceObj);
                            nextApplianceData.push(nextApplianceObj);
                            lastApplianceData.push(lastApplianceObj);

                            setApplianceFound(!applianceFound);

                            for(let index = 0; index < nextApplianceData.length - 1; index++) {
                                
                                const data = nextApplianceData[index];
                                const recentlyInsertedIndex = nextApplianceData.indexOf(data) + 1;

                               if(nextApplianceData.length === 2) { 

                                  const filteredRecentlyInserted = nextApplianceData.slice(0, recentlyInsertedIndex).concat(nextApplianceData.slice(recentlyInsertedIndex + 1, nextApplianceData.length));
                                  filteredAppliances.push(filteredRecentlyInserted);
                                  
                                    // eslint-disable-next-line no-loop-func
                                    filteredAppliances.forEach((filteredVals) => {
                                        newAppliance.push(...filteredVals);
                                        nextApplianceData = [...newAppliance];
;                                   });

                                    for(let z = 0; z < lastApplianceData.length - 1; z++) {
                                   
                                        const lastApplianceAvailable = lastApplianceData[z]
                                        newLastAppliance.push(lastApplianceAvailable);                                 
                                    }

                               }
                            }

                        setNextApplianceDataInserted(true);
                        setLastApplianceDataInserted(true);
                            
                      }
                }

        } 
        
        catch(err) {

            if(err) {
                console.error(err);

                throw new Error(err);
            }
        }
    }

    useEffect(() => {
      
    }, [nextApplianceDataInserted, lastApplianceDataInserted])

   
    const fetchAllPreferences = async () => {
        try {

            return await axios.get(`http://localhost:5200/api/v1/preferences/fetch-preferences`).then(response => {

                const allPreferences = response.data.preferences;
                const length = response.data.preferences.length;

                setPreferences(allPreferences);
                setPreferencesBtnClicked(!preferencesBtnClicked);
                generateRandomTimeslots();

                preferences.push(allPreferences); 

                if(length === 0) {
                    return setModalShown({title: "Preferences", message: "No preferences found"});
                }

                return setTimeout(() => {
                    {!preferenceSubmitted && setModalShown({title: "Are you happy with your preferences?", commTitle: "Comment Title: ", username: "Username: ", reason: "Reason: ", description: "Description: ", showInputs: true, showSubmitBtn: true})};
                }, 2000);

            }).catch(err => {

                if(err) {
                    console.error(err);
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

    // Fair Negotiation Algorithm 1 Implementation
    const generateRandomTimeslots = () => {

        try {

            let firstOtherPrefIndex = otherPreferences[0].firstOtherPreference;
            let secondOtherPrefIndex = otherPreferences[0].secondOtherPreference
            let thirdOtherPrefIndex = otherPreferences[0].thirdOtherPreference;
        
            setOtherFirstPref(firstOtherPrefIndex[Math.floor(Math.random() * firstOtherPrefIndex.length)]); 
            setOtherSecondPref(secondOtherPrefIndex[Math.floor(Math.random() * secondOtherPrefIndex.length)]);
            setOtherThirdPref(thirdOtherPrefIndex[Math.floor(Math.random() * thirdOtherPrefIndex.length)]);
        } 
        
        catch(error) {
        
            if(error) {
                console.error(error);
                throw new Error(error);
            }
        }
    }

   const commentInputsHandler = (event) => {

       try {
            setEnteredCommentTitle(event.target.value);
            setEnteredCommentUsername(event.target.value);
            
            setEnteredCommentReason(event.target.value);
            setEnteredCommentDescription(event.target.value);
       } 
       
       catch(error) {

            if(error) {
                console.error(error);
                throw new Error(error);
            }
       }
       
   }

   const validateCommentTitle = function() {

    try {
        return enteredCommentTitle.trim().length !== 0;
    } 
    
    catch(error) {

        if(error) {

            return console.error(error);
        }

    }
   }

   const validateCommentUsername = function() {

        try {

            return enteredCommentUsername.trim().length !== 0;
        } 
        

        catch(error) {
            setEnteredCommentUsernameValid(false);
            console.error(error);

            throw new Error(error);
        }
   } 

   const validateCommentReason = function() {
       try {
            return enteredCommentReason.trim().length !== 0;
       }
       
       catch(error) {

            if(error) {
                setEnteredCommentReasonValid(false);
                return console.error(error);
            }
       }
   }

   const validateCommentDescription = function() {

        try {
            return enteredCommentDescription.trim().length !== 0;
        } 
        
        catch(error) {

            setEnteredCommentDescriptionValid(false);
            return console.error(error);
        }
   };

    const commentFormHandler = async (event) => {
        try {
            // Prevent form resubmission
            event.preventDefault();

            if(!validateCommentTitle()) {
                alert(`Invalid Comment Title`);
            }
           
         await axios.post(`http://localhost:5200/api/v1/comments/create-comment`, {commentTitle: enteredCommentTitle, commentUsername: enteredCommentUsername, commentReason: enteredCommentReason, commentDescription: enteredCommentDescription});
         return window.location.reload(false);

        } 
        
        catch(error) {

            if(error) {
             console.error(error);
                throw new Error(error);
            }
        }

    }

    return (

       <Fragment>

           <section className = "section--yourpreferences">

           <div className = "container grid grid--2-cols">
           {modalShown && <Modal onClick = {modalHandler} showSubmitBtn = {modalShown.showSubmitBtn} showDefaultBtn = {modalShown.showDefaultBtn} changeHandler = {commentInputsHandler} onBtnClick = {modalHandler} onSubmitBtnClick = {commentFormHandler} showInputs = {modalShown.showInputs} title = {modalShown.title} message = {modalShown.message} commTitle = {modalShown.commTitle} username = {modalShown.username} reason = {modalShown.reason} description = {modalShown.description} /> }

        <RegisterCard>
            <h1 className = "heading--primary login">{DEFAULT_TEXT.preferenceHeader}</h1>

        <form onSubmit = {preferencesSubmitHandler} method = "POST" className = "login--form">

        <div className = "username--box">
            <label className = "username--lbl">Username</label>
            <input id = "username" onChange = {(e) => {setUsername(e.target.value)}} value = {enteredUsername} placeholder = "Enter your Username" type = "text"/>
        </div>

        <div className = "issueType--box">



        {firstApplianceFound ? firstApplianceData.map((firstOne, key) => {

            return <div key = {key}>
            <label className = "issue--lbl" htmlFor = "issue">Select Preferences For {firstOne}
                <input type = "hidden" value = {chosenAppliance} onSubmit = {() => setChosenAppliance(firstOne)} />
            </label>
            </div> 
            
        }) : null}

        {preferenceSubmitted && !firstApplianceFound && lastPrefSubmitted ? nextApplianceData.map((next, key) => {

        return <div key = {key}>

        <label className = "issue--lbl" htmlFor = "issue">Select Preferences For : {next}</label>

        </div>
        }) : null} 


      {/* {preferenceSubmitted && secondPrefSubmitted & lastApplianceFound ? lastApplianceData.map((lastOne, key) => {
            return <div key = {key}>
            <label className = "issue--lbl" htmlFor = "issue">Select Preferences For {lastOne.name}
             
            </label>
            </div> 
        }) : null} */}


     </div>

        <div className = "morningslot--box">

            <label className = "morning--lbl">First Preference</label>

            <select onChange = {(e) => {setChosenFirstPreference(e.target.value)}} value = {chosenFirstPreference} className = "box">
                <option>06:00-07:00</option>
                <option>07:00-08:00</option>
                <option>09:00-10:00</option>
                <option>11:00-12:00</option>
                <option>13:00-14:00</option>
                <option>15:00-16:00</option>
                <option>17:00-18:00</option>
                <option>18:00-19:00</option>
                <option>20:00-21:00</option>
                <option>22:00-23:00</option>
                <option>00:00-01:00</option>
                <option>02:00-03:00</option>
                <option>04:00-05:00</option>
            </select>
    </div>

        <div className = "latemorning--box">
            <label className = "second--lbl">Second Preference</label>

            <select onChange = {(e) => {setChosenSecondPreference(e.target.value)}} value = {chosenSecondPreference} className = "box">
                <option>06:00-07:00</option>
                <option>07:00-08:00</option>
                <option>09:00-10:00</option>
                <option>11:00-12:00</option>
                <option>13:00-14:00</option>
                <option>15:00-16:00</option>
                <option>17:00-18:00</option>
                <option>18:00-19:00</option>
                <option>20:00-21:00</option>
                <option>22:00-23:00</option>
                <option>00:00-01:00</option>
                <option>02:00-03:00</option>
                <option>04:00-05:00</option>
            </select>

        </div>

        <div className = "afternoon--box">
            <label className = "password--lbl">Third Preference</label>

            <select onChange = {(e) => {setChosenThirdPreference(e.target.value)}} value = {chosenThirdPreference} className = "box">
                <option>06:00-07:00</option>
                <option>07:00-08:00</option>
                <option>09:00-10:00</option>
                <option>11:00-12:00</option>
                <option>13:00-14:00</option>
                <option>15:00-16:00</option>
                <option>17:00-18:00</option>
                <option>18:00-19:00</option>
                <option>20:00-21:00</option>
                <option>22:00-23:00</option>
                <option>00:00-01:00</option>
                <option>02:00-03:00</option>
                <option>04:00-05:00</option>
            </select>

        </div>

        <div className = "submit--container">
            <button className = "login--btn" type = "submit">Submit</button>
        </div>
        
    </form>

    </RegisterCard>

    </div>   

        <div className = "viewcontainer--btn">
            <button onClick = {fetchAllPreferences} className = "viewpreferences--btn">View All Preferences</button>
        </div> 

        <section>
         
            {preferencesBtnClicked && firstApplianceFound ? preferences.map((preference, key) => {
                const theData = preference;

                return <div key = {key}>
                    <div className = "preferences--card">


                    <h2 className = "appliance--heading">Username : {theData.username}</h2>
                    <h2 className = "appliance--heading">First Appliance : {theData.appliance}</h2>
                    <h2 className = "appliance--heading">Next Appliance : {theData.nextAppliance}</h2>
                    <h2 className = "appliance--heading">Last Appliance : {theData.lastAppliance}</h2>

                    <h2 className = "appliance--heading">Your Preference 1 : {theData.firstPreference}</h2>
                    <h2 className = "appliance--heading">Your Preference 2 : {theData.secondPreference}</h2>
                    <h2 className = "appliance--heading">Your Preference 3 : {theData.thirdPreference}</h2>

                    <h2 className = "appliance--heading">Random Allocations</h2>
                    <h2 className = "appliance--heading">First Random Slot : {otherFirstPref}</h2>
                    <h2 className = "appliance--heading">Second Random Slot : {otherSecondPref}</h2>
                    <h2 className = "appliance--heading">Third Random Slot : {otherThirdPref}</h2>

                    <Link className = "negotiate--btn" to = {{pathname: `/fair-negotiations/${preference._id}`, state: {preference, firstApplianceData}} }>Negotiate Preference</Link>
                    
                    </div>
                </div>


          
            }) : null};
            
            
       

        </section>

    </section>
</Fragment>
    )
}

export default CreatePreference