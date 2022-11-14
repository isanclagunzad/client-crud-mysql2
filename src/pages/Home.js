import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8001/posts/').then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className="Home">
      {listOfPosts.map((data, key) => {
        return (
          <div
            className="post"
            onClick={() => {
              navigate(`/post/${data.id}`);
            }}
            key={data.id}
          >
            <div className="title">{data.title}</div>
            <div className="body">{data.postText}</div>
            <div className="footer">{data.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
