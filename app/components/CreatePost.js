"use client";

import { useFormState, useFormStatus } from "react-dom";
import { insertPost, uploadImage } from "../lib/data";
import { useState } from "react";

export default function CreatePost({user_id}) {
  const [errorMessage, formAction] = useFormState(insertPost, null);
  const [file, setFile] = useState();
  function handleImageInputChange(e) {
      console.log(e.target.files);
      setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <form action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Create new post</h1>
        <div className="w-full">
          <div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="user_id"
                type="hidden"
                name="user_id"
                value={user_id}
                required
              />
            </div>
          </div>
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="post_body"
            >
              Caption
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="post_body"
                type="text"
                name="post_body"
                placeholder="Write your caption..."
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="image"
            >
              Image
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="image"
                type="file"
                name="image"
                required
                onChange={handleImageInputChange}
              />
            </div>
          </div>
          <img src={file}/>
        </div>
        <PostButton />
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

function PostButton() {
  const { pending } = useFormStatus();

  return (
    <button className="mt-4 w-full" aria-disabled={pending}>
      Post
    </button>
  );
}
