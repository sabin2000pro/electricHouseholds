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
            <p className = "home--description">Fill out the form below and let us know when you wish to run your electrical appliances. You can select up to three different timeslot preferences that you can submit that suits your needs. <br/> <br/> After you have submitted your preferences you can view them below. You will also be presented with randomly allocated timeslots which you can then negotiate using our First Price Sealed Bid Algorithm.</p>
    
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



    <footer className = "footer">
        <ul className = "footer--items">
            <li className = "footer--item">Copyright All Rights Reserved - eHouseholds Sabin Constantin Lungu - 2021</li>
        </ul>
    </footer>

   
   
</Fragment>
    )
}

export default PreferencesHome
