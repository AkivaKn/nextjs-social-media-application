import Image from "next/image";
import { fetchPosts } from "../lib/data";

export default async function Page() {
  const posts = await fetchPosts();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ul>
        {posts.map((post) =>
        {
          return (
            <li key={post.post_id}>
              {/* <Image src={post.post_img_url} alt="post image" width={30} height={30}/> */}
              <p>{post.post_body}</p>
            </li>
          )
        })}
    </ul>
    </main>
  );
}