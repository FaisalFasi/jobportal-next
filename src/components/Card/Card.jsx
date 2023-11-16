import React from "react";
import Button from "../Button/Button";
const Card = ({ job, isRecruiter }) => {
  const handleApply = () => {
    const mailto = `mailto:${job.email}?compose=new"`;
    window.location.href = mailto;
  };

  const handleEdit = () => {
    console.log("edit");
  };
  const handleDelete = () => {
    console.log("delete");
  };

  return (
    <div
      key={job.id}
      className="flex flex-col sm:flex-row gap-6 items-start mt-8 bg-white shadow-md p-4 rounded-md"
    >
      <div> company icon</div>

      <div className="w-full flex flex-col gap-4 ">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div>
            <h2 className="font-semibold text-lg">{job.title}</h2>
            <p className="text-sm">{job.company_name}</p>
          </div>
        </div>
        <div className="w-full flex justify-end text-end">
          {!isRecruiter ? (
            <Button text={"Apply"} onClick={handleApply}></Button>
          ) : (
            <div className="flex gap-4 ">
              <Button text={"Edit"} onClick={handleEdit}></Button>
              <Button text={"Delete"} onClick={handleDelete}></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
