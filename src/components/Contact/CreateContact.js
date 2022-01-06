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
           <input  placeholder = "Enter your First Name" type = "text"/>
       </div>

       <div className = "lastname--box">
           <label className = "lastname--lbl">Last Name</label>
           <input placeholder = "Enter your Last Name" required id = "lastName" type = "text"/>
       </div>

       <div className = "username--box">
           <label className = "username--lbl">Username</label>
           <input placeholder = "Enter your Username" required id = "username" type = "text"/>
       </div>

       <div className = "email--box">
           <label className = "email--lbl">E-mail</label>
           <input placeholder = "Enter your E-mail Address" required id = "email" type = "email"/>
       </div>

       <div className = "issueType--box">
       <label className = "issue--lbl" htmlFor = "issue">Issue Type</label>

           <select className = "box">
               <option>Homepage</option>
               <option>Register</option>
               <option>Login</option>
               <option>Algorithms</option>
               <option>Preferences</option>
           </select>
       </div>


       <div className = "description--box">
           <label className = "description--lbl">Description</label>
           <input placeholder = "Enter your Description" required id = "description" type = "text"/>
       </div>

       <div className = "submit--container">
           <button className = "submit--btn" type = "submit">Submit</button>
       </div>

    </form>

</RegisterCard>

</div>    
        </Fragment>
    )
}

export default CreateContact