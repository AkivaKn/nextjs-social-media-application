"use client";
import { insertComment } from "../lib/data";

export default function CreateComment({ user_id, post_id, setShowModal }) {
  const handleClose = (e) => {
    e.preventDefault();
    setShowModal(false);
  };
  async function postComment(formData) {
    await insertComment(formData);
    setShowModal(false);
  }
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center">
      <div className="bg-white m-auto p-8">
        <div className="flex flex-col items-center">
          <form action={postComment} className="space-y-3">
            <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
              <h1 className="mb-3 text-2xl">Create new comment</h1>
              <div className="w-full">
                <input
                  id="user_id"
                  type="hidden"
                  name="user_id"
                  value={user_id}
                  required
                />
                <input
                  id="post_id"
                  type="hidden"
                  name="post_id"
                  value={post_id}
                  required
                />
                <div>
                  <div className="relative">
                    <input
                      className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                      id="comment_body"
                      type="text"
                      name="comment_body"
                      placeholder="Write your comment..."
                      required
                    />
                  </div>
                </div>
              </div>
              <CommentButton />
            </div>
          </form>
          <br />
          <button
            type="button"
            className="bg-red-500 text-white p-2 "
            onClick={handleClose}
          >
            Go back
          </button>
        </div>
      </div>
    </dialog>
  );
}

function CommentButton() {
  return (
    <button className="mt-4 w-full">
      Comment
    </button>
  );
}
