import React from "react";
import { toast } from "react-toastify";

const Test = () => {
  const handleTest = () => {
    toast.success("Test toast");
  };

  return (
    <div>
      <button onClick={handleTest}>Show Toast</button>
    </div>
  );
};

export default Test;
