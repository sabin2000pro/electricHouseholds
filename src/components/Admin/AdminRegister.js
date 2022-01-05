import React, {Fragment, useState, useEffect} from 'react';
import Header from '../../components/Header';
import HomepageImg from '../../components/images/homepage/homepageimg.jpg';

const AdminRegister = (props) => {
    const [username, setUsername] = useState('');
    return (
         <Fragment>
            <Header />

<section className = "section--home">
        <div className = "home--grid">

       <div className = "home-text-box">


         <h1 className = "heading--primary">Admin Dashboard Registration</h1>
        <p className = "home--description">If you wish to have access to the Admin Dashboard. Please Register an account with us below and explore our options.</p>

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

export default AdminRegister