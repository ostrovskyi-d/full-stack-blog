import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {connect} from "react-redux";
import {sendRegisterDataTC, toggleAuthTypeTC} from "../../../redux/auth-reducer";
// import {CSSTransition, TransitionGroup} from 'react-transition-group';

const AuthContainer = (props) => {
    const {auth} = props;

    const switchAuthType = (authType) => {
        props.toggleAuthTypeTC(authType)
    };

    const submitForm = values => {
        props.sendRegisterDataTC(values);
    };

    if (auth.currentAuthType === "register") {
        return <RegisterForm submitForm={submitForm} switchAuthType={switchAuthType} {...props}/>
    } else {
        return <LoginForm submitForm={submitForm} switchAuthType={switchAuthType} {...props}/>
    }
};

export default AuthContainer