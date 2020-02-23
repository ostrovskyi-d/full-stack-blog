import React from 'react';
import {Form, Icon, Input, Button} from 'antd';
import s from "../Sidebar.module.scss";


const NormalLoginForm = props => {
    const {getFieldDecorator} = props.form;

    const handleSubmit = e => {
        e.preventDefault();
        props.form.validateFields((err, values) => {
            if (!err) {
                props.submitForm(values)
            }
        });
    };

    const onSwitchAuth = (e) => {
        e.preventDefault();
        props.switchAuthType('register');
    };
    return (
        <>
            <span className={s.auth_type}>Login</span>
            <Form onSubmit={handleSubmit}>
                <Form.Item>
                    {getFieldDecorator("login", {rules: [{required: true, message: "Please input your username!"}]})(
                        <Input
                            prefix={<Icon type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                            placeholder="Username"
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator("password", {rules: [{required: true, message: "Please input your Password!"}]})(
                        <Input
                            prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                            type="password"
                            placeholder="Password"
                        />
                    )}
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

const LoginForm = Form.create({name: "normal_login"})(
    NormalLoginForm
);
export default LoginForm;