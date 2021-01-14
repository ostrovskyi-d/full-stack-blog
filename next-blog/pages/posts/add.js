import React from 'react';
import PostAddContainer from "../../components/Posts/PostAdd/PostAddContainer";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import s from "../App.module.scss";
import Newest from "../../components/Newest/Newest";
import Sidebar from "../../components/Sidebar/Sidebar";

const NextPostAdd = () => {
  return (
      <div className={s.wrapper}>
        <HeaderContainer/>
        <main className={s.main}>
          <div className={s.container}>
            <div className={s.content}>
              <PostAddContainer/>
            </div>
            <Sidebar/>
          </div>
        </main>
        {/*<MainRoutesContainer/>*/}
        <FooterContainer/>
      </div>
  )
};


export default NextPostAdd;

