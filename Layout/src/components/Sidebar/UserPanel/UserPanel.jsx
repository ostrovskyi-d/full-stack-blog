import React from "react";
import {withRouter} from "react-router-dom";
import {Button, Menu} from 'antd';
import s from './UserPanel.module.scss'
import SnippetsOutlined from "@ant-design/icons/lib/icons/SnippetsOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";


function handleClick(e) {
    console.log('click', e);
}

const UserPanel = ({logOut, userData, auth, isFetching, history, ...rest}) => {
    const onLogOut = () => {
        logOut()
    };

    return (
        <>
            <span className={s.greeting}>{userData.userLogin}</span>
            <Menu mode='vertical'
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}>
                    <Menu.Item onClick={() => history.push(`/users/${auth.userLogin}`)} key='1'>
                        <SnippetsOutlined/>
                        My Posts
                    </Menu.Item>
                    <Menu.Item onClick={() => history.push(`/post/add`)} key='2'>
                        <PlusOutlined/>
                        Add Post
                    </Menu.Item>
            </Menu>
            <Button onClick={onLogOut}>
                <LogoutOutlined/>
                Log Out
            </Button>

            {/*<div>*/
            }
            {/*    <Button onClick={() => history.push(`/users/${auth.userLogin}`)}>*/
            }
            {/*        <Icon type="snippets"/>*/
            }
            {/*        My Posts*/
            }
            {/*    </Button>*/
            }
            {/*</div>*/
            }
            {/*<div>*/
            }

            {/*</div>*/
            }
            {/*<div>*/
            }
            {/*    <Button>*/
            }
            {/*        <Icon type="plus-circle"/>*/
            }
            {/*        Add Post*/
            }
            {/*    </Button>*/
            }
            {/*</div>*/
            }
        </>
    )
};
export default withRouter(UserPanel);
