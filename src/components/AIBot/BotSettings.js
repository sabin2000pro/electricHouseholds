    import React, {useEffect, useState, Fragment} from 'react';
    import RegisterCard from '../Admin/RegisterCard';
    import ModalCard from '../../UI/ModalCard';
    import Header from '../Header';
    import './BotSettings.css'
    import {Link} from 'react-router-dom';
    import HomepageImg from '../images/homepage/homepageimg.jpg';
    import axios from 'axios';

const BotSettings = (props) => {

        const [enteredBotName, setEnteredBotName] = useState('');
        const [enteredVirtualCredits, setEnteredVirtualCredits] = useState('');
        const [enteredBotType, setChosenBotType] = useState('');
        const [enteredBidRange, setEnteredBidRange] = useState('');
        const [enteredBotNumber, setEnteredBotNumber] = useState('');

        const [formValid, setFormValid] = useState(true);

        const submitBotHandler = async (event) => {

            try {
                event.preventDefault();

                await axios.post(`http://localhost:5200/api/v1/bot/create-bot`, {name: enteredBotName, botCredits: enteredVirtualCredits, type: enteredBotType, bidRange: enteredBidRange, numberOfBots: enteredBotNumber});
                alert(`Bot Data Configured`);

                setEnteredBotName("");
                setEnteredVirtualCredits("");

                setChosenBotType("");
                setEnteredBidRange("");

                setFormValid(true);

                if(formValid) {
                    return window.location.reload(false);

                }
            } 
            
            catch(error) {

                if(error) {
                    console.log(error);
                    throw new Error(error);
                }
            }
        }

    return  <Fragment>

    <Header />

    <section className = "section--home">
        <div className = "home--grid">

        <div className = "home-text-box">

        <h1 className = "heading--primary">AI Bot Settings Panel</h1>
        <p className = "home--description">In this dashboard panel, you will be able to configure various AI Bot settings such as the number of Virtual Credits the AI bot can bid. You can create up to three types of AI bots, low bidding bots, medium and high intensity bots.</p>
        
        <a className = "btn btn--outline" href = "/home">Logout</a>
    </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
        </div>

        </div>
</section>

    <section className = "section--login">

            <div className = "container grid grid--2-cols">
                
                <RegisterCard>
                    <h1 className = "heading--primary login">Configure Bot Settings</h1>

                    <form onSubmit = {submitBotHandler} className = "login--form">
    
                        <div className = "email--box">
                            <label className = "email--lbl">Name</label>
                            <input value = {enteredBotName} onChange = {(event) => setEnteredBotName(event.target.value)} placeholder = "Enter Bot Name" type = "text"/>
                        </div>

                        <div className = "bot--box">
                            <label className = "bot--lbl">Credits</label>
                            <input value = {enteredVirtualCredits} onChange = {(event) => setEnteredVirtualCredits(event.target.value)} placeholder = "Enter Bot Credits" id = "credits" type = "text"/>
                        </div>

                        <div className = "type--box">
                            <label className = "type--lbl">Type</label>
                            <input value = {enteredBotType} onChange = {(event) => setChosenBotType(event.target.value)} placeholder = "Enter Bot Type" id = "type" type = "text"/>
                        </div>

                        <div className = "range--box">
                            <label className = "range--lbl">Bid Range</label>
                            <input value = {enteredBidRange} onChange = {(event) => setEnteredBidRange(event.target.value)} placeholder = "Enter Bid Range" id = "range" type = "text"/>
                        </div>

                        <div className = "botcounter--box">

                        <label className = "botcounter--lbl">Number of Bots</label>

                            <select onChange = {(event) => {setEnteredBotNumber(event.target.value)}} className = "box">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                        </div>
                
                        <div className = "submit--container">
                            <button className = "login--btn" type = "submit">Submit</button>
                        </div>

                    </form>
                    
                </RegisterCard>
                
            </div>    
        </section>

            <footer className = "footer">
                    <ul className = "footer--items">
                        <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
                    </ul>
            </footer>

    </Fragment>

    };

    export default BotSettings; // Export the Bot Settings Component