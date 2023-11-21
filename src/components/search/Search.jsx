import React, { useState } from "react";
import Button from "@/components/Button/Button";
import { useDispatch } from "react-redux";
import { searchJobs } from "@/app/GlobalRedux/Features/jobs/JobsSlice";

const Search = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("searchTerm: ", searchTerm);
    dispatch(searchJobs(searchTerm));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="py-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-[16px] py-[10px] mr-2 rounded-md"
        />
        <Button text={"Search"} />
      </div>
    </form>
  );
};

export default Search;
