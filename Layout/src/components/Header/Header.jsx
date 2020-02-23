import React from "react";
import {Link, NavLink, withRouter, useHistory} from "react-router-dom";
import s from './Header.module.scss'
import {Button, Icon, message} from "antd";

const Header = (props) => {
    const {isAuth, location: {pathname}} = props;

    let history = useHistory();
    const onLogOut = () => {
        props.logOut();
    };
    const showMessage = () => {
        if (!isAuth) message.error('Please, authorise firstly')
    };

    return (
        <header className={s.header}>
            <div className={s.container}>
                <NavLink to="/" className={s.logo}/>
                <nav className={s.menu}>
                    <Button ghost onClick={() => history.goBack()}>
                        <Icon type="left-circle" theme="filled"/>
                        Back to posts
                    </Button>

                    {
                        isAuth
                        && <Link onClick={showMessage} to={(isAuth && '/post/add') || pathname}>
                            <Icon type="plus-circle"/>
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