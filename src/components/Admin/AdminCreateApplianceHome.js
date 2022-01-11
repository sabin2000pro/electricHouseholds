import React, {Fragment} from 'react';
import Header from '../Header';
import HomepageImg from '../images/homepage/homepageimg.jpg';

const AdminCreateApplianceHome = (props) => {

    const logoutHandler = () => {

    }
    
    return (
        <Fragment>
     <Header />
        
        <section className = "section--home">
            <div className = "home--grid">

        <div className = "home-text-box">

        <h1 className = "heading--primary">Your Admin Dashboard</h1>
        <p className = "home--description">Welcome to your Admin Dashboard. Here you will be able to view all of the electrical appliances available that users can submit their preferences for. You have the option to search for appliances if there are too many as well.</p>

        <button className = "btn btn--full mgr-sm" href = "#">View Appliances</button>
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

export default AdminCreateApplianceHome