import React, {useState, useEffect, Fragment, useRef} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import Header from './Header';
import RegisterCard from './Admin/RegisterCard';
import axios from 'axios';

const DELAY = 1200;
const START_TIMER = 60;
const REFRESH_SECONDS = 30000;
const bidData = [];

const FairNegotations = (props) => {
    let history = useHistory();
    const [feedbackData, setFeedbackData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);
    const [creditData, setCreditData] = useState([]);

    const findMinBid = (bid) => {
        try {

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    };

    const findMaxBid = () => {
        try {

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }

    }

    const countTotalBids = () => {
        try {
             
        }
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    }

    const submitBidHandler = (event) => {
        try {
            event.preventDefault();

        } 
        
        catch(error) {

            if(error) {
                return console.error(error);
            }
        }
    }

    const fetchAllBids = async () => {
        try {

         return await axios.get(``).then(response => {


            }).catch(err => {

            if(err) {
                return console.error(err);
            }
            });
        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    }

    const submitFeedbackHandler = () => {
        try {

        } 
        
        catch(error) {
            if(error) {
                return console.error(error);
            }
        }
    }

    const handleEnglishAuctionAlgorithm = () => {

    };

    return (
        <Fragment>
            <div>

            </div>
        </Fragment>
    )
}

export default FairNegotations // Export Component