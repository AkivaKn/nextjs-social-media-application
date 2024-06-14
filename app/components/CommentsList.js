"use client";

import { useState } from "react";

export default function CommentsList({ comments }) {
  const [showComments, setShowComments] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowComments(!showComments);
  };
  return (
    <>
      {comments.length > 0 ? (
        <button onClick={handleClick}>{showComments? "Hide" :"Show"} Comments</button>
      ) : null}
      {showComments ? (
        <div>
          <ul>
            {comments.map((comment) => {
              const createdDate = new Date(comment.created_at).toDateString();
              return (
                <li key={comment.comment_id}>
                  <div className="font-normal text-sm mx-3 mt-2 mb-4 flex flex-row">
                    <p>{comment.username}</p>
                    <p>/ {createdDate}</p>
                  </div>
                  <p className="px-4">{comment.comment_body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </>
  );
}
