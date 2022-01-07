import React, {useState, Fragment} from 'react';
import RegisterCard from '../Admin/RegisterCard';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import {motion, AnimatePresence} from 'framer-motion';

const CreateContact = (props) => {
   let history = useHistory();

   const [firstName, setFirstName] = useState('');
   const [firstNameValid, setFirstNameValid] = useState(true);
   const [lastName, setLastName] = useState('');
   const [lastNameValid, setLastNameValid] = useState(false);
   const [username, setUsername] = useState('');
   const [usernameValid, setUsernameValid] = useState(false);
   const [emailAddress, setEmailAddress] = useState('');
   const [emailValid, setEmailValid] = useState(false);
   const [issueType, setIssueType] = useState('');
   const [issueTypeValid, setIssueTypeValid] = useState(false);
   const [description, setDescription] = useState('');
   const [descriptionValid, setDescriptionValid] = useState(false);
   const [formValid, setFormValid] = useState(true);

   const contactUsHandler = async (e) => {

       try {

            e.preventDefault(); // Prevent form resubmission

            // Validate Data
            if(firstName.trim().length === 0 || lastName.trim().length === 0) {
                setFormValid(false);
            }

            if(!emailAddress.includes("@")) {
                setEmailValid(false); // E-mail not valid
                setFormValid(false);
            }

            const {data} = await axios.post(`http://localhost:5200/api/v1/contacts/create-contact`, {firstName, lastName, username, emailAddress, issueType, description});
            console.log(data);
            
            setFormValid(true);

            setTimeout(() => {
                return history.push('/home')
            }, 2000);



       } 


       catch(error) {

        if(error) {
            return console.log(error);
        }
    }

   }


    return (
        <Fragment>
             <div className = "container grid grid--2-cols">

        <RegisterCard>
            <h1 className = "heading--primary login">Contact Us</h1>
            
    <form onSubmit = {contactUsHandler} method = "POST" className = "login--form">

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