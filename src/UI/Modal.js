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
        <form>
            <div className = "title__container">
                <label htmlFor = "title">{props.commentTitle}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text" onChange = {(event) => {props.onChange(event)}} />}
            </div>

            <div className = "username__container">
                <label htmlFor = "username">{props.commentUsername}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text" onChange = {(event) => {props.onChange(event)}} />}

            </div>

            <div className = "reason__container">
                <label htmlFor = "reason">{props.commentReason}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text" onChange = {(event) => {props.onChange(event)}} />}
            </div>

            <div className = "description__container">
                <label htmlFor = "description">{props.commentDescription}</label>
                {props.showForm && undefined}
                {props.showInputs && <input type = "text" onChange = {(event) => {props.onChange(event)}} />}
            </div>



        </form>

    </div>

    <footer className = "modal__actions">
        {props.showDefaultBtn && <button onClick = {props.onBtnClick} className = "modal__btn">OK</button>}
        {props.showSubmitBtn && <button onClick = {props.onSubmitBtnClick} className = "modal__btn">Submit</button>}
    </footer>

         </ModalCard>
        </div>
    )
}

export default Modal;