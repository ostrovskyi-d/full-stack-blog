import {Provider} from 'react-redux';
import {createWrapper} from 'next-redux-wrapper';
import store from '../store/store'
import React from "react";

const App = ({Component, pageProps}) => {

  return (
      <Provider store={store}>
        <Component {...pageProps}/>
      </Provider>
  )
}

const makeStore = () => store;

const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(App);
