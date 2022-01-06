import React, {Fragment} from 'react'

const Input = (props) => { // Input Component
    return (
         <Fragment>
             <input onBlur = {props.onBlurHandler} type = {props.type} id = {props.id} value = {props.value} placeholder = {props.placeholder} />
         </Fragment>
    )
}

export default Input // Export the Input Custom Component