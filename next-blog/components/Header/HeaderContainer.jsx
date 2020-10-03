 ;
import Header from "./Header";
import {connect} from "react-redux";
import {logOutTC} from "../../store/reducers/auth-reducer";

const HeaderContainer = (props) => {
    const onLogOut = () => {
        props.logOut();
    };
    return <Header {...props} logOut={onLogOut}/>
};

const mapStateToProps =(state) => ({
    isAuth: state.auth.isAuthorised,
    isFetching: state.common.isFetching
});

export default connect(mapStateToProps, {
    logOut: logOutTC
})(HeaderContainer);
