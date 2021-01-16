import React from 'react';
import s from './PostAdd.module.scss';
import {Button, Input, message} from "antd";
import {Field, reduxForm} from 'redux-form';

const PostAdd = (props) => {
  const {sendCreatedPost} = props;

  const addPost = async (data) => {
    let promise = await sendCreatedPost(data);
    message[`${promise.resolved ? 'success' : 'error'}`](promise.message)
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
    <form onSubmit={handleSubmit}>
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
              component={RenderPostBodyField}
              style={style}
          />
        </label>

      </div>
      <div className={s.buttons}>
        <Button htmlType='submit' size='large' type='primary' shape='round'>Publish</Button>
        <Button size='large' shape='round'>Save</Button>
      </div>
    </form>
);

const renderPostTitleField = ({input, ...props}) => (
    <Input
        {...input}
        autoComplete="false"
        id="post-title"
        type="text"
    />
);

const style = {
  height: "100x",
  width: '50%',
  border: '1px solid #e8e8e8',
  margin: '15px 0',
  borderRadius: '3px',
  cursor: 'text'
};

const RenderPostBodyField = ({input, style}) => (
    <textarea
        {...input}
        onBlur={(e) => e}
        id='react_quill'
        style={style}
    />
);

export const ReduxPostAddForm = reduxForm({
  form: 'postAddForm'
})(PostAddForm);


export default PostAdd;
