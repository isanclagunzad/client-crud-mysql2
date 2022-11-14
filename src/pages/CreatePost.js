import React from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  let navigate = useNavigate();
  const initialValues = {
    title: '',
    postText: '',
    username: '',
  };
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('You must input a title'),
    postText: Yup.string().required('Post content required'),
    username: Yup.string().min(3).max(15).required(),
  });
  const onSubmit = (data) => {
    axios.post('http://localhost:8001/posts', data).then((response) => {
      navigate('/');
      console.log(response);
    });
  };
  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field name="title" placeholder="Post" className="formField" />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field name="postText" placeholder="Post" className="formField" />
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field name="username" placeholder="Post" className="formField" />
          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
