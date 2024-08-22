import { Search } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className=" mx-auto px-8 py-3 rounded-full bg-gray-100 text-[blue] font-medium">
          Your Go-To Job Search Hub
        </span>

        <h1 className="text-5xl font-bold leading-tight">
          Your Dream Job
          <br />
          Awaits - <span className="text-[blue]">Start Now!</span>
        </h1>

        <p className="max-w-3xl mx-auto ">
          {" "}
          Find the perfect job tailored to your skills with our easy-to-use
          search and filters. Apply effortlessly and take the next step in your
          career today!
        </p>

        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream Job"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-none border-none w-full"
          />

          <Button
            onClick={searchJobHandler}
            className="rounded-r-full bg-[blue]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
