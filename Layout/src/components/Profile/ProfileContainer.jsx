import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserProfileTC} from "../../redux/profile-reducer";
import Profile from "./Profile";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import Preloader from "../common/Preloader";

const ProfileContainer = props => {
    const {
        getUserProfileTC,
        match: {params: {userName}},
        ...rest
    } = props;

    useEffect(() => {
        getUserProfileTC(userName);
    }, [getUserProfileTC, userName]);

    if(rest.userProfile) {
        return <Profile {...rest}/>
    } else {
        return <Preloader />
    }
};

const mapStateToProps = (state) => ({
    userProfile: state.profilePage.userProfile
});
const mapDispatchToProps = {
    getUserProfileTC
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer);