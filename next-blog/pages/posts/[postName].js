import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useRouter} from "next/router";
import Link from 'next/link';
import appStyles from '../App.module.scss';
import {getOnePostTC} from "../../store/reducers/posts-reducer";
import Preloader from "../../components/common/Preloader";
import {Button} from "antd";
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";
import {timeStampPrettifier} from '../../components/common/helpers/helpers';
import s from "../../components/Posts/FullPost/FullPost.module.scss";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import Sidebar from "../../components/Sidebar/Sidebar";

const FullPost = props => {
  const {isFetching, getOnePostTC} = props;
  const router = useRouter();
  const {query: {postName}} = router;

  useEffect(() => {
    postName && getOnePostTC(postName)
  }, [getOnePostTC, postName]);

  return <div className={appStyles.wrapper}>
    <HeaderContainer/>
    <main className={appStyles.main}>
      <div className={appStyles.container}>
        <div className={appStyles.content}>
          {
            isFetching
                ? <Preloader/>
                : props.post.map(post => <RenderPost postName={postName} {...post} key={post.id}/>)
          }
        </div>
        <Sidebar/>
      </div>
    </main>



    <FooterContainer/>
  </div>
};
const RenderPost = (post) => {

  timeStampPrettifier(post.createdAt)
  return (
      <div className={s.post}>
        <div className={s.post_top}>
          <h2 className={s.post_top_title}>
            {post.title}
          </h2>
        </div>
        <div className={s.post_bottom}>
          <div className={s.post_bottom_author}>

            {post.author
                ? <div>Author: <Link href={`/users/${post.author.login}`}>
                  <a>{post.author.login || 'Hacker'}</a>
                </Link></div>
                : null
            }

          </div>
          <div>
            Created: <Moment date={post.createdAt}/>
          </div>

        </div>
        <div className={s.post_body}>
          <ReactMarkdown source={post.body}/>
        </div>
        <div className={s.post_bottom_comments}>
          <Link href={`/post/${post.postName}/comments`}>
            <Button>Comments</Button>
          </Link>
        </div>
      </div>
  )
}
const mapStateToProps = (state) => ({
  post: state.postsPage.postsStore,
  isFetching: state.common.isFetching
});
const mapDispatchToProps = {
  getOnePostTC
};
export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
