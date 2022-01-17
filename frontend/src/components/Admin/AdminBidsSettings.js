import React, {Fragment} from 'react';
import Header from '../Header';
import {useHistory, useLocation} from 'react-router-dom';
import HomepageImg from '../images/homepage/homepageimg.jpg';

const AdminBidsSettings = () => {
    let history = useHistory();


    const logoutHandler = () => { // Logout Handler Function to logout admins
        localStorage.removeItem("authToken"); // Remove auth token from local storage
        history.push('/admin-login'); // Redirect to Login
        
        return window.location.reload(false);
    }

   

    return (
        <Fragment>

            <Header />
        
    <section className = "section--home">
        <div className = "home--grid">

   <div className = "home-text-box">
        <h1 className = "heading--primary">Admin Bid Settings</h1>
        <p className = "home--description">Configure the required bid settings.</p>

        <a className = "btn btn--full mgr-sm" href = "/your-preferences">Start Now</a>
        <a onClick = {logoutHandler} className = "btn btn--outline" href = "/home">Logout</a>

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
