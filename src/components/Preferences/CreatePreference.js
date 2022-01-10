import React, {useState, useEffect, useReducer, Fragment} from 'react';
import './CreatePreference.css';
import RegisterCard from '../Admin/RegisterCard';

const CreatePreference = (props) => {
    const [username, setUsername] = useState("");
    const [appliance, setAppliance] = useState("");
    const [earlyMorningSlot, setEarlyMorningSlot] = useState("");



    return (
       <Fragment>
           <section className = "section--yourpreferences">
           <div className = "container grid grid--2-cols">

        <RegisterCard>
            <h1 className = "heading--primary login">Your Preferences</h1>
            <form  className = "login--form">

        <div className = "username--box">
            <label className = "user--lbl">Users</label>
            <input placeholder = "Enter your E-mail" type = "email"/>
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

        <div className = "password--box">
            <label className = "password--lbl">Afternoon Slot</label>
            <input placeholder = "Enter your Password" required id = "password" type = "password"/>
        </div>

        <div className = "password--box">
            <label className = "password--lbl">Evening Slot</label>
            <input placeholder = "Enter your Password" required id = "password" type = "password"/>
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