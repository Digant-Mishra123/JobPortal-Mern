import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

const randomJobs = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto mt-5 p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Discover the <span className="text-indigo-600">Latest</span> and
        <span className="text-teal-600"> Top</span> Job Openings
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {allJobs.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 text-lg">
            No Job Openings Available
          </div>
        ) : (
          allJobs?.slice(0, 6).map((job) => (
            <div className="transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 bg-gray-50 p-4 rounded-lg shadow-md">
              <LatestJobCards key={job._id} job={job} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
