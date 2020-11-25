
import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {message} from "antd";
import Preloader from "../components/common/Preloader";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuthorised,
        isFetching: state.common.isFetching
    }
};
message.config({
    top: 60,
    duration: 1.5,
    maxCount: 1,
  });
export const withAuthOnly = (Component) => {
    const RedirectComponent = React.memo(({isFetching, isAuth = false, ...rest}) => {
        if(isAuth) {
            return <Component {...rest} />
        } else if(isFetching) {
            return <Preloader />
        } else {
            message.warn('Please, log in firstly...');
            return <Redirect to='/' />
        }

    });

    return connect(mapStateToPropsForRedirect, [])(RedirectComponent);
};
