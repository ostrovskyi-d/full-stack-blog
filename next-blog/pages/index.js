import React from 'react';

import {initializeApp, authenticateTC} from "../store/reducers/common-app-reducer";
import {connect} from "react-redux";
import Preloader from "../components/common/Preloader/Preloader";
import Newest from "../components/Newest/Newest";
import {useEffect} from "react";
import Head from "next/head";

const IndexPage = (props) => {
  const {
    initializeApp,
    initialized,
    authenticateTC,
    // isFetching
  } = props;

  useEffect(() => {
    initializeApp();
  }, [initializeApp, authenticateTC]);

  if (!initialized) return <Preloader/>;
  else {
    return (
        <div>
          <Head>
            <title>New posts</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          </Head>

          <Newest />
        </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    initialized: state.common.initialized,
    isFetching: state.common.isFetching,
    isAuthenticated: state.common.isAuthenticated
  }
};

export default connect(mapStateToProps, {initializeApp, authenticateTC})(IndexPage);
