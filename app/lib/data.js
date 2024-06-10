import { sql } from "@vercel/postgres";
export async function fetchPosts() {
  try {
    const data = await sql`SELECT * FROM posts;`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts data.');
  }
}

export async function fetchPostsById() {
    try {
        
    } catch (error) {
        
    }
}
