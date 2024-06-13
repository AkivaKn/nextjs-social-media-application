"use server";
import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function authorise(credentials) {
  try {
    const res = await sql`
            SELECT * FROM users WHERE username = ${credentials.identifier} OR email = ${credentials.identifier}
        `;

    const user = res.rows[0];
    if (!user) {
      throw new Error("user not found");
    }
    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      throw new Error("invalid password");
    }
    return {
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      avatar_img_url: user.avatar_img_url,
    };
  } catch (error) {
    console.error("Authorisation error:", error);
    return null;
  }
}

export async function register(previousState, formData) {
  const newUser = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirm-password"),
    bio: formData.get("bio"),
    avatar_img_url: formData.get("avatar_img_url"),
  };
  const existingUsername = await sql`
        SELECT * FROM users WHERE username = ${newUser.username};
    `;
  const existingEmail = await sql`
    SELECT * FROM users WHERE email = ${newUser.email};
`;

  if (existingUsername.rows.length > 0) {
    throw new Error("Username already taken");
  }
  if (existingEmail.rows.length > 0) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  const result = await sql`
        INSERT INTO users (username, email, password, bio, avatar_img_url)
        VALUES (${newUser.username}, ${newUser.email}, ${hashedPassword}, ${newUser.bio}, ${newUser.avatar})
        ;
    `;

  redirect("/api/auth/signin");
}
