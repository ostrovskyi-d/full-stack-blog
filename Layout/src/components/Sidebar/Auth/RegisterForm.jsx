import s from "../Sidebar.module.scss";
import React from "react";
import {Button, Form, Input} from "antd";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";

let RegisterForm = (props) => {
    const {
        submitForm,
        switchAuthType,
        style
    } = props;
    const handleSubmit = values => {
        submitForm(values)
    };
    const onSwitchAuth = (e) => {
        e.preventDefault();
        switchAuthType('login');
    };
    return (
        <Form onFinish={handleSubmit} name="normal_register" className={s.antForm} onSubmit={handleSubmit}>
            <span className={s.auth_type}> Register</span>
            <Form.Item
                // label='Login'
                name='login'
                rules={[{required: true, message: "Please input your username!"}]}>
                <Input
                    prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    placeholder="Username"
                    style={style.roundedBorder}

                />

            </Form.Item>

            <Form.Item
                // label='Password'
                name='password'
                rules={[{required: true, message: "Please input your Password!"}]}>
                <Input.Password
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    placeholder="Password"
                    style={style.roundedBorder}

                />
            </Form.Item>

            <Form.Item
                // label='Password again'
                name='password-repeat'
                rules={[{
                    required: true,
                    message: "Please repeat your Password!"
                }]}>
                <Input.Password
                    prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}}/>}
                    type="password"
                    placeholder="Password one more time"
                    style={style.roundedBorder}

                />
            </Form.Item>
            <Form.Item >
                <Button block shape='round' htmlType='submit' type='primary' id="submit-login">Create</Button>
                <Button block shape='round' onClick={onSwitchAuth}>To Login</Button>
            </Form.Item>

        </Form>

    )
};

export default RegisterForm;
