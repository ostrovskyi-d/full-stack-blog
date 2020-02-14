import React from "react";
import {Link, NavLink} from "react-router-dom";
import s from './Header.module.scss'

const Header = (props) => {
    const onLogOut =() => {
        props.logOut();
    };
    return (
        <header className={s.header}>
            <div className={s.container}>
                <Link to="/" className={s.logo}/>
                <nav className={s.menu}>
                    <NavLink to="post/add">
                        Add post
                    </NavLink>
                    <Link onClick={onLogOut} to='#'>
                        Log out
                    </Link>
                </nav>
            </div>
        </header>
    )
};

export default Header;