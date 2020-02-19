import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOutTC} from "../../redux/auth-reducer";

const HeaderContainer = (props) => {
    const onLogOut = () => {
        props.logOut();
    };
    return <Header {...props} logOut={onLogOut}/>
};

const mapStateToProps =(state) => ({
    isAuth: state.auth.isAuthorised,
    isFetching: state.auth.isFetching
});

export default connect(mapStateToProps, {
    logOut: logOutTC
})(HeaderContainer);