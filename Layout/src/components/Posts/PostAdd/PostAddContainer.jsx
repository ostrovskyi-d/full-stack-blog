import React from 'react';
import {connect} from "react-redux";
import {sendCreatedPostTC} from "../../../redux/posts-reducer";
import PostAdd from "./PostAdd";
import { withRouter} from 'react-router-dom'
import {compose} from "redux";
import {withAuthOnly} from "../../../HOC/withAuthOnly";

const PostAddContainer = React.memo((props) => {
    return <PostAdd {...props}/>;
    // return message.warn('Please Log in first!')
});

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuthorised,
  status: state.postsPage.status
});
const mapDispatchToProps = {
    sendCreatedPost: sendCreatedPostTC,
};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    withAuthOnly
)(PostAddContainer);