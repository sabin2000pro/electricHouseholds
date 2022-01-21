import React from 'react';
import './ModalCard.css';

const ModalCard = (props) => {
    return <div className = {`${props.className} modal__card`}>{props.children}</div>
}

export default ModalCard