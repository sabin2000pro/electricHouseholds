/* eslint-disable no-lone-blocks */
import React, {useState, Fragment, useEffect} from 'react';
import './CreatePreference.css';
import {Link} from 'react-router-dom';
import RegisterCard from '../Admin/RegisterCard';
import axios from 'axios';
import Modal from '../../UI/Modal';
import FairNegotiations from '../FairNegotations';

let DEFAULT_TEXT = {
    preferenceHeader: 'Your Preferences'
}

const applianceNames = [];
// Fake other household preferences
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
    const [enteredUsername, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);
    const [chosenAppliance, setChosenAppliance] = useState("");

    const [otherFirstPref, setOtherFirstPref] = useState('');
    const [otherSecondPref, setOtherSecondPref] = useState('');
    const [otherThirdPref, setOtherThirdPref] = useState('');

    const [chosenFirstPreference, setChosenFirstPreference] = useState("");
    const [chosenSecondPreference, setChosenSecondPreference] = useState("");
    const [chosenThirdPreference, setChosenThirdPreference] = useState("");

    const [appliances, setAppliances] = useState([]); // Array of appliances
    const [preferences, setPreferences] = useState([]);
    const [formValid, setFormValid] = useState(true);

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
                setPreferenceSubmitted(true);
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

    // Function to process user preference. Performs some validation before
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


    await axios.post(`http://localhost:5200/api/v1/preferences/create-preference`, {username: enteredUsername, appliance: chosenAppliance, nextAppliance: chosenNextAppliance, lastAppliance: chosenLastAppliance,  firstPreference: chosenFirstPreference, secondPreference: chosenSecondPreference , thirdPreference: chosenThirdPreference}).then(response => {
        setModalShown({title: 'Preferences', message: 'Your Preferences Have Been Submitted', showForm: false, showDefaultBtn: true});

        setChosenAppliance("");
        setChosenFirstPreference("");
        setChosenSecondPreference("");
        setChosenThirdPreference("");

        return processNextAppliance();
           
    })
       
    }
    
    const modalHandler = () => {
        {modalShown && setModalShown(null)}
    }

    useEffect(() => {
        return fetchAllAppliances();
    }, []);

    const fetchAllAppliances = async () => {
        try {

            return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {

                const allAppliances = response.data.appliances;
                setAppliances(allAppliances);
               
                return response.data.appliances.forEach((appl) => {
                    const {name} = appl;
                    applianceNames.push(name);
                });


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
                        
                        if(applianceIndexes < applianceNames.length - 1) { // Loop over the appliances

                             firstApplianceObj = {firstAppliance};
                             nextApplianceObj = {nextApplianceAvailable};
                             lastApplianceObj = {lastAppliance};

                             // Push the appliance to array. More comments....
                                firstApplianceData.push(firstApplianceObj);
                                nextApplianceData.push(nextApplianceObj);
                                lastApplianceData.push(lastApplianceObj);
// Loop
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
          <label className = "issue--lbl" htmlFor = "issue">Appliance</label>

        {!nextApplianceDataInserted ? <select onChange = {(e) => {setChosenAppliance(e.target.value)}} value = {chosenAppliance} className = "box">
          <option>Select Appliance</option>

            {appliances.map((appliance, key) => {
                return <option key = {key}>{appliance.name}</option>
            })};

        </select> : newAppliance.length === 0 ? nextApplianceData.map((theNextOne, key) => {
           
           

    return <select key = {key} onChange = {(e) => {setChosenNextAppliance(e.target.value)}} value = {chosenNextAppliance} className = "box">

       
    <option value>Select Appliance</option>
   <option key = {key}>{theNextOne.nextApplianceAvailable}</option>

    

</select>
        }) : newLastAppliance.map((filteredLast, key) => {
         
            return <select key = {key} onChange = {(e) => {setChosenLastAppliance(e.target.value)}} value = {chosenLastAppliance} className = "box">

       
        <option value>Select Appliance</option>
        <option key = {key}>{filteredLast.lastAppliance}</option>

</select>

        })}

       
      
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
            <label className = "password--lbl">Second Preference</label>

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
         
            {preferencesBtnClicked && preferences.map((preference, key) => {
                const theData = preference;

                if(!theData) {
                    return console.log(`No data found`);
                }

                return <div key = {key}>
                    <div className = "preferences--card">

                    {theData._id}
                    <h2 className = "appliance--heading">Username : {theData.username}</h2>
                    <h2 className = "appliance--heading">Initial Appliance : {theData.appliance}</h2>
                    <h2 className = "appliance--heading">Next Appliance : {theData.nextAppliance}</h2>
                    <h2 className = "appliance--heading">Last Appliance : {theData.lastAppliance}</h2>



                    <h2 className = "appliance--heading">Your Preference 1 : {theData.firstPreference}</h2>
                    <h2 className = "appliance--heading">Your Preference 2 : {theData.secondPreference}</h2>
                    <h2 className = "appliance--heading">Your Preference 3 : {theData.thirdPreference}</h2>

                    <h2 className = "appliance--heading">Random Allocations</h2>
                    <h2 className = "appliance--heading">First Random Slot : {otherFirstPref}</h2>
                    <h2 className = "appliance--heading">Second Random Slot : {otherSecondPref}</h2>
                    <h2 className = "appliance--heading">Third Random Slot : {otherThirdPref}</h2>
                    
               
                    <Link className = "negotiate--btn" to = {{pathname: `/fair-negotiations/${preference._id}`, state: {preference}} }>Negotiate Preference</Link>
                    
                    </div>
                </div>

          
            })};
       

        </section>

    </section>
</Fragment>
    )
}

export default CreatePreference