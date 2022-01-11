import React, {useState, useReducer, Fragment, useEffect} from 'react';
import './CreatePreference.css';
import RegisterCard from '../Admin/RegisterCard';
import axios from 'axios';

const CreatePreference = (props) => {
    const [username, setUsername] = useState("");
    const [usernameValid, setUsernameValid] = useState(true);

    const [appliance, setAppliance] = useState("");
    const [applianceValid, setApplianceValid] = useState(true);

    const [image, setImage] = useState("");
    const [imageValid, setImageValid] = useState(true);

    const [earlyMorningSlot, setEarlyMorningSlot] = useState("");
    const [lateMorningSlot, setLateMorningSlot] = useState("");
    const [afternoonSlot, setAfternoonSlot] = useState("");
    const [eveningSlot, setEveningSlot] = useState("");
    const [appliances, setAppliances] = useState([]); // Array of appliances

    useEffect(() => {
        return fetchApplianceData();
    }, [appliances])

    const fetchApplianceData = async => {
        try {
            // Send a GET request to the back-end route to retrieve all of the appliances using the fetch method

            // TBC
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
           
            const {data} = await axios.post(`http://localhost:5370/api/v1/preferences/create-preference`, {username, appliance, image, earlyMorningSlot, lateMorningSlot, afternoonSlot, eveningSlot});
            console.log(data);

            alert('Preferences Submitted Success');
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


        <form onSubmit = {preferencesSubmitHandler} method = "POST" className = "login--form">

        <div className = "username--box">
            <label className = "username--lbl">Username</label>
            <input placeholder = "Enter your Username" type = "text"/>
        </div>

        <div className = "issueType--box">
        <label className = "issue--lbl" htmlFor = "issue">Appliance</label>

            <select className = "box">
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
            <input placeholder = "Enter Image URL" required id = "image" type = "text"/>
        </div>

        <div className = "morningslot--box">
            <label className = "morning--lbl">Morning Slot</label>
            <input placeholder = "Enter your desired Morning Slot" required id = "morningslot" type = "text"/>
        </div>

        <div className = "latemorning--box">
            <label className = "password--lbl">Late Morning Slot</label>
            <input placeholder = "Enter your second Morning Slot" required id = "password" type = "text"/>
        </div>

        <div className = "afternoon--box">
            <label className = "password--lbl">Afternoon Slot</label>
            <input placeholder = "Enter your desired Afternoon Slot" required id = "afternoonSlot" type = "text"/>
        </div>

        <div className = "eveningslot--box">
            <label className = "password--lbl">Evening Slot</label>
            <input placeholder = "Enter your desired Evening Slot" required id = "eveningslot" type = "text"/>
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