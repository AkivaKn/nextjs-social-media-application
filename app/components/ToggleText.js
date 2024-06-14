"use client";

import { useState } from "react";

export default function ToggleText({ text }) {
  const [showMore, setShowMore] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setShowMore(!showMore);
  };
  return (
    <div>
      {text?.length > 40 ? (
        <p className="px-4">
          {showMore ? text : text.slice(0, 40)}
          {showMore ? null : <button onClick={handleClick}>...more</button>}
        </p>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}
