import React, {useState, useEffect, useRef, useReducer, Fragment} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const emailReducer = (state, action) => { // E-mail Reducer that shares state for the email and valid
     if(action.type === 'EMAIL_SUBMIT') {

     }

     return {value: '', emailIsValid: false};
}

const forgotPasswordSubmitHandler = (event) => {
    event.preventDefault();

    try {

    }
    
    catch(err) {

        if(err) {
            console.log(err);
        }

    }
}

const AdminForgotPassword = (props) => {
    let history = useHistory();

    const [email, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    return (
        <Fragment>
            <form onSubmit = {forgotPasswordSubmitHandler}>

            </form>
        </Fragment>
    )
}

export default AdminForgotPassword