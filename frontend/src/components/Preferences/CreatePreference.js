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

    const [chosenAppliance, setAppliance] = useState("");
    const [applianceValid, setApplianceValid] = useState(true);
    const [savingDataMsg, setSavingDataMsg] = useState(false);
    const [chosenImage, setImage] = useState("");
    const [imageValid, setImageValid] = useState(true);

    const [chosenEarlyMorningSlot, setEarlyMorningSlot] = useState("");
    const [chosenLateMorningSlot, setLateMorningSlot] = useState("");
    const [chosenAfternoonSlot, setAfternoonSlot] = useState("");
    const [chosenEveningSlot, setEveningSlot] = useState("");

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
    const [hideSpinner, setHideSpinner] = useState(false);
    const [timeoutStart, setTimeoutStart] = useState(false);

    useEffect(() => {
        return fetchApplianceData();
    }, [appliances]);


    const fetchApplianceData = async () => { // Routine to fetch the available appliances from the backend database
        try {
            // To be finsished.
        } 
        
        catch(err) {

            if(err) {
                return console.error(err);
            }
        }

    }

    const preferencesSubmitHandler = async (e) => {
        try {

            e.preventDefault();
            const {data} = await axios.post(`http://localhost:5200/api/v1/preferences/create-preference`, {username: enteredUsername, appliance: chosenAppliance, image: chosenImage, earlyMorningslot: chosenEarlyMorningSlot, lateMorningslot: chosenLateMorningSlot , afternoonSlot: chosenAfternoonSlot, eveningSlot: chosenEveningSlot});
            setPreferenceSubmitted(true);
        } 
        
        catch(err) {

            if(err) {
                setFormValid(false);
                return console.error(err);
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

        }
    }

    const deletePreference = async (id) => { // Deletes a preference
        try {
            // Send DELETE request to backend
            return await axios.delete(`http://localhost:5200/api/v1/preferences/delete-preference/${id}`, {id: id});
        } 
        
        catch(err) {

            if(err) {
                return console.error(err);
            }
        }
    };

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

            <select onChange = {(e) => {setAppliance(e.target.value)}} value = {chosenAppliance} className = "box">
                <option>Washing Machine</option>
                <option>Tumble Drier</option>
                <option>Kettle</option>
                <option>TV</option>
                <option>Lights</option>
                <option>Dish Washer</option>
                <option>Shower</option>
                <option>Gaming Console</option>
            </select>
        </div>

        <div className = "img--box">
            <label className = "img--lbl">Image</label>
            <input value = {chosenImage} onChange = {(e) => {setImage(e.target.value)}} placeholder = "Enter Image URL" required id = "image" type = "text"/>
        </div>

        <div className = "morningslot--box">
            <label className = "morning--lbl">Morning Slot</label>
            <input value = {chosenEarlyMorningSlot} onChange = {(e) => {setEarlyMorningSlot(e.target.value)}} placeholder = "Enter your desired Morning Slot" required id = "morningslot" type = "text"/>
        </div>

        <div className = "latemorning--box">
            <label className = "password--lbl">Late Morning Slot</label>
            <input value = {chosenLateMorningSlot} onChange = {(e) => {setLateMorningSlot(e.target.value)}} placeholder = "Enter your second Morning Slot" required id = "password" type = "text"/>
        </div>

        <div className = "afternoon--box">
            <label className = "password--lbl">Afternoon Slot</label>
            <input value = {chosenAfternoonSlot} onChange = {(e) => {setAfternoonSlot(e.target.value)}} placeholder = "Enter your desired Afternoon Slot" required id = "afternoonSlot" type = "text"/>
        </div>

        <div className = "eveningslot--box">
            <label className = "password--lbl">Evening Slot</label>
            <input value = {chosenEveningSlot} onChange = {(e) => {setEveningSlot(e.target.value)}} placeholder = "Enter your desired Evening Slot" required id = "eveningslot" type = "text"/>
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
                    <h2 className = "appliance--heading">Appliance : {JSON.stringify(theData.appliance, null).toString().replaceAll("\"", "")}</h2>
                    <h2 className = "appliance--heading"><img className = "appliance--img" src = {theData.image} alt = "Appliance" /></h2>

                    <button className = "negotiate--btn">Negotiate Preference</button>
                            <p className = "generic--text">Not happy with your timeslot? Modify it</p>

                            <button type = "submit">Edit Now</button>

                            <div>
                        <h2 className = "delete--header">No longer need it ? Delete your preference</h2>
                            <button className = "delete--btn" onClick = {() => deletePreference(theData._id)} type = "submit">Delete</button>
                         </div>
                    </div>
                </div>
            })};

        </section>

</section>

        </Fragment>
    )
}

export default CreatePreference