import React, {Fragment} from 'react'

const Input = (props) => {
    return (
         <Fragment>
             <input {...props.type}/>
         </Fragment>
    )
}

export default Input // Export the Input Custom Component