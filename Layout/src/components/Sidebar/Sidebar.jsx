import React from "react";
import s from "./Sidebar.module.scss"
import AuthContainer from "../Auth/AuthContainer";


const Sidebar = () => {
    return (
        <aside className={s.sidebar}>
            <div className={`${s.box} ${s.auth}`}>
                <AuthContainer />
            </div>
            <div className={s.box}>box2</div>
        </aside>
)};

export default Sidebar;