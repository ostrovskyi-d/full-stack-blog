import React, {useEffect} from "react";
import Posts, {RenderPosts} from "../Posts/Posts";
import {connect} from "react-redux";
import {getAllPostsTC, getReqPageTC} from "../../store/reducers/posts-reducer";
// import { NavLink } from "react-router-dom";
import {Button, Icon} from "antd";
import s from './Newest.module.scss'
import DatabaseOutlined from "@ant-design/icons/lib/icons/DatabaseOutlined";
import Link from 'next/link'

const Newest = props => {
  const {posts, getReqPageTC, isFetching, getAllPostsTC} = props;

  useEffect(() => {
    getAllPostsTC()
  }, []);

  return <>
    <Posts {...props} />
    <RenderPosts posts={posts.postsStore}/>
    <div className={s.home_wrapper}>

      <Link href={`/archive/2`}>
        <a className={s.to_archive}>
          <Button shape='round'>
            <DatabaseOutlined/>
            To archive
          </Button>
        </a>
      </Link>
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
