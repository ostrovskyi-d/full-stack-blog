import React, { useEffect } from "react";
import Posts, { RenderPosts } from "../Posts/Posts";
import { connect } from "react-redux";
import {getAllPostsTC, getReqPageTC} from "../../redux/posts-reducer";
import { NavLink } from "react-router-dom";
import { Button, Icon } from "antd";
import s from './Newest.module.scss'
import DatabaseOutlined from "@ant-design/icons/lib/icons/DatabaseOutlined";

const Newest = props => {
    const { posts, getReqPageTC, isFetching, getAllPostsTC } = props;
    useEffect(() => {
        getAllPostsTC()
    }, [getAllPostsTC]);
    return <>
        <Posts {...props} />
        {/*<RenderPosts posts={posts.postsStore} />*/}
        <div className={s.home_wrapper}>
            {posts.totalPostsCount > posts.pageSize
                ? <NavLink className={s.to_archive} to={`/archive/2`}>
                    <Button shape='round'>
                        <DatabaseOutlined />
                        To archive
                    </Button>
                </NavLink>
                : null
            }
        </div>


    </>
};
const mapStateToProps = (state) => ({
    posts: state.postsPage,
    isFetching: state.common.isFetching
});
const mapDispatchToProps = {
    getReqPageTC,
    getAllPostsTC
};
export default connect(mapStateToProps, mapDispatchToProps)(Newest);
