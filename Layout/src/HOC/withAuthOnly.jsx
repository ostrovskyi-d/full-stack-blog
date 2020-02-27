
import React from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {message} from "antd";
import Preloader from "../components/common/Preloader";

let mapStateToPropsForRedirect = (state) => {
    return {
        isAuthenticated: state.common.isAuthenticated,
        isFetching: state.common.isFetching
    }
};
message.config({
    top: 60,
    duration: 1,
    maxCount: 1,
  });
export const withAuthOnly = (Component) => {
    const RedirectComponent = React.memo((props) => {
        if(props.isFetching) {
            return <Preloader />
        } else if(props.isAuthenticated) {
            return <Component {...props} />
        } else {
            message.warn('Please, log in firstly...');
            return <Redirect to='/' />
        }
        
    });

    return connect(mapStateToPropsForRedirect, [])(RedirectComponent);
};