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
        isFetching,
        userProfile,
        ...rest
    } = props;
    
    useEffect(() => {
        getUserProfileTC(userName);
    }, [getUserProfileTC, userName]);

    if(isFetching || userProfile === null || userProfile === undefined) 
        return <Preloader />;
     else 
        return <Profile {...props}/>
};

const mapStateToProps = (state) => ({
    userProfile: state.profilePage.userProfile,
    isFetching: state.profilePage.isFetching,
});
const mapDispatchToProps = {
    getUserProfileTC
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(ProfileContainer);