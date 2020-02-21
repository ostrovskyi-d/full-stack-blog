import React from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import s from './Header.module.scss'
import { Button, Icon, message } from "antd";

const Header = (props) => {
    const { isAuth, location: {pathname} } = props;
    const onLogOut = () => {
        props.logOut();
    };
    const showMessage = () => {
        if(!isAuth) message.error('Please, authorise firstly')
    };
    return (
        <header className={s.header}>
            <div className={s.container}>
                <NavLink to="/"  className={s.logo} />
                <nav className={s.menu}>
                    {
                        pathname === '/post/add'
                            ? <Link to='/'>
                                <Icon type="left-circle" theme="filled" />
                                Back to posts
                            </Link>
                            : <Link onClick={showMessage} to={(isAuth && '/post/add') || pathname}>
                                <Icon type="plus-circle" />
                                Add post
                            </Link>
                    }
                    <div style={{'margin': '10px'}}>
                        {isAuth && <Button loading={props.isFetching} onClick={onLogOut} type='ghost'>Log Out</Button>}

                    </div>
                </nav>
            </div>
        </header>
    )
};


export default withRouter(Header);