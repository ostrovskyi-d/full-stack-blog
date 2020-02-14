import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {connect} from "react-redux";
import {getMyUserDataTC, sendRegisterDataTC, toggleAuthTypeTC} from "../../redux/auth-reducer";
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
        return <RegisterForm onSubmit={submitForm} switchAuthType={switchAuthType} {...props}/>
    } else {
        return <LoginForm onSubmit={submitForm} switchAuthType={switchAuthType} {...props}/>
    }
};
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};
export default connect(
    mapStateToProps,
    //mapDispatchToProps
    {
        toggleAuthTypeTC,
        getMyUserDataTC,
        sendRegisterDataTC
    }
)(AuthContainer);