import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuthorised: state.auth.isAuthorised
    }
};

export const withAuth = Component => {
    const RedirectComponent = props => {
        if (!props.isAuthorised) return <Redirect to={`/`}/>;
        return <Component {...props} />
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};

