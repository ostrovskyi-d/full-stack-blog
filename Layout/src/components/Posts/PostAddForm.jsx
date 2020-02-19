import React, {useState} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import s from './Posts.module.scss'
import {Button, Form, Input} from "antd";


const style = {
    height: "200px",
    border: '1px solid #e8e8e8',
    margin: '15px 0',
    borderRadius: '3px',
    cursor: 'text'
};

const PostAddForm = () => {
    const [postText, setPostText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(postText)
    };
    const handleChange =(changedText) => {
        setPostText(changedText);
    };
    return (
        <div className={`${s.post}  ${s.addPost}`}>
            <div className={s.top}>
                <h2>Add Post:</h2>
            </div>
            <Form onSubmit={handleSubmit}>
                Post title:
                <Input autoComplete="false" id="post-title" type="text"/>
                <div className={s.postBody}>
                    <label form="react_quill">
                        Post text:
                        <ReactQuill onChange={handleChange}  id='react_quill' style={style} theme='bubble'/>
                    </label>

                </div>
                <div className={s.buttons}>
                    <Button htmlType='submit' size='large' type='primary' shape='round'>Publish</Button>
                    <Button size='large' shape='round'>Save</Button>
                </div>

            </Form>
        </div>
    )
};

export default PostAddForm;
