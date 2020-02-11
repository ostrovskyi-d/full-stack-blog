import React from "react";
import {Link} from "react-router-dom";
import  './Header.module.scss';


const Header = () => {
    return (

        <header className="header">
            <div className="container">
                <Link to="/" className="logo"/>
                <nav className="menu">
                    <Link to="post/add">
                        Add post
                    </Link>
                </nav>
            </div>
        </header>
    )
};

export default Header;