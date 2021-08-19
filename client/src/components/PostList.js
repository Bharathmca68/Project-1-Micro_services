import { React, useState, useEffect } from "react";
import axios from "axios";
import CommentsCreatetion from "./CommentsCreatetion";
import CommentList from "./CommentList";

const PostList = () => {
  const [posts, setposts] = useState({});

  const fectchPost = async () => {
    const result = await axios.get("http://localhost:4002/posts");
    console.log(result.data.result);
    setposts(result.data.result);
    // console.log(result.data.result);
  };

  useEffect(() => {
    fectchPost();
  }, []);

  //   console.log(posts);
  const renderedPost = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "50%" }}
        key={post.id}
      >
        <div className="card-body">
          <h1>{post.title}</h1>
        </div>
        <CommentList comments={post.comments} />
        <CommentsCreatetion postID={post.id} />
      </div>
    );
  });

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPost}
    </div>
  );
};

export default PostList;
