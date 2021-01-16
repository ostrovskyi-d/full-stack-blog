import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserProfileTC} from "../../store/reducers/profile-reducer";
import Profile from "./Profile";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";

const ProfileContainer = props => {
  const {
    getUserProfileTC,
    isFetching,
    userProfile,
    auth: {
      userLogin
    }
  } = props;

  useEffect(() => {
    getUserProfileTC(userLogin);
  }, [getUserProfileTC, userLogin]);

  if (!userProfile || isFetching) {
    return <Preloader/>
  } else {
    return <Profile {...props}/>
  }
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userProfile: state.profilePage.userProfile,
  isFetching: state.profilePage.isFetching,
});
const mapDispatchToProps = {
  getUserProfileTC
};


export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ProfileContainer);
