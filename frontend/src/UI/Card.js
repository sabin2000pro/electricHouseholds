import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

const Card = (props) => {
   return <div className = {`${props.reverse ? 'card' : 'card--other'}`}>{props.children}</div>
}

Card.propTypes = {
    children: PropTypes.node.isRequired
}

export default Card