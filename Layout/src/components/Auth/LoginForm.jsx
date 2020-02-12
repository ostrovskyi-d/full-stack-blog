import s from "../Sidebar/Sidebar.module.scss";
import React from "react";

const LoginForm = (props) => {
    const onSwitchAuth = () => {

    }
    return (
        <form method="POST" className={s.login}>
            <h2>Enter</h2>
            <div className={s.form_group}>
                <label htmlFor="log-login">Name:</label>
                <input type="text" name="login" id="log-login"/>
            </div>
            <div className={s.form_group}>
                <label htmlFor="log-password">Password:</label>
                <input type="password" name="password" id="log-password"/>
            </div>
            <div className={s.buttons}>
                <button id="submit-login" type="submit" className={s.button}>Login</button>
                <button onClick={onSwitchAuth} className={s.secondaryInverse}>To Register</button>
            </div>
        </form>
    )
};

export default LoginForm;