 ;
import {NavLink} from "react-router-dom";
import s from './Header.module.scss'

const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.container}>
                <NavLink to="/" className={s.logo}/>
                {/*<nav className={s.menu}>*/}
                {/*    {*/}
                {/*        isAuth*/}
                {/*        && <Link onClick={showMessage} to={(isAuth && '/post/add') || pathname}>*/}
                {/*            <PlusCircleOutlined />*/}
                {/*            Add post*/}
                {/*        </Link>*/}
                {/*    }*/}
                {/*</nav>*/}
            </div>
        </header>
    )
};


export default Header;
