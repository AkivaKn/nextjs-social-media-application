
import Image from "next/image";
import { fetchCommentsByPostId, fetchPosts, fetchPostsById } from "../lib/data";
import PostCard from "../components/PostCard";
export default async function Page() {
  const posts = await fetchPosts();
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {posts.map((post) =>
        {
          return (
            <li key={post.post_id}>
              <PostCard post={post}  />
              {/* <Image src={post.post_img_url} alt="post image" width={30} height={30}/> */}
            </li>
          )
        })}
      </ul>
    </main>
  );
}