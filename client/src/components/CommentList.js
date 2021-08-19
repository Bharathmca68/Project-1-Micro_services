import React from "react";

const CommentList = (props) => {
  const { comments } = props;

  const renderedComments = comments.map((com) => {
    return <li key={com.id}>{com.content}</li>;
  });

  return <div className="container ps-3">{renderedComments}</div>;
};

export default CommentList;
