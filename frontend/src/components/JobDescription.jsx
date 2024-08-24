import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from '@/utils/constant';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";

const JobDescription = () => {
  const { id: jobId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const isInitiallyApplied =
    singleJob?.application?.some((application) => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = {
          ...singleJob,
          application: [...singleJob.application, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob)); // Helps us to real-time UI update
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.application.some(
              (application) => application.applicant === user?._id
            )
          ); // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-5 p-4 bg-white shadow-lg rounded-lg">
        {/* Job Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-2xl text-gray-800">{singleJob?.title}</h1>
            <div className="flex items-center mt-2 gap-3">
              <Badge className={"text-blue-700 font-bold"} variant="ghost">
                {singleJob?.position} Positions
              </Badge>
              <Badge className={"text-[#F83002] font-bold"} variant="ghost">
                {singleJob?.jobType}
              </Badge>
              <Badge className={"text-[#7209b7] font-bold"} variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              } text-white py-2 px-4 font-semibold shadow-md`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </motion.div>
        </div>

        {/* Job Description */}
        <div className="border-b-2 border-b-gray-300 py-4 my-3">
          <h1 className="font-semibold text-gray-700 text-lg">Job Description</h1>
        </div>

        {/* Job Details */}
        <div className="my-3 space-y-2">
          <div className="flex items-center">
            <h1 className="font-bold w-36">Role:</h1>
            <span className="text-gray-700">{singleJob?.title}</span>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold w-36">Description:</h1>
            <span className="text-gray-700">{singleJob?.description}</span>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold w-36">Requirements:</h1>
            <span className="text-gray-700">{singleJob?.requirements?.join(',')}</span>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold w-36">Location:</h1>
            <span className="text-gray-700">{singleJob?.location}</span>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold w-36">Experience:</h1>
            <span className="text-gray-700">{singleJob?.experienceLevel} yrs</span>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold w-36">Salary:</h1>
            <span className="text-gray-700">{singleJob?.salary} LPA</span>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold w-36">Total Applicants:</h1>
            <span className="text-gray-700">{singleJob?.application?.length}</span>
          </div>
          <div className="flex items-center">
            <h1 className="font-bold w-36">Posted Date:</h1>
            <span className="text-gray-700">{singleJob?.createdAt.split("T")[0]}</span>
          </div>
        </div>

        {/* Company Details */}
        <motion.div
          className="bg-gray-100 p-6 rounded-lg mt-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-bold text-gray-800">About the Company</h1>
          <p className="text-gray-600 mt-3">
            Learn more about the company's culture, values, and the exciting opportunities available.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <Avatar>
              <AvatarImage
                src={singleJob?.company?.logo || "default-logo-url"}
                alt={`${singleJob?.company?.name} Logo`}
                className="w-16 h-16"
              />
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold text-gray-700">
                {singleJob?.company?.name}
              </h2>
              <a
                href={singleJob?.company?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-500 hover:text-indigo-700 text-sm"
              >
                Visit Company Website
              </a>
            </div>
          </div>
        </motion.div>

        {/* Footer Call to Action */}
        <div className="mt-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              } text-white py-3 px-6 font-semibold shadow-lg`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
