import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getUserProfileTC} from "../../store/reducers/profile-reducer";
import Profile from "./Profile";
import {useRouter} from "next/router";
import Preloader from "../common/Preloader";

const ProfileContainer = props => {
    const router = useRouter();
    const {user} = router.query;

    const {
        getUserProfileTC,
        isFetching,
        userProfile,
    } = props;

    useEffect(() => {
        getUserProfileTC(user);
    }, [getUserProfileTC, user]);

    if( !userProfile || isFetching) {
        return <Preloader />
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
