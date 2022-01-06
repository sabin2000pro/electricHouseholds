import React, {useState, Fragment} from 'react';
import {Link} from 'react-router-dom';
import RegisterCard from '../Admin/RegisterCard';

const CreateContact = (props) => {
   const [firstName, setFirstName] = useState('');
   const [firstNameValid, setFirstNameValid] = useState(true);



    return (
        <Fragment>
             <div className = "container grid grid--2-cols">

        <RegisterCard>
            <h1 className = "heading--primary login">Contact Us</h1>
            <form className = "login--form">

    
       <div className = "forename--box">
           <label className = "forename--lbl">Forename</label>
           <input  placeholder = "Enter your E-mail" type = "email"/>
       </div>

       <div className = "password--box">
           <label className = "password--lbl">Last Name</label>
           <input placeholder = "Enter your Password" required id = "password" type = "password"/>
       </div>

       <div className = "password--box">
           <label className = "password--lbl">Username</label>
           <input placeholder = "Enter your Password" required id = "password" type = "password"/>
       </div>
       

       <p className = "already--text">Forgot your password?</p>
       <Link className = "link--to" to = '/admin-resetpassword'>Reset Here!</Link>

       <div className = "submit--container">
           <button className = "login--btn" type = "submit">Login</button>
       </div>

    </form>

</RegisterCard>

</div>    
        </Fragment>
    )
}

export default CreateContact