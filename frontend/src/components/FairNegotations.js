import React, {useState, useEffect, Fragment, useRef} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Header from './Header';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';

const DELAY = 1200;
const START_TIMER = 60;
const REFRESH_SECONDS = 30000;
const bidData = [];

const FLAGS = {

}

const FairNegotations = (props) => {
    let history = useHistory();
    const [feedbackData, setFeedbackData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [creditData, setCreditData] = useState([]);

    return (
        <Fragment>
            <div>

            </div>
        </Fragment>
    )
}

export default FairNegotations
