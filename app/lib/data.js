"use server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { put } from "@vercel/blob";
export async function fetchPosts() {
  try {
    const data =
      await sql`SELECT users.username,users.avatar_img_url,posts.post_id,posts.user_id,posts.post_body,post_img_url,posts.created_at,COUNT(comment_id)::INT AS comment_count
    FROM posts
    LEFT JOIN comments
    ON posts.post_id = comments.post_id
    LEFT JOIN users
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
      await sql`SELECT users.username,users.avatar_img_url,posts.post_id,posts.user_id,post_body,post_img_url,posts.created_at,COUNT(comment_id)::INT AS comment_count
        FROM posts
        LEFT JOIN comments
        ON posts.post_id = comments.post_id
        LEFT JOIN users
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

export async function insertPost(previousState, formData) {
  const session = await getServerSession(authOptions);

  try {
    if (!session || !session.user) {
      console.log(session);
      throw new Error("Please log in");
    }
    const imageFile = formData.get("image");
    const blob = await uploadImage(imageFile);
    const newPost = {
      user_id: formData.get("user_id"),
      post_body: formData.get("post_body"),
      post_img_url: blob.url,
    };
    await sql`
      INSERT INTO posts (user_id, post_body, post_img_url)
      VALUES (${newPost.user_id}, ${newPost.post_body}, ${newPost.post_img_url})
      ;
    `;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to insert post data.");
  }
  revalidatePath("/home");
  redirect("/home");
}

export async function deletePost(post_id) {
  const session = await getServerSession(authOptions);

  try {
    const postToDelete = await fetchPostsById(post_id);
    if (postToDelete.user_id !== session?.user?.user_id) {
      throw new Error("Invalid credentials");
    }
    await sql`DELETE FROM posts WHERE post_id=${post_id};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete post data.");
  }
  revalidatePath("/home");
  redirect("/home");
}

export async function insertComment(formData) {
  try {
    const newComment = {
      user_id: formData.get("user_id"),
      post_id: formData.get("post_id"),
      comment_body: formData.get("comment_body"),
    };
    await sql`
  INSERT INTO comments (user_id, post_id, comment_body)
  VALUES (${newComment.user_id}, ${newComment.post_id}, ${newComment.comment_body})
  ;
`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to insert post data.");
  }
  revalidatePath("/home");
  redirect("/home");
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

export async function insertPostLike(newLike) {
  const session = await getServerSession(authOptions);
  try {
    if (!session || !session.user) {
      throw new Error("Please log in");
    }

    await sql`
  INSERT INTO post_likes (user_id, post_id)
  VALUES (${newLike.user_id}, ${newLike.post_id})
  ;
`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to insert post_like data.");
  }
  revalidatePath("/home");
  redirect("/home");
}

export async function fetchLikesByPostId(post_id) {
  try {
    const data =
      await sql`SELECT users.username,post_likes.like_id,post_likes.user_id,post_likes.post_id
            FROM post_likes
            LEFT JOIN users
            ON post_likes.user_id = users.user_id
            WHERE post_likes.post_id = ${post_id}
            ;
            `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch comments data.");
  }
}

export async function fetchPostLikesByLikeId(like_id) {
  try {
    const data = await sql`SELECT *
            FROM post_likes
            WHERE like_id = ${like_id}
            ;
            `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch post_likes data.");
  }
}

export async function deletePostLike(post_id, user_id) {
  // const session = await getServerSession(authOptions);

  try {
    // const likeToDelete = await fetchPostLikesByLikeId(like_id);
    // if (likeToDelete.user_id !== session?.user?.user_id) {
    //   throw new Error('Invalid credentials');
    // }
    await sql`DELETE FROM post_likes WHERE post_id=${post_id} AND user_id=${user_id};`;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to delete post_likes data.");
  }
  revalidatePath("/home");
  redirect("/home");
}

export async function uploadImage(imageFile) {
  const blob = await put(imageFile.name, imageFile, {
    access: "public",
  });
  return blob;
}
