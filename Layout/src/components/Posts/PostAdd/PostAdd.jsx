import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import s from './PostAdd.module.scss'
import {Button, Form, Input} from "antd";
import {Field, reduxForm} from 'redux-form'
import {withAuth} from "../../../HOC/withAuth";
import {compose} from "redux";
import {connect} from "react-redux";
import {sendCreatedPostTC} from "../../../redux/posts-reducer";


const style = {
    height: "200px",
    border: '1px solid #e8e8e8',
    margin: '15px 0',
    borderRadius: '3px',
    cursor: 'text'
};
const PostAdd = (props) => {
    const {sendCreatedPostTC} = props;

    const addPost = (data) => {
        sendCreatedPostTC(data)
    };

    const handleChange = (data) => {
        console.log(data)
    };

    return (
        <div className={`${s.post}  ${s.addPost}`}>
            <div className={s.top}>
                <h2>Add Post:</h2>
                <ReduxPostAddForm onSubmit={addPost} onChange={handleChange}/>
            </div>
        </div>
    )
};


const PostAddForm = ({handleSubmit}) => (
    <Form onSubmit={handleSubmit}>
        Post title:
        <Field
            name='postTitle'
            component={renderPostTitleField}
        />
        <div className={s.postBody}>
            <label form="react_quill">
                Post text:
                <Field
                    name='postBody'
                    component={PostBodyQuill}
                    style={style}
                />
            </label>

        </div>
        <div className={s.buttons}>
            <Button htmlType='submit' size='large' type='primary' shape='round'>Publish</Button>
            <Button size='large' shape='round'>Save</Button>
        </div>
    </Form>
);

const renderPostTitleField = ({input, ...props}) => (
    <Input {...input} autoComplete="false" id="post-title" type="text"/>
);
const PostBodyQuill = ({input, style}) => (
    <ReactQuill
        {...input}
        onBlur={(e) => e}
        id='react_quill'
        style={style}
        theme='bubble'
    />
);
export default compose(
    connect(null, {
        sendCreatedPostTC,
    }),
    withAuth
)(PostAdd);

export const ReduxPostAddForm = reduxForm({
    form: 'postAddForm'
})(PostAddForm);


