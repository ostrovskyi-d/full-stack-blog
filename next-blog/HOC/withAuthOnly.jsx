import React from "react";
import {connect} from "react-redux";
import {message} from "antd";
import Preloader from "../components/common/Preloader/Preloader";
import {useState} from "react/cjs/react.production.min";

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

    if (isFetching) {
      return <Preloader />
    } else if (!isAuth) {
      return message.warn('Please, log in firstly...');
    } else {
      return <Component {...rest} />
    }
  })

  return connect(mapStateToPropsForRedirect, [])(RedirectComponent);
};
