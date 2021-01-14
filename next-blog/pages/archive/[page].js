import React from 'react';
import PostsContainer from "../../components/Posts/PostsContainer";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import s from "../App.module.scss";
import Newest from "../../components/Newest/Newest";


const PostsPage = () => {
  return (
      <>
        <div className={s.wrapper}>
          <HeaderContainer/>
          <main className={s.main}>
            <div className={s.container}>
              <div className={s.content}>
                <PostsContainer/>
              </div>
              <Sidebar/>
            </div>
          </main>

          <FooterContainer/>
        </div>
      </>
  )
}

export default PostsPage;
