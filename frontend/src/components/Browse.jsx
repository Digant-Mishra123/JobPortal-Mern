import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="bg-gray-100 p-6 rounded-lg mb-10">
          <h2 className="text-2xl font-bold text-gray-800">Featured Jobs</h2>
          <p className="text-gray-500">
            Discover the latest opportunities from top companies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {allJobs.map((job) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                key={job?._id}
              >
                <Job key={job?._id} job={job} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
