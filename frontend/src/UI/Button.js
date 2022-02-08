import React from 'react';

const Button = (props) => {
    return (
        <button type = {props.type} onClick = {props.onClick} />
    )
}

export default Button // Export the custom button component