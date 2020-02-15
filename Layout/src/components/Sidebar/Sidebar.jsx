import React, {useEffect} from "react";
import s from "./Sidebar.module.scss"
import AuthContainer from "./Auth/AuthContainer";
import {connect} from "react-redux";
import UserPanel from "./UserPanel";
import {getMyUserDataTC, logOutTC} from "../../redux/auth-reducer";


const Sidebar = (props) => {
    const {
        userData: {
            isAuthorised
        },
        getMyUserDataTC
    } = props;

    useEffect(() => {
        getMyUserDataTC()
    }, [isAuthorised, getMyUserDataTC]);

    return (
        <aside className={s.sidebar}>
            <div className={`${s.box} ${s.auth}`}>
                {!isAuthorised
                    ? <AuthContainer/>
                    : <UserPanel {...props.userData} logOut={props.logOut}/>
                }
            </div>
            <div className={s.box}>box2</div>
        </aside>
    )
};


const mapStateToProps = (state) => {
    return {
        userData: state.auth
    }
};
export default connect(mapStateToProps, {getMyUserDataTC, logOut: logOutTC})(Sidebar);