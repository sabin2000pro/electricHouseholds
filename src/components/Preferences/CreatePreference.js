import React, {useState, useEffect, useReducer, Fragment} from 'react';
import './CreatePreference.css';
import RegisterCard from '../Admin/RegisterCard';

const CreatePreference = (props) => {
    const [username, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);

    const [appliance, setAppliance] = useState("");
    const [applianceValid, setApplianceValid] = useState(true);

    const [earlyMorningSlot, setEarlyMorningSlot] = useState("");
    const [lateMorningSlot, setLateMorningSlot] = useState("");
    const [afternoonSlot, setAfternoonSlot] = useState("");
    const [eveningSlot, setEveningSlot] = useState("");

    const preferencesSubmitHandler = async (e) => {
        try {
            e.preventDefault();
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
            <h1 className = "heading--primary login">Your Preferences</h1>
            <form onSubmit = {preferencesSubmitHandler}  className = "login--form">

        <div className = "username--box">
            <label className = "username--lbl">Username</label>
            <input placeholder = "Enter your Username" type = "text"/>
        </div>

        <div className = "appliance--box">
            <label className = "password--lbl">Appliance</label>
            <input placeholder = "Enter your Password" required id = "password" type = "password"/>
        </div>

        <div className = "morningslot--box">
            <label className = "password--lbl">Morning Slot</label>
            <input placeholder = "Enter your Password" required id = "password" type = "password"/>
        </div>

        <div className = "latemorning--box">
            <label className = "password--lbl">Late Morning Slot</label>
            <input placeholder = "Enter your Password" required id = "password" type = "password"/>
        </div>

        <div className = "afternoon--box">
            <label className = "password--lbl">Afternoon Slot</label>
            <input placeholder = "Enter your Password" required id = "password" type = "password"/>
        </div>

        <div className = "eveningslot--box">
            <label className = "password--lbl">Evening Slot</label>
            <input placeholder = "Enter your Evening Slot" required id = "eveningslot" type = "text"/>
        </div>
        
        <div className = "submit--container">
            <button className = "login--btn" type = "submit">Submit</button>
        </div>


        </form>

    </RegisterCard>

    </div>    
    </section>
        </Fragment>
    )
}

export default CreatePreference