import React, {Fragment, useState, useEffect} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import axios from 'axios';

const EditAppliance = () => {
    let history = useHistory();
    let location = useLocation();
    const {name, image, description} = location.state.appliance;

    return (
    <Fragment>
        <div>
            
        </div>

        </Fragment>
    )
}

export default EditAppliance
