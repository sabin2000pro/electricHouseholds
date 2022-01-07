import React, {useState, Fragment} from 'react';

const AdminResetPassword = ({match}) => {
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordValid, setNewPasswordValid] = useState(false);
    const [formValid, setFormValid] = useState(false);

    return (
        <Fragment>
            <div>
                <h1>Reset Password</h1>
                <label>PASSWORD</label>
                <input type = "text" />
            </div>
        </Fragment>
    )
}

export default AdminResetPassword // Reset Password Component Exported