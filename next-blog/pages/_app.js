import 'antd/dist/antd.css'
import s from "./App.module.scss";

import {Provider} from 'react-redux';
import {createWrapper} from 'next-redux-wrapper';
import store from '../store/store'
import React from "react";


import HeaderContainer from "../components/Header/HeaderContainer";
import FooterContainer from "../components/Footer/FooterContainer";
import Sidebar from "../components/Sidebar/Sidebar";

const App = ({Component, pageProps}) => {
    return (
        <Provider store={store}>

          <div className={s.wrapper}>
            <HeaderContainer/>
            <main className={s.main}>
              <div className={s.container}>
                <div className={s.content}>
                  <Component {...pageProps}/>
                </div>
                <Sidebar/>
              </div>
            </main>
            <FooterContainer/>

          </div>
        </Provider>
    )

}

const makeStore = () => store;

const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(App);
