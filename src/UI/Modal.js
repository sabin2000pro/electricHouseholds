import React, {useState, useEffect} from 'react';
import ModalCard from './ModalCard';
import './Modal.css';

const Modal = (props) => {
    const [title, setTitle] = useState('');

    return (
        <div className = "backdrop" onClick = {props.onClick}>
            <ModalCard className = "modal">

            <header className = "modal__header">
        <h2>{props.title}</h2>
    </header>

    <div className = "modal__content">
        <p>{props.message}</p>
    </div>

    <div>
        <form>
            <div className = "title">
                <label htmlFor = "title">{props.inputTitle}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text"/>}
            </div>

            <div className = "username__container">
                <label htmlFor = "username">{props.inputUsername}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text"/>}
            </div>
        </form>

    </div>

    <footer className = "modal__actions">

    <button className = "modal__btn">OK</button>
    </footer>

         </ModalCard>
        </div>
    )
}

export default Modal;