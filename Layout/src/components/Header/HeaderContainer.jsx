import React from "react";
import {Link, NavLink} from "react-router-dom";
import s from './Header.module.scss'
import Header from "./Header";
import {connect} from "react-redux";
import mapDispatchToProps from "react-redux/lib/connect/mapDispatchToProps";
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