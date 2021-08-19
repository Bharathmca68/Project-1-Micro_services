import React, { useState } from "react";
import axios from "axios";
const CommentsCreatetion = (props) => {
  const [content, setcontent] = useState("");
  const { postID } = props;

  const FormSubmit = async (event) => {
    event.preventDefault();
    await axios.post(`http://localhost:4001/post/${postID}/comments`, {
      content,
    });
    setcontent("");
  };

  return (
    <div>
      <form onSubmit={FormSubmit} className="container">
        <div className="form-group ">
          <label>New comment</label>
          <input
            value={content}
            onChange={(e) => setcontent(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          className="btn btn-secondary mt-2 mb-2 con"
          style={{ float: "right" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentsCreatetion;
