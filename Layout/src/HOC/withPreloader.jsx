import React from "react";
import Preloader from "../components/common/Preloader";
import {connect} from "react-redux";

let mapStateToPropsForRedirect = (state) => {
    return {
        isFetching: state.auth.isFetching
    }
};

export const withPreloader = Component => {
    const RedirectComponent = props => {
        if (props.isFetching) return <Preloader />;
        return <Component {...props} />
    };

    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};

