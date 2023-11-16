import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className={`w-fit py-2 px-8 text-center bg-blue-500 text-white rounded-md `}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
