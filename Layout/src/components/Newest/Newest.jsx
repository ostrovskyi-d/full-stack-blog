import React, {useEffect} from "react";
import {RenderPosts} from "../Posts/Posts";
import {connect} from "react-redux";
import {getReqPageTC} from "../../redux/posts-reducer";
import {NavLink} from "react-router-dom";
import {Button, Icon} from "antd";
import s from './Newest.module.scss'

const Newest = ({posts, getReqPageTC}) => {
    useEffect(() => {
        getReqPageTC()
    }, []);
    return <>
        <RenderPosts posts={posts.postsStore}/>
        <div className={s.home_wrapper}>
            <NavLink className={s.to_archive} to={`/archive/2`}>
                <Button shape='round'>
                    <Icon type="database" />
                    To archive
                </Button>

            </NavLink>
        </div>


    </>
};
const mapStateToProps = (state) => ({
    posts: state.postsPage,
});
const mapDispatchToProps = {
    getReqPageTC
};
export default connect(mapStateToProps, mapDispatchToProps)(Newest);