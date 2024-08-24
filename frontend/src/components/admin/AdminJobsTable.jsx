import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) {
          return true;
        }
        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name
            .toLowerCase()
            .includes(searchJobByText.toLowerCase())
        );
      });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <caption className="text-lg font-semibold p-4">A list of your recent posted jobs</caption>
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-4 text-left">Logo</th>
            <th className="p-4 text-left">Company Name</th>
            <th className="p-4 text-left">Role</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {filterJobs?.map((job) => (
            <tr
              key={job._id}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <td className="p-4">
                <Avatar>
                  <AvatarImage
                    src={job?.company?.logo}
                    alt={`${job?.company?.name} Logo`}
                    // className="w-12 h-12 object-cover rounded-full"
                  />
                </Avatar>
              </td>
              <td className="p-4">{job?.company?.name}</td>
              <td className="p-4">{job?.title}</td>
              <td className="p-4">{job?.createdAt.split("T")[0]}</td>
              <td className="p-4 text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200" />
                  </PopoverTrigger>
                  <PopoverContent className="w-40">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded"
                    >
                      <Edit2 className="w-4 text-gray-600" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded mt-2"
                    >
                      <Eye className="w-4 text-gray-600" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminJobsTable;
