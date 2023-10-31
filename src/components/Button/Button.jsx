import React from "react";
import Link from "next/link";
const Button = ({ text, url }) => {
  return (
    <Link href={url ? url : ""}>
      <div
        className={`flex-1 py-2 px-8 text-center bg-blue-500 text-white rounded-md `}
      >
        {text}
      </div>
    </Link>
  );
};

export default Button;
