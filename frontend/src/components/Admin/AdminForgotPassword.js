import React, {useState, useEffect, useRef, useReducer, Fragment} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

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

    const [emailAddress, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    return (
        <Fragment>
           
        </Fragment>
    )
}

export default AdminForgotPassword