import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserProfileTC} from "../../store/reducers/profile-reducer";
import Profile from "../../components/Profile/Profile";
import {useRouter} from "next/router";
import Preloader from "../../components/common/Preloader";

const ProfileContainer = props => {
  const {query: {user: userName}} = useRouter();

  const {
    getUserProfileTC,
    isFetching,
    userProfile,
  } = props;

  useEffect(() => {
    getUserProfileTC(userName);
    return () => {
      getUserProfileTC(null);
    }
  }, [ userName]);

  if (isFetching || userProfile === null || userProfile === undefined) {
    return <Preloader/>
  } else {
    return <Profile {...props}/>
  }
};

const mapStateToProps = (state) => ({
  userProfile: state.profilePage.userProfile,
  isFetching: state.profilePage.isFetching,
});
const mapDispatchToProps = {
  getUserProfileTC
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
