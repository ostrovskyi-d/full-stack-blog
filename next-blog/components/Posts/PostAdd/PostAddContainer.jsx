import {connect} from "react-redux";
import {sendCreatedPostTC} from "../../../store/reducers/posts-reducer";
import PostAdd from "./PostAdd";
import {withRouter} from 'react-router-dom'
import {compose} from "redux";
import {withAuthOnly} from "../../../HOC/withAuthOnly";

const PostAddContainer = (props) => {

    return <PostAdd {...props}/>;
};

const mapStateToProps = (state) => ({
    isAuthorised: state.auth.isAuthorised,
    status: state.postsPage.status,

});
const mapDispatchToProps = {
    sendCreatedPost: sendCreatedPostTC,
};
export default compose(
    withRouter,
    withAuthOnly,
    connect(mapStateToProps, mapDispatchToProps),
)(PostAddContainer);
