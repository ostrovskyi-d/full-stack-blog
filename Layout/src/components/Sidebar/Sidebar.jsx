import React, {useEffect, useState} from "react";
import s from "./Sidebar.module.scss"
import AuthContainer from "./Auth/AuthContainer";
import {connect} from "react-redux";
import UserPanel from "./UserPanel";
import {getMyUserDataTC} from "../../redux/auth-reducer";


const Sidebar = (props) => {
    // const [userLogin, setUserLogin] = useState(props.userData)
    const {
        isAuthorised,
    } = props.userData;

    return (
        <aside className={s.sidebar}>
            <div className={`${s.box} ${s.auth}`}>
                {!isAuthorised
                    ? <AuthContainer/>
                    : <UserPanel {...props.userData}/>
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
export default connect(mapStateToProps, {getMyUserDataTC})(Sidebar);