import React, { useState } from "react";
import Button from "../Button";

const ProfessionalLinks = ({ professionalLinks, handleInputChange }) => {
  const [isEdit, setIsEdit] = useState(false);

  const handleEditting = () => {
    setIsEdit(true);
  };
  const handleNotEditting = () => {
    setIsEdit(false);
  };
  const hanldelEdit = () => {};
  const handleSaveChanges = () => {
    setIsEdit(false);
  };
  return (
    <div>
      <div className=" h-full w-full flex justify-center items-center">
        <div className=" profile-bg w-full md:w-1/2 h-1/2 m-4 p-4  flex flex-col items-start gap-10 rounded-md">
          <div className=" w-full flex justify-between">
            <h1 className="font-semibold text-xl">Professional Links</h1>
            {!isEdit ? (
              <button onClick={handleEditting}> Edit</button>
            ) : (
              <button onClick={handleNotEditting}> Cancel </button>
            )}
          </div>
          <div className="w-full">
            {professionalLinks.map((link, idx) => (
              <div key={idx} className="pb-4">
                <h2 className=" font-bold">{link.name} </h2>
                <a href={link.link}>
                  <p>{link.link}</p>
                </a>
              </div>
            ))}
            {isEdit && (
              <div className="flex justify-center gap-4 mt-4">
                <Button onClick={handleSaveChanges} text={"Save"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLinks;
