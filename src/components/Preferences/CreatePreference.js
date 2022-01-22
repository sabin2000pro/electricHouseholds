/* eslint-disable no-lone-blocks */
import React, {useState, Fragment, useEffect} from 'react';
import './CreatePreference.css';
import {Link} from 'react-router-dom';
import RegisterCard from '../Admin/RegisterCard';
import axios from 'axios';
import Modal from '../../UI/Modal';

let DEFAULT_TEXT = {
    preferenceHeader: 'Your Preferences'
}

// Fake other household preferences
let otherPreferences = [

    {
      firstOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
      secondOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
      thirdOtherPreference: ["06:00-07:00", "08:00-09:00" ,"10:00-11:00","12:00-13:00","14:00-15:00", "16:00-17:00", "18:00-19:00", "20:00-21:00", "22:00-23:00"],
    }
  
  ];


const CreatePreference = (props) => {
    const [enteredUsername, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);

    const [chosenAppliance, setChosenAppliance] = useState("");
    const [applianceValid, setApplianceValid] = useState(true);
    const [otherFirstPref, setOtherFirstPref] = useState('');
    const [otherSecondPref, setOtherSecondPref] = useState('');
    const [otherThirdPref, setOtherThirdPref] = useState('');

    const [chosenFirstPreference, setChosenFirstPreference] = useState("");
    const [chosenSecondPreference, setChosenSecondPreference] = useState("");
    const [chosenThirdPreference, setChosenThirdPreference] = useState("");

    const [appliances, setAppliances] = useState([]); // Array of appliances
    const [preferences, setPreferences] = useState([]);
    const [validPreferences, setValidPreferences] = useState(true);
    const [formValid, setFormValid] = useState(true);
    const [washingMachineChosen, setWashingMachineChosen] = useState(false);
    const [tumbleDrierChosen, setTumbleDrierChosen] = useState(false);
    const [dishWasherChosen, setDishWasherChosen] = useState(false);
    const [preferencesBtnClicked, setPreferencesBtnClicked] = useState(false);
    const [preferenceSubmitted, setPreferenceSubmitted] = useState(false);
    const [modalShown, setModalShown] = useState();

    const preferencesSubmitHandler = async (e) => {

        try {
            e.preventDefault();

            // Validate Preferences

            if(enteredUsername.trim().length === 0) {
                setUsernameValid(false);
                return setModalShown({title: 'Username Error', message: "Username Cannot be blank."});
            };

            if(chosenFirstPreference === chosenSecondPreference) {
                setFormValid(false);
                return setModalShown({title: 'Preference Error', message: "Invalid First Preference"});
            }

            else if(chosenSecondPreference === chosenThirdPreference) {
                setFormValid(false);
                return setModalShown({title: 'Preference Error', message: "Invalid Second Preference"});
            }

            else if(chosenFirstPreference === chosenThirdPreference) {
                setFormValid(false);
                return setModalShown({title: 'Preference Error', message: "Invalid Third Preference"});
            }

            else {
                const {data} = await axios.post(`http://localhost:5200/api/v1/preferences/create-preference`, {username: enteredUsername, appliance: chosenAppliance, firstPreference: chosenFirstPreference, secondPreference: chosenSecondPreference , thirdPreference: chosenThirdPreference}); 
                console.log(`Data : ${data}`);

                setModalShown({title: 'Preferences', message: 'Your Preferences Have Been Submitted'});
                setPreferenceSubmitted(true);

                setFormValid(true);

                setTimeout(() => {
                    {!preferenceSubmitted && setModalShown({title: "Comment", message : "Leave your comment below", inputUser: "Test Username Here"})};
                }, 2000);

            }
          
        } 
        
        catch(err) {

            if(err) {
                setFormValid(false);
                return console.error(err);
            }

        }
    }

    const modalHandler = () => {
        setModalShown(null);
    }

    const commentSubmitHandler = (event) => {
        try {

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }

        }
        
    }

    useEffect(() => {
        return fetchAllAppliances();
    }, []);

    const fetchAllAppliances = async () => {
        try {
            return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {
                const allAppliances = response.data.appliances;

                setAppliances(allAppliances);
                console.log(appliances);

            }).catch(err => {

                if(err) {
                    console.log(err);
                }
            })
        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    }

    const fetchAllPreferences = async () => {
        try {

            return await axios.get(`http://localhost:5200/api/v1/preferences/fetch-preferences`).then(response => {
                const allPreferences = response.data.allPreferences;
                const length = response.data.allPreferences.length;
                if(length === 0) {
                    return setModalShown({title: "Preferences", message: "No preferences found"});

                }
                setPreferences(allPreferences);
                setPreferencesBtnClicked(!preferencesBtnClicked);
                console.log(preferences);

                return generateRandomTimeslots();

            }).catch(err => {

                if(err) {
                    return console.error(err);
                }

            })
        } 
        
        catch(err) {
            
            if(err) {
                return console.error(err);
            }

        }
    }

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
                return console.error(error);
            }

        }
    }

    return (

       <Fragment>

           <section className = "section--yourpreferences">
           <div className = "container grid grid--2-cols">
           {modalShown && <Modal title = {modalShown.title} message = {modalShown.message} inputUser = {modalShown.inputUser} onClick = {modalHandler}/>  }

        <RegisterCard>
            <h1 className = "heading--primary login">{DEFAULT_TEXT.preferenceHeader}</h1>

        <form onSubmit = {preferencesSubmitHandler} method = "POST" className = "login--form">

        <div className = "username--box">
            <label className = "username--lbl">Username</label>
            <input id = "username" onChange = {(e) => {setUsername(e.target.value)}} value = {enteredUsername} placeholder = "Enter your Username" type = "text"/>
        </div>

        <div className = "issueType--box">
        <label className = "issue--lbl" htmlFor = "issue">Appliance</label>

            <select onChange = {(e) => {setChosenAppliance(e.target.value)}} value = {chosenAppliance} className = "box">

                {appliances.map((appliance, key) => {
                    return <option key = {key}>{appliance.name}</option>
                })}

            </select>
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
                <option>17:00-18:00</option>
                <option>18:00-19:00</option>
                <option>20:00-21:00</option>
                <option>22:00-23:00</option>
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

            {preferencesBtnClicked && preferences.map((data, key) => {
                const theData = data;

                return <div key = {key}>
                    <div className = "preferences--card">

                    <h2 className = "appliance--heading">Username : {JSON.stringify(theData.username, null).toString().replaceAll("\"", "")}</h2>
                    <h2 className = "appliance--heading">Your Preference 1 : {JSON.stringify(theData.firstPreference, null).toString().replaceAll("\"", "")}</h2>
                    <h2 className = "appliance--heading">Your Preference 2 : {JSON.stringify(theData.secondPreference, null).toString().replaceAll("\"", "")}</h2>
                    <h2 className = "appliance--heading">Your Preference 3 : {JSON.stringify(theData.thirdPreference, null).toString().replaceAll("\"", "")}</h2>


                    <h2 className = "appliance--heading">Random Allocations</h2>
                    <h2 className = "appliance--heading">First Random Slot : {JSON.stringify(otherFirstPref, null).toString().replaceAll("\"", "")}</h2>
                    <h2 className = "appliance--heading">Second Random Slot : {JSON.stringify(otherSecondPref, null).toString().replaceAll("\"", "")}</h2>
                    <h2 className = "appliance--heading">Third Random Slot : {JSON.stringify(otherThirdPref, null).toString().replaceAll("\"", "")}</h2>

                    <Link className = "negotiate--btn" to = {{pathname: `/fair-negotiations`, state: {preferences}} }>Negotiate Preference</Link>

                    </div>
                </div>
            })};

        </section>

</section>

        </Fragment>
    )
}

export default CreatePreference