import React from 'react';
import {connect} from "react-redux";
import {sendCreatedPostTC} from "../../../store/reducers/posts-reducer";
import PostAdd from "./PostAdd";
import {useRouter} from "next/router";

import {compose} from "redux";

const PostAddContainer = (props) => {
    const router = useRouter();
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
    connect(mapStateToProps, mapDispatchToProps),
)(PostAddContainer);
