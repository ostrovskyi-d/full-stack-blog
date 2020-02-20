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
                <Link to="/" className={s.logo} />
                <nav className={s.menu}>
                    {
                        pathname === '/post/add'
                            ? <NavLink to='/'>
                                <Icon type="left-circle" theme="filled" />
                                Back to posts
                            </NavLink>
                            : <NavLink onClick={showMessage} to={isAuth && 'post/add'}>
                                <Icon type="plus-circle" />
                                Add post
                            </NavLink>
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