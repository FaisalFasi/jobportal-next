import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { deleteJob } from "../../app/GlobalRedux/Features/jobs/JobsSlice";
import JobPostForm from "../jobPostForm/JobPostForm";

const Card = ({ job, isRecruiter }) => {
  const dispatch = useDispatch();
  const loggedInUserId = useSelector((state) => state?.auth?.user?.user.id);

  const [isEditing, setIsEditing] = useState(false);

  const handleApply = () => {
    if (!loggedInUserId) {
      alert("Please login to apply for this job");
    } else {
      const mailto = `mailto:${job.email}?compose=new"`;
      window.location.href = mailto;
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  const handleDelete = async () => {
    await dispatch(deleteJob(job));
    console.log("delete");
  };
  const handleConversation = () => {
    console.log("conversation");
  };
  // useEffect(() => {
  //   console.log("edit" + isEditing);
  // }, [isEditing]);

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
        <div className="w-full flex gap-4 justify-end text-end">
          {!isRecruiter ? (
            <>
              <Button text={"Apply"} onClick={handleApply}></Button>
              <Button
                className={
                  " bg-gray-400 hover:cursor-not-allowed hover:bg-gray-400"
                }
                text={"Go To Conversation"}
                // onClick={handleConversation}
              ></Button>{" "}
            </>
          ) : (
            <div className="flex gap-4 ">
              <Button text={"Edit"} onClick={handleEdit}></Button>
              <Button text={"Delete"} onClick={handleDelete}></Button>
            </div>
          )}
        </div>
      </div>
      <div className="absolute left-0 w-full ">
        {isEditing && <JobPostForm job={job} onClose={handleEdit} />}
      </div>
    </div>
  );
};

export default Card;
