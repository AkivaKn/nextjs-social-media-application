"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function AuthButton() {
  const { data: session } = useSession();
  if (session?.user) {
    return (
      <button
        onClick={() => signOut()}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Sign out
      </button>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn()}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Sign in
      </button>
      <Link
        href={"/register"}
        className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
      >
        Register
      </Link>
    </>
  );
}

export default function NavMenu() {
  const { data: session } = useSession();
  console.log(session);
  const router = useRouter();
  const handlePost = (e) => {
    e.preventDefault();
    if (session?.user) {
      router.push("/new-post");
    } else {
      router.push("/api/auth/signin");
    }
  };
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Social</span>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <AuthButton />
          <button
            onClick={handlePost}
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            New Post
          </button>
        </div>
        {session?.user?.avatar_img_url?<div >
          <img src={session.user.avatar_img_url} className="w-10 h-10 rounded-full"/>
        </div>:null}
      </div>
    </nav>
  );
}
