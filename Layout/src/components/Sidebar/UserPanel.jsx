import React from "react";
import {Button, Icon} from 'antd';


const UserPanel = (props) =>
    <div>
        <h2>Hello, {props.userLogin}</h2>
        <Button onClick={props.logOut}>
            Log Out
            <Icon type="logout"/>
        </Button>
    </div>
;


export default UserPanel;