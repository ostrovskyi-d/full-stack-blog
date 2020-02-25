import React, {useEffect} from "react";
import s from "./Sidebar.module.scss"
import AuthContainer from "./Auth/AuthContainer";
import {connect} from "react-redux";
import UserPanel from "./UserPanel/UserPanel";
import {getMyUserDataTC, logOutTC, sendRegisterDataTC, toggleAuthTypeTC} from "../../redux/auth-reducer";
import {message} from 'antd'

const Sidebar = (props) => {
    const {
        auth: {
            isAuthorised
        },
        getMyUserDataTC,
        logOutTC
    } = props;

    useEffect(() => {
        getMyUserDataTC()
    }, [isAuthorised, getMyUserDataTC]);

    return (
        <aside className={s.sidebar}>
            <div className={`${s.box} ${s.first_box}`}>
                {!isAuthorised
                    ? <AuthContainer {...props}/>
                    : <UserPanel {...props} logOut={logOutTC}/>
                }
            </div>
            <div className={`${s.box} ${s.second_box}`}>box2</div>
        </aside>
    )
};


const mapStateToProps = (state) => {
    return {
        isFetching: state.common.isFetching,
        auth: state.auth,
    }
};
export default connect(mapStateToProps, {
    getMyUserDataTC,
    logOutTC,
    toggleAuthTypeTC,
    sendRegisterDataTC
})(Sidebar);