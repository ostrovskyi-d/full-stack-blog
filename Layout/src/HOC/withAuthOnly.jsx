
import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {message} from "antd";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuthorised: state.auth.isAuthorised
    }
};
export const withAuthOnly = (Component) => {
    const RedirectComponent = (props) => {
        if (!props.isAuthorised) {
            // message.warn('Please, log in firstly...');
            return <Redirect to={`/`}/>;
        }
        return <Component {...props} />
    };

    return connect(mapStateToPropsForRedirect, [])(RedirectComponent);
};