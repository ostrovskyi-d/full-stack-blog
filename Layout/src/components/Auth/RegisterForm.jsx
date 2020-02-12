import s from "../Sidebar/Sidebar.module.scss";
import React from "react";


const RegisterForm = () => {
    return (
        <form method="POST" className={s.register}>
            <h2>Register</h2>

            <div className={s.form_group}>
                <label htmlFor="reg-login">Name:</label>
                <input type="text" name="login" id="reg-login" />
            </div>
            <div className={s.form_group}>
                <label htmlFor="reg-password">Password:</label>
                <input type="password" name="password" id="reg-password" />
            </div>
            <div className={s.form_group}>
                <label htmlFor="pass-repeat">Repeat your password:</label>
                <input type="password" name="password-repeat" id="pass-repeat" />
            </div>
            <div className={s.buttons+'buttons-reg'} >
                <button id="submit-register" type="submit" className="create-button">Create</button>
                <button className={s.secondaryInverse + "switch-button reg-button"}>To Login</button>
            </div>
        </form>)
};

export default RegisterForm;
