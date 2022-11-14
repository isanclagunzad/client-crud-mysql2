import React, { useEffect, useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../App.css';
import { useParams, useNavigate } from 'react-router-dom';

function Post() {
  let navigate = useNavigate();
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  useEffect(() => {
    axios.get(`http://localhost:8001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
    axios.get(`http://localhost:8001/comments/${id}`).then((response) => {
      setComments(response.data);
    });
  }, [id]);

  const addComment = () => {
    axios
      .post('http://localhost:8001/comments', {
        commentBody: newComment,
        PostId: id,
      })
      .then((response) => {
        setComments([...comments, response.data]);
      });
  };
  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title">{postObject.title}</div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <div className="formContainer">
            <input
              type="text"
              placeholder="Comment..."
              className="formField"
              onChange={(event) => {
                setNewComment(event.target.value);
              }}
            />
            <button onClick={() => addComment()}>Post Comment {id}</button>
          </div>
        </div>
        <div className="listOfComments">
          {comments.map((data, key) => {
            return (
              <div key={key} className="comment">
                {data.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;
