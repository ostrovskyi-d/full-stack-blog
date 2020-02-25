import React from "react";
import {Button, Icon} from 'antd';
import s from './UserPanel.module.scss';
import {NavLink} from "react-router-dom";

const UserPanel = (props) => {
    const {
        logOut,
        isFetching,
        auth: {
            userLogin
        }
    } = props;
    debugger
    const onLogOut = () => {
        logOut()
    };
    return (
        <>
            <span className={s.greeting}>{userLogin}</span>
            <div className={s.logout}>
                <Button size='small' loading={isFetching}>
                    <NavLink to={`/users/${userLogin}`}>My Posts</NavLink>
                    <Icon type="snippets"/>
                </Button>
            </div>
            <div className={s.logout}>
                <Button loading={isFetching} onClick={onLogOut}>
                   Log Out
                    <Icon type="logout"/>
                </Button>
            </div>
        </>
    )
};
export default UserPanel;