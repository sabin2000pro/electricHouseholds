import React, {useEffect, useState, Fragment} from 'react';
import RegisterCard from '../Admin/RegisterCard';
import ModalCard from '../../UI/ModalCard';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';

const BotSettings = (props) => {
    const [enteredBotName, setEnteredBotName] = useState('');
    const [enteredVirtualCredits, setEnteredVirtualCredits] = useState('');
    const [chosenBotType, setChosenBotType] = useState('');

    const submitBotHandler = async (event) => {
        try {

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

      
      <a className = "btn btn--outline" href = "/about-us">Logout</a>
  </div>

  <div className = "home-img-box">
      <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
  </div>
</div>



</section>

</Fragment>
};

export default BotSettings; // Export the Bot Settings Component