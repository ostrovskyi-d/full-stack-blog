import s from "../Sidebar.module.scss";
import React from "react";
import {Field, reduxForm} from 'redux-form'
import {Button} from "antd";


let LoginForm = (props) => {

    const onSwitchAuth = (e) => {
        e.preventDefault();
        props.switchAuthType('register');
    };
    // debugger
    return (
        <form onSubmit={props.handleSubmit} method="POST">
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
                <Button htmlType='submit' type='primary' id="submit-login">Login</Button>
                <Button onClick={onSwitchAuth} className={s.secondaryInverse}>To Register</Button>
            </div>
        </form>
    )
};

export default LoginForm = reduxForm({
    // a unique name for the form
    form: 'login'
})(LoginForm)