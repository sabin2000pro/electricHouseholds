import React, {useState, useEffect, useRef, useReducer, Fragment} from 'react';
import {useHistory, useLocation} from 'react-router-dom';

const AdminForgotPassword = (props) => {
    let history = useHistory();

    const [email, setEmailAddress] = useState('');
    const [emailValid, setEmailValid] = useState(false);
    const [formIsValid, setFormIsValid] = useState(false);

    return (
        <Fragment>
            
        </Fragment>
    )
}

export default AdminForgotPassword