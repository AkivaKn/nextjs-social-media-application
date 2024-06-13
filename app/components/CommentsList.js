import { fetchCommentsByPostId } from "@/app/lib/data";
export default async function CommentsList({ post_id }) {
  const comments = await fetchCommentsByPostId(post_id);
  return (
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
  );
}
