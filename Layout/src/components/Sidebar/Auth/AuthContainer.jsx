import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthContainer = (props) => {
    const {
        auth,
        toggleAuthTypeTC,
        sendRegisterDataTC
    } = props;
    debugger
    const switchAuthType = (authType) => {
        toggleAuthTypeTC(authType)
    };

    const submitForm = values => {
        sendRegisterDataTC(values);
    };
    if (auth.currentAuthType === "register") {
        return <RegisterForm submitForm={submitForm} switchAuthType={switchAuthType} {...props}/>
    } else {
        return <LoginForm submitForm={submitForm} switchAuthType={switchAuthType} {...props}/>
    }
};

export default AuthContainer