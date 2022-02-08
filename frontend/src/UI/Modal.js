import React, {} from 'react';
import ModalCard from './ModalCard';
import './Modal.css';

const Modal = (props) => {

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
        <form onSubmit = {props.onSubmitBtnClick}>
            <div className = "title__container">

                <label htmlFor = "title">{props.commTitle}</label>
                {props.showForm && undefined}

                {props.showInputs && <input type = "text" onChange = {(event) => {props.changeHandler(event)}} />}
            </div>

            <div className = "username__container">

                <label htmlFor = "username">{props.username}</label>
                {props.showForm && undefined}

                {props.showInputs && <input type = "text" onChange = {(event) => {props.changeHandler(event)}} />}

            </div>

            <div className = "reason__container">
                <label htmlFor = "reason">{props.reason}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text" onChange = {(event) => {props.changeHandler(event)}} />}
            </div>

            <div className = "description__container">
                <label htmlFor = "description">{props.description}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text"  onChange = {(event) => {props.changeHandler(event)}} />}
            </div>

        </form>

    </div>

    <footer className = "modal__actions">
        {props.showDefaultBtn && <button onClick = {props.onBtnClick} className = "modal__btn">OK</button>}
        {props.showSubmitBtn && <button type = "submit" className = "modal__btn">Submit</button>}
    </footer>

         </ModalCard>
        </div>
    )
}

export default Modal;