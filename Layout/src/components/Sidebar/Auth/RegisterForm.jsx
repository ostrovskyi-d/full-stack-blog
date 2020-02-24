import s from "../Sidebar.module.scss";
import React from "react";
import {Button, Form, Icon, Input} from "antd";

let AntdRegisterForm = (props) => {
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
        props.switchAuthType('login');
    };
    return (
        <Form className={s.antForm} onSubmit={handleSubmit}>
            <span className={s.auth_type}> Register</span>
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
                {getFieldDecorator("password-repeat", {
                    rules: [{
                        required: true,
                        message: "Please input your Password!"
                    }]
                })(
                    <Input
                        prefix={<Icon type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                        type="password"
                        placeholder="Password one more time"
                    />
                )}
            </Form.Item>
            <Form.Item>

                <Button block shape='round' htmlType='submit' type='primary' id="submit-login">Create</Button>
                <Button block shape='round' onClick={onSwitchAuth}>To Login</Button>
            </Form.Item>

        </Form>

    )
};
const RegisterForm = Form.create({name: "normal_register"})(
    AntdRegisterForm
);
export default RegisterForm;