import React from 'react';
import ModalCard from './ModalCard';
import './Modal.css';

const Modal = (props) => {
    return (
        <div className = "backdrop">
            <ModalCard className = "modal">

            <header className = "modal__header">
        <h2>{props.title}</h2>
    </header>

    <div className = "modal__content">
        <p>{props.message}</p>
    </div>

    <footer className = "modal__actions">
    <button>OK</button>
    </footer>

            </ModalCard>
        </div>
    )
}

export default Modal;