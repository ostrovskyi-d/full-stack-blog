import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import s from './Posts.module.scss'

const style = {
    height: "200px",
    border: '1px solid #e8e8e8',
    margin: '15px 0',
    borderRadius: '3px',
    cursor: 'text'
};

const PostAddForm = () => {

    return (
        <div className={`${s.post}  ${s.addPost}`}>
            <div className={s.top}>
                <h2>Add Post:</h2>
            </div>
            <form action="">
                <div className={s.formGroup}>
                    <label>
                        Post title:
                        <input autoComplete="false" id="post-title" type="text"/>
                    </label>
                </div>
                <div className={s.postBody}>
                    <label form="react_quill">
                        Post text:
                        <ReactQuill id='react_quill' style={style} theme='bubble'/>
                    </label>

                </div>
                <div className="buttons">
                    <button className="button publish-button">Publish</button>
                    <button className="secondary-inverse button save-button">Save</button>
                </div>

            </form>
        </div>
    )
};

export default PostAddForm;
