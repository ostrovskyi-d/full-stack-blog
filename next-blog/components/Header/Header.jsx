// import {NavLink} from "react-router-dom";
import s from './Header.module.scss'
import Link from "next/link";
import React from "react";
import PlusCircleOutlined from '@ant-design/icons'

const Header = (props) => {

  return (
      <header className={s.header}>
        <div className={s.container}>
          <a className={s.logo}>
            <nav className={s.menu}>
              {
                props.isAuth
                && <Link onClick={showMessage} href={(isAuth && '/post/add') || pathname}>
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
