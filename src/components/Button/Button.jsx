import React from "react";
import { Tooltip } from "@nextui-org/react";

const Button = ({ text, onClick, className }) => {
  return (
    <Tooltip
      className="bg-blue-200 px-1 rounded-lg"
      effect="solid"
      // enterDelay={1}
      // leaveDelay={0}
      placement={"top"}
      content={text != "Go To Conversation" ? text : ""}
    >
      <button
        className={`btn-style px-4 py-2 rounded cursor-pointer transition duration-400 ease-in-out bg-[#3498db] text-white hover:bg-[#2c3e50] 
    }${className}`}
        onClick={onClick}
      >
        {text}
      </button>
    </Tooltip>
  );
};

export default Button;

// <Tooltip
// className="bg-gray-200 px-1 rounded-lg"
// effect="solid"
// enterDelay={10} // Set a short delay for the tooltip to appear
// leaveDelay={0}
// placement={"top"}
// // content={"Hover me"}
// color="secondary"
// >
// <button data-tip data-for="example">
//   Hover me
// </button>
// </Tooltip>
