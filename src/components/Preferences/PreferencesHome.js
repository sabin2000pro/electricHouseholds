import React, {Fragment} from 'react';
import Header from '../Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';

const PreferencesHome = () => {
        return (
            <Fragment>
               <Header />
   
   <section className = "section--home">
           <div className = "home--grid">
   
          <div className = "home-text-box">
   
   
            <h1 className = "heading--primary">Your Preferences</h1>
           <p className = "home--description">Fill out the form below and let us know when you wish to run your electrical appliances. You can only run an appliance for only 1 hour in the morning, afternoon and evening to save energy.</p>
   
           <a className = "btn btn--full mgr-sm" href = "#">Start Now</a>
           <a className = "btn btn--outline" href = "#">Learn More!</a>
       </div>
   
       <div className = "home-img-box">
           <img className = "home--img" alt = "Wind Turbing Image" src = {HomepageImg} />
       </div>
   </div>
   
   
   </section>
            </Fragment>
    )
}

export default PreferencesHome
