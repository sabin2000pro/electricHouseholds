import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
   return <div>{props.children}</div>
}

Card.propTypes = {
    children: PropTypes.node.isRequired
}

export default Card