import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOutTC} from "../../redux/auth-reducer";

const HeaderContainer = (props) => {
    const onLogOut = () => {
        props.logOut();
    };
    return <Header logOut={onLogOut}/>
};

export default connect(null, {
    logOut: logOutTC
})(HeaderContainer);