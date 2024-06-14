import { authOptions } from "../api/auth/[...nextauth]/route";
import CommentButton from "./CommentButton";
import CommentsList from "./CommentsList";
import ToggleText from "./ToggleText";
import { fetchCommentsByPostId, fetchLikesByPostId } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import DeletePostButton from "./DeletePostButton";
import PostLikeButton from "./PostLikeButton";
import { checkIfCurrentUserLiked } from "../lib/utils";
import { PostLikeDelete } from "./PostLikeDelete";

export default async function PostCard({ post }) {
  const comments = await fetchCommentsByPostId(post.post_id);
  const likes = await fetchLikesByPostId(post.post_id);
  const session = await getServerSession(authOptions);
  const liked = checkIfCurrentUserLiked(session?.user?.user_id, likes);
  return (
    <div className="bg-white border rounded-sm max-w-md">
      <div className="flex items-center px-4 py-3">
        <img className="h-8 w-8 rounded-full" src={post.avatar_img_url} />
        <div className="ml-3 ">
          <span className="text-sm font-semibold antialiased block leading-tight">
            {post.username}
          </span>
        </div>
      </div>
      <img src={post.post_img_url} />
      <div className="flex items-center justify-between mx-4 mt-3 mb-2">
        <div className="flex gap-5">
          {liked ? <PostLikeDelete user_id={session?.user?.user_id} post_id={post.post_id} />: (
            <PostLikeButton
              user_id={session?.user?.user_id}
              post_id={post.post_id}
            />
          )}
          <CommentButton
            user_id={session?.user?.user_id}
            post_id={post.post_id}
          />
          {session?.user?.user_id === post.user_id ? (
            <DeletePostButton post_id={post.post_id} />
          ) : null}
        </div>
      </div>
      <div className="font-semibold text-sm mx-4 mt-2 mb-4">
        <p>{likes.length} likes</p>
      </div>
      <div className="font-semibold text-sm mx-4 mt-2 mb-4">
        <p>{post.comment_count} comments</p>
      </div>
      <div className="font-normal text-sm mx-3 mt-2 mb-4 flex flex-row">
        <p>{post.username}</p>
        <ToggleText text={post.post_body} />
      </div>
      <CommentsList comments={comments} />
    </div>
  );
}
