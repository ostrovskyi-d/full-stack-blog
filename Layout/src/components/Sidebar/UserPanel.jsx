import React from "react";
import {Button, Icon} from 'antd';


const UserPanel = (props) => {
    const onLogOut = () => {
        props.logOut()
    };
    return (
        <div>
            <h2>Hello, {props.userData.userLogin}</h2>
            <Button loading={props.isFetching} onClick={onLogOut}>
                Log Out
                <Icon type="logout" />
            </Button>
        </div>
    )
};
export default UserPanel;