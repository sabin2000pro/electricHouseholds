import React, {Fragment} from 'react';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';
import { useHistory, useLocation } from 'react-router';

const AdminBidsSettings = () => {
    return (
        <Fragment>

            <Header />
        
    <section className = "section--home">
        <div className = "home--grid">

   <div className = "home-text-box">
        <h1 className = "heading--primary">Admin Bid Settings</h1>
        <p className = "home--description">Configure the required bid settings.</p>

        <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
        <a className = "btn btn--outline" href = "/about-us">About Us</a>
    </div>

        <div className = "home-img-box">
            <img className = "home--img" alt = "Wind Turbine" src = {HomepageImg} />
        </div>
        </div>
    
    </section>

</Fragment>
    )
}

export default AdminBidsSettings
