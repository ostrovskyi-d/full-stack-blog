// import {NavLink} from "react-router-dom";
import s from './Header.module.scss'
import Link from "next/link";
import React from "react";
import PlusCircleOutlined from '@ant-design/icons'

const Header = (props) => {

  return (
      <header className={s.header}>
        <div className={s.container}>
          <a href='/' className={s.logo}/>
          <nav className={s.menu}>
            {
              props.isAuth
              && <Link href={(props.isAuth && '/posts/add') || props.pathname}>
                <a onClick={props.showMessage}>
                  <PlusCircleOutlined/>
                  Add post
                </a>

              </Link>
            }
          </nav>


        </div>
      </header>
  )
};


export default Header;
