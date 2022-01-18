import React, {useState, useReducer, Fragment, useEffect} from 'react';
import './CreatePreference.css';
import {useHistory} from 'react-router-dom';
import RegisterCard from '../Admin/RegisterCard';
import axios from 'axios';
import {FaSearch} from 'react-icons/fa';


let IMG_HEIGHT = 100;
let IMG_WIDTH = 100;

const FLAGS = {
    IMG_HEIGHT: IMG_HEIGHT,
    IMG_WIDTH: IMG_WIDTH
}

let DEFAULT_TEXT = {
    preferenceHeader: 'Your Preferences'
}

const CreatePreference = (props) => {
    let history = useHistory();
    const [enteredUsername, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);

    const [chosenAppliance, setChosenAppliance] = useState("");
    const [applianceValid, setApplianceValid] = useState(true);
    const [savingDataMsg, setSavingDataMsg] = useState(false);
    const [chosenImage, setImage] = useState("");
    const [imageValid, setImageValid] = useState(true);

    const [chosenFirstPreference, setChosenFirstPreference] = useState("");
    const [chosenSecondPreference, setChosenSecondPreference] = useState("");
    const [chosenThirdPreference, setChosenThirdPreference] = useState("");

    const [appliances, setAppliances] = useState([]); // Array of appliances
    const [preferences, setPreferences] = useState([]);
    const [validPreferences, setValidPreferences] = useState(true);
    const [formValid, setFormValid] = useState(true);
    const [washingMachineChosen, setWashingMachineChosen] = useState(false);
    const [tumbleDrierChosen, setTumbleDrierChosen] = useState(false);
    const [kettleChosen, setKettleChosen] = useState(false);
    const [tvChosen, setTvChosen] = useState(false);
    const [lightsChosen, setLightsChosen] = useState(false);
    const [dishWasherChosen, setDishWasherChosen] = useState(false);
    const [showerChosen, setShowerChosen] = useState(false);
    const [gamingConsoleChosen, setGamingConsoleChosen] = useState(false);
    const [preferencesBtnClicked, setPreferencesBtnClicked] = useState(false);
    const [preferenceSubmitted, setPreferenceSubmitted] = useState(false);

    const preferencesSubmitHandler = async (e) => {

        try {
            e.preventDefault();

            // Validate Preferences

            if(chosenFirstPreference === chosenSecondPreference) {
                alert('You cannot run your appliance at the same time');
                
                return setTimeout(() => {
                    return window.location.reload(false);
                }, 1500);
            }

            else if(chosenSecondPreference === chosenThirdPreference) {
                alert('You cannot run your appliance at the same time');
            }

            else if(chosenFirstPreference === chosenThirdPreference) {
                alert('You cannot run your appliance at the same time');
            }

            else {
                const {data} = await axios.post(`http://localhost:5200/api/v1/preferences/create-preference`, {username: enteredUsername, appliance: chosenAppliance, firstPreference: chosenFirstPreference, secondPreference: chosenSecondPreference , thirdPreference: chosenThirdPreference});
                console.log(data);
    
                setPreferenceSubmitted(true);
                alert('Preference Created');
    
            
                return history.push('/home'); // Redirect user back home
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
        return fetchAllAppliances();
    }, []);

    const fetchAllAppliances = async () => {
        try {
            return await axios.get(`http://localhost:5200/api/v1/appliances/fetch-appliances`).then(response => {
                const allAppliances = response.data.appliances;
                setAppliances(allAppliances);
                console.log(allAppliances);
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
                setPreferences(allPreferences);
                setPreferencesBtnClicked(!preferencesBtnClicked);

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

    return (

       <Fragment>
           <section className = "section--yourpreferences">
           <div className = "container grid grid--2-cols">

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

        {preferences.length === 0 ? <p className = "no--preferences">No preferences found</p> : null}

        <section>

            {preferencesBtnClicked && preferences.map((data, key) => {
                const theData = data;

                return <div key = {key}>
                    <div className = "preferences--card">

                    <h2 className = "appliance--heading">Username : {JSON.stringify(theData.username, null).toString().replaceAll("\"", "")}</h2>
                    <h2 className = "appliance--heading">Appliance : {JSON.stringify(theData.appliance, null).toString().replaceAll("\"", "")}</h2>

                    <button className = "negotiate--btn">Negotiate Timeslots</button>

                    </div>
                </div>
            })};

        </section>

</section>

        </Fragment>
    )
}

export default CreatePreference