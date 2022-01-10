import React, {Fragment} from 'react';
import Header from '../Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';
import CreatePreference from './CreatePreference';
import './CreatePreference.css';

const PreferencesHome = () => {
        return (
            <Fragment>
               <Header />
            
      <section className = "section--home">
           <div className = "home--grid">

          <div className = "home-text-box">
   
   
            <h1 className = "heading--primary">Your Preferences</h1>
           <p className = "home--description">Fill out the form below and let us know when you wish to run your electrical appliances. You can only run an appliance for only 1 hour in the morning, afternoon and evening to save energy.</p>
   
           <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
           <a className = "btn btn--outline" href = "/about-us">About Us</a>
       </div>
   
       <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>
    </div>
       
    </section>

    <section className = "section--createpreference">
        <CreatePreference/>

     </section>

        <div className = "viewcontainer--btn">
     <button className = "viewpreferences--btn">View your preferences</button>

        </div>


    <footer className = "footer">
        <ul className = "footer--items">
            <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
        </ul>
    </footer>

   
   
            </Fragment>
    )
}

export default PreferencesHome
