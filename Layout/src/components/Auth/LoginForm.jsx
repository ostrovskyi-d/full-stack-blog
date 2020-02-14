import s from "../Sidebar/Sidebar.module.scss";
import React from "react";
import {Field, reduxForm} from 'redux-form'

let LoginForm = (props) => {

    const onSwitchAuth = (e) => {
        e.preventDefault();
        props.switchAuthType('register');
    };
    // debugger
    return (
        <form onSubmit={props.handleSubmit} method="POST" className={s.login}>
            <h2>Enter</h2>
            <div className={s.form_group}>
                <label htmlFor="log-login">Name:</label>
                <Field component='input' type="text" name="login" id="log-login"/>
            </div>
            <div className={s.form_group}>
                <label htmlFor="log-password">Password:</label>
                <Field component='input' type="password" name="password" id="log-password"/>
            </div>
            <div className={s.buttons}>
                <button id="submit-login" type="submit" className={s.button}>Login</button>
                <button onClick={onSwitchAuth} className={s.secondaryInverse}>To Register</button>
            </div>
        </form>
    )
};

export default LoginForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)