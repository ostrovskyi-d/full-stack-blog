// import {NavLink} from "react-router-dom";
import s from './Header.module.scss'
import Link from "next/link";
import React from "react";
import PlusCircleOutlined from '@ant-design/icons'

const Header = (props) => {

  return (
      <header className={s.header}>
        <div className={s.container}>
          <a href='/' className={s.logo}>
            <nav className={s.menu}>
              {
                props.isAuth
                && <Link onClick={props.showMessage} href={(props.isAuth && '/post/add') || props.pathname}>
                  <a>
                    <PlusCircleOutlined/>
                    Add post
                  </a>

                </Link>
              }
            </nav>
          </a>

        </div>
      </header>
  )
};


export default Header;
