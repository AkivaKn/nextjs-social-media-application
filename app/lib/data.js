import { sql } from "@vercel/postgres";
export async function fetchPosts() {
  try {
    const data = await sql`SELECT users.username,users.avatar_img_url,posts.post_id,post_body,post_img_url,posts.created_at,COUNT(comment_id)::INT AS comment_count
    FROM posts
    LEFT JOIN comments
    ON posts.post_id = comments.post_id
    RIGHT JOIN users
    ON posts.user_id = users.user_id
    GROUP BY posts.post_id,users.username,users.avatar_img_url;
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts data.");
  }
}

export async function fetchPostsById(post_id) {
  try {
    const data =
      await sql`SELECT users.username,users.avatar_img_url,post_body,post_img_url,posts.created_at,COUNT(comment_id)::INT AS comment_count
        FROM posts
        LEFT JOIN comments
        ON posts.post_id = comments.post_id
        RIGHT JOIN users
        ON posts.user_id = users.user_id
        WHERE posts.post_id = ${post_id}
        GROUP BY posts.post_id,users.username,users.avatar_img_url;
        `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post data.");
  }
}

export async function fetchCommentsByPostId(post_id) {
    try {
        const data =
          await sql`SELECT users.username,comment_body,comments.created_at,comments.comment_id
            FROM comments
            LEFT JOIN users
            ON comments.user_id = users.user_id
            WHERE comments.post_id = ${post_id}
            ;
            `;
        return data.rows;
      } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch comments data.");
      }
}
