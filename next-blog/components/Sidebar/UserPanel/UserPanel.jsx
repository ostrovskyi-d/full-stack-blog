 ;
import {withRouter} from "react-router-dom";
import {Button, Menu} from 'antd';
import s from './UserPanel.module.scss'
import SnippetsOutlined from "@ant-design/icons/lib/icons/SnippetsOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import CalendarOutlined from "@ant-design/icons/lib/icons/CalendarOutlined";
import { Avatar } from 'antd';
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import DatabaseOutlined from "@ant-design/icons/lib/icons/DatabaseOutlined";


function handleClick(e) {
    console.log('click', e);
}
const menuStyle = {
    border: 'none',
    background: 'transparent'
}
const UserPanel = ({logOut, userData, auth, isFetching, history, ...rest}) => {
    const onLogOut = () => {
        logOut()
    };

    return (
        <>


            <div className={s.greeting}>
                <Avatar size='large' icon={<UserOutlined />} />
                <span className={s.userLogin}>{userData.userLogin}</span>
            </div>
            <Menu mode='vertical'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  style={menuStyle}
            >
                <Menu.Item onClick={() => history.push(`/`)} key='1'>
                    <CalendarOutlined />
                    Feed
                </Menu.Item>
                <Menu.Item onClick={() => history.push(`/users/${auth.userLogin}`)} key='2'>
                    <SnippetsOutlined/>
                    My Posts
                </Menu.Item>
                <Menu.Item onClick={() => history.push(`/post/add`)} key='3'>
                    <PlusOutlined/>
                    Add Post
                </Menu.Item>
                <Menu.Item onClick={() => history.push(`/archive/2`)} key='4'>
                    <DatabaseOutlined />
                    Archive
                </Menu.Item>

            </Menu>
            <Button onClick={onLogOut}>
                <LogoutOutlined/>
                Log Out
            </Button>

        </>
    )
};
export default withRouter(UserPanel);
