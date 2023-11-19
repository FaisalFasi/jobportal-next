import React from "react";
import "@/app/globals.css";
const Button = ({ text, onClick, className }) => {
  return (
    <button className={`btn-style font-bold ${className} `} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
