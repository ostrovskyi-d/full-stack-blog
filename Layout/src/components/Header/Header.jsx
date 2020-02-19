import React from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import s from './Header.module.scss'
import { Button, Icon } from "antd";

const Header = (props) => {
    const { isAuth, location: {pathname} } = props;
    const onLogOut = () => {
        props.logOut();
    };

    return (
        <header className={s.header}>
            <div className={s.container}>
                <Link to="/" className={s.logo} />
                <nav className={s.menu}>
                    {
                        pathname === '/post/add'
                            ? <NavLink to='/'>
                                <Icon type="left-circle" theme="filled" />
                                Back to posts
                            </NavLink>
                            : <NavLink to='post/add'>
                                <Icon type="plus-circle" />
                                Add post
                            </NavLink>
                    }

                    {isAuth && <Button loading={props.isFetching} onClick={onLogOut} type='ghost'>Log Out</Button>}
                </nav>
            </div>
        </header>
    )
};


export default withRouter(Header);