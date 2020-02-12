import React from "react";
import s from "./Sidebar.module.scss"
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
const Header = () => {
    return (
        <aside className={s.sidebar}>
            <div className={`${s.box} ${s.auth}`}>
                <LoginForm />
                <RegisterForm />
            </div>
            <div className={s.box}>box2</div>
        </aside>
)};

export default Header;