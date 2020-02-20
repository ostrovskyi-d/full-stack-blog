import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

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