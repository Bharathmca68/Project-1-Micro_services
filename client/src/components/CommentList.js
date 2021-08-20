import React from "react";

const CommentList = (props) => {
  const { comments } = props;

  const renderedComments = comments.map((com) => {
    let content;
    if (com.status === "approved") {
      content = com.content;
    }

    if (com.status === "rejected") {
      content = "This comment as been rejected";
    }

    if (com.status === "pending") {
      content = "This comment is awaiting Moderation";
    }

    return <li key={com.id}>{content}</li>;
  });

  return <div className="container ps-3">{renderedComments}</div>;
};

export default CommentList;
