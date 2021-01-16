import React from 'react';
import s from './Preloader.module.scss';
import {Spin} from "antd";

const Preloader = () => {
    return <div className={s.spin_container}>
      <Spin size="large"/>
    </div>
};


export default Preloader;
