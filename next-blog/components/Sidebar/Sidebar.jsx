import React, {useEffect} from "react";
import s from "./Sidebar.module.scss"
import AuthContainer from "./Auth/AuthContainer";
import {connect} from "react-redux";
import UserPanel from "./UserPanel/UserPanel";
import {getMyUserDataTC, logOutTC, sendRegisterDataTC, toggleAuthTypeTC} from "../../store/reducers/auth-reducer";

const Sidebar = (props) => {
    const {
        userData: {
            isAuthorised
        },
        getMyUserDataTC
    } = props;

    useEffect(() => {
        if(!isAuthorised) getMyUserDataTC()
    }, []);

    return (
        <aside className={s.sidebar}>
            <div className={`${s.box} ${s.first_box}`}>
                {!isAuthorised
                    ? <AuthContainer {...props}/>
                    : <UserPanel {...props} logOut={props.logOut}/>
                }
            </div>
            <div className={`${s.box} ${s.second_box}`}>box2</div>
        </aside>
    )
};


const mapStateToProps = (state) => {
    return {
        // SHIIIITY double state.auth
        userData: state.auth,
        isFetching: state.common.isFetching,
        authMessage: state.auth.authMessage,
        auth: state.auth,
    }
};
export default connect(mapStateToProps, {
    getMyUserDataTC,
    logOut: logOutTC,
    toggleAuthTypeTC,
    sendRegisterDataTC
})(Sidebar);
