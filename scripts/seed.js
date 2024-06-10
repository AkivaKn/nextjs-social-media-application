const { db } = require("@vercel/postgres");
const { users, posts, comments } = require("../app/lib/placeholder-data");
const bcrypt = require("bcrypt");
const { convertTimestampToDate } = require("../app/lib/utils.js");

async function seedUsers(client) {
  try {
    const createTable = await client.sql`CREATE TABLE users (
            user_id SERIAL PRIMARY KEY,
            username VARCHAR(20) NOT NULL,
            email VARCHAR(30) NOT NULL,
            password VARCHAR NOT NULL,
            bio VARCHAR(1000),
            avatar_img_url VARCHAR
        );`;
    console.log("Created users table");
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                INSERT INTO users (username,email,password,bio,avatar_img_url)
                VALUES (${user.username}, ${user.email}, ${hashedPassword}, ${user.bio}, ${user.avatar_img_url});`;
      })
    );
    console.log(`Seeded ${insertedUsers.length} users`);

    return {
      createTable,
      users: insertedUsers,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}
async function seedPosts(client) {
  try {
    const createTable = await client.sql`CREATE TABLE posts (
              post_id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
              post_body VARCHAR(2000) NOT NULL,
              post_img_url VARCHAR NOT NULL,
              created_at TIMESTAMP DEFAULT NOW()
          );`;
    console.log("Created posts table");
    const formattedPosts = posts.map(convertTimestampToDate);
    const insertedPosts = await Promise.all(
      formattedPosts.map(async (post) => {
        return client.sql`
                  INSERT INTO posts (user_id,post_body,post_img_url,created_at)
                  VALUES (${post.user_id}, ${post.post_body}, ${post.post_img_url}, ${post.created_at});`;
      })
    );
    console.log(`Seeded ${insertedPosts.length} posts`);

    return {
      createTable,
      posts: insertedPosts,
    };
  } catch (error) {
    console.error("Error seeding posts:", error);
    throw error;
  }
}
async function seedComments(client) {
  try {
    const createTable = await client.sql`CREATE TABLE comments (
              comment_id SERIAL PRIMARY KEY,
              user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
              post_id INT REFERENCES posts(post_id) ON DELETE CASCADE NOT NULL,
              comment_body VARCHAR(2000) NOT NULL,
              created_at TIMESTAMP DEFAULT NOW()
          );`;
    console.log("Created comments table");
    const insertedComments = await Promise.all(
      comments.map(async (comment) => {
        return client.sql`
                  INSERT INTO comments (user_id,post_id,comment_body)
                  VALUES (${comment.user_id}, ${comment.post_id}, ${comment.comment_body});`;
      })
    );
    console.log(`Seeded ${insertedComments.length} comments`);

    return {
      createTable,
      comments: insertedComments,
    };
  } catch (error) {
    console.error("Error seeding comments:", error);
    throw error;
  }
}
async function main() {
  const client = await db.connect();
  await client.sql`DROP TABLE IF EXISTS comments;`;
  await client.sql`DROP TABLE IF EXISTS posts;`;
  await client.sql`DROP TABLE IF EXISTS users;`;
  await seedUsers(client);
  await seedPosts(client);
  await seedComments(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
