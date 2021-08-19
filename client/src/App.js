import React from "react";
import "./App.css";
import Postcreate from "./components/Postcreate";
import PostList from "./components/PostList";

const App = () => {
  return (
    <div className="container mt-5">
      <h1>Create Post</h1>
      <Postcreate />
      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <PostList />
    </div>
  );
};

export default App;
