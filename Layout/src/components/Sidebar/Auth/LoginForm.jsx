import React from 'react';
import {Button, Form, Input} from 'antd';
import s from "../Sidebar.module.scss";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";


const LoginForm = props => {
    const {style, submitForm, switchAuthType} = props;

    const handleSubmit = values => {
        submitForm(values)
    };

    const onSwitchAuth = (e) => {
        e.preventDefault();
        switchAuthType('register');
    };
    return (
        <>
            <span className={s.auth_type}>Login</span>
            <Form onFinish={handleSubmit} name="normal_login" className={s.antForm} onSubmit={handleSubmit}>
                <Form.Item name='login'
                           rules={[{required: true, message: "Please input your username!"}]}>
                    <Input
                        prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                        placeholder="Username"
                        style={style.roundedBorder}
                    />
                </Form.Item>
                <Form.Item name='password'
                           rules={[{required: true, message: "Please input your Password!"}]}>
                    <Input.Password
                        prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                        type="password"
                        placeholder="Password"
                        style={style.roundedBorder}

                    />
                </Form.Item>

                <Form.Item>
                    <Button shape='round' loading={props.auth.isFetching} block type="primary" htmlType="submit">
                        Log in
                    </Button>
                    <Button shape='round' block onClick={onSwitchAuth}>
                        To register
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
};

export default LoginForm;
