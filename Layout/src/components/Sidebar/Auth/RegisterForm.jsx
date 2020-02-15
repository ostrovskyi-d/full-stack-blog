import s from "../Sidebar.module.scss";
import React from "react";
import {Field, reduxForm} from 'redux-form'
import {Button} from "antd";

let RegisterForm = (props) => {

    const onSwitchAuth = (e) => {
        e.preventDefault();
        props.switchAuthType('login');
    };
    return (
        <form onSubmit={props.handleSubmit} method="POST" className={s.register}>
            <h2>Register</h2>

            <div className={s.form_group}>
                <label htmlFor="reg-login">Name:</label>
                <Field component='input' type="text" name="login" id="reg-login"/>
            </div>
            <div className={s.form_group}>
                <label htmlFor="reg-password">Password:</label>
                <Field component='input' type="password" name="password" id="reg-password"/>
            </div>
            <div className={s.form_group}>
                <label htmlFor="pass-repeat">Repeat your password:</label>
                <Field component='input' type="password" name="password-repeat" id="pass-repeat"/>
            </div>
            <div className={`${s.buttons} buttons-reg`}>
                <Button htmlType='submit' type='primary' id="submit-login">Create</Button>
                <Button onClick={onSwitchAuth} className={`${s.secondaryInverse} switch-button reg-button`}>To
                    Login</Button>

            </div>
        </form>)
};
export default RegisterForm = reduxForm({
    // a unique name for the form
    form: 'register'
})(RegisterForm)