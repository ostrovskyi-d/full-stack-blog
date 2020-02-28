import React from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const formStyles = {
    roundedBorder: {
        borderRadius: "50px"
    },
    buttonsMargin: {
        marginTop: '7.5px',
        marginBottom: '7.5px',
    }
};
const AuthContainer = (props) => {
    const {auth} = props;

    const switchAuthType = (authType) => {
        props.toggleAuthTypeTC(authType)
    };

    const submitForm = values => {
        props.sendRegisterDataTC(values);
    };
    if (auth.currentAuthType === "register") {
        return <RegisterForm
            style={formStyles}
            submitForm={submitForm}
            switchAuthType={switchAuthType}
            {...props}
        />
    } else {
        return <LoginForm
            style={formStyles}
            submitForm={submitForm}
            switchAuthType={switchAuthType}
            {...props}
        />
    }
};

export default AuthContainer
