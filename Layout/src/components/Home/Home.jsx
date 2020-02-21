import React, {useEffect} from "react";
import {RenderPosts} from "../Posts/Posts";
import {connect} from "react-redux";
import {getReqPageTC} from "../../redux/posts-reducer";
import {NavLink} from "react-router-dom";
import {Button, Icon} from "antd";
import s from './Home.module.scss'

const Home = ({posts, getReqPageTC}) => {
    useEffect(() => {
        getReqPageTC()
    }, []);
    return <>
        <div className={s.home_wrapper}>
            <h3>NEWEST</h3>
            <NavLink className={s.to_archive} to={`/archive/2`}>
                <Button shape='round'>
                    <Icon type="database" />
                    To archive
                </Button>

            </NavLink>
        </div>

        <RenderPosts posts={posts.postsStore}/>

    </>
};
const mapStateToProps = (state) => ({
    posts: state.postsPage,
});
const mapDispatchToProps = {
    getReqPageTC
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);