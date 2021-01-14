import React from 'react'
import ProfileContainer from '../../components/Profile/ProfileContainer'
import {connect} from "react-redux";
import HeaderContainer from "../../components/Header/HeaderContainer";
import FooterContainer from "../../components/Footer/FooterContainer";
import Sidebar from "../../components/Sidebar/Sidebar";
import s from "../App.module.scss";
import Newest from "../../components/Newest/Newest";

const ProfileNextWrapper = () => {
  return (<>
    <div className={s.wrapper}>
      <HeaderContainer/>
      <main className={s.main}>
        <div className={s.container}>
          <div className={s.content}>
            <ProfileContainer/>
          </div>
          <Sidebar/>
        </div>
      </main>
      <FooterContainer/>
    </div>
  </>)
}


export default ProfileNextWrapper;
