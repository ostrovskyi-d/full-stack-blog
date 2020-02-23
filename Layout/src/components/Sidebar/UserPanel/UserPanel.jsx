import React from "react";
import {Button, Icon} from 'antd';
import s from './UserPanel.module.scss';
import {NavLink} from "react-router-dom";

const UserPanel = (props) => {
    const onLogOut = () => {
        props.logOut()
    };
    debugger
    return (
        <>
            <span className={s.greeting}>{props.userData.userLogin}</span>
            <div className={s.logout}>
                <Button size='small' loading={props.isFetching}>
                    <NavLink to={`/users/${props.auth.userLogin}`}>My Posts</NavLink>
                    <Icon type="snippets"/>
                </Button>
            </div>
            <div className={s.logout}>
                <Button loading={props.isFetching} onClick={onLogOut}>
                   Log Out
                    <Icon type="logout"/>
                </Button>
            </div>
        </>
    )
};
export default UserPanel;