import React from "react";
import {Link} from "react-router-dom";
import s from './Header.module.scss'

const Header = () => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <Link to="/" className={s.logo}/>
                <nav className={s.menu}>
                    <Link to="post/add">
                        Add post
                    </Link>
                </nav>
            </div>
        </header>
    )
};

export default Header;