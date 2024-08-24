import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { MoreHorizontal } from "lucide-react";

const shortListingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <caption className="text-lg font-semibold p-4">
          A list of your recent applied users
        </caption>
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="p-4 text-center">Profile Photo</th>
            <th className="p-4 text-center">Full Name</th>
            <th className="p-4 text-center">Email</th>
            <th className="p-4 text-center">Contact</th>
            <th className="p-4 text-center">Resume</th>
            <th className="p-4 text-center">Date</th>
            <th className="p-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {applicants &&
            applicants.application.map((item) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-4">
                  <img
                    src={item?.applicant?.profile?.profilePhoto}
                    alt={`${item?.applicant?.fullname} Profile`}
                    className="w-12 h-12 rounded-full mx-auto"
                  />
                </td>
                <td className="p-4 text-center">{item?.applicant?.fullname}</td>
                <td className="p-4 text-center">{item?.applicant?.email}</td>
                <td className="p-4 text-center">{item?.applicant?.phoneNumber}</td>
                <td className="p-4 text-center">
                  {item.applicant?.profile?.resume ? (
                    <a
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      href={item?.applicant?.profile?.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item?.applicant?.profile?.resumeOriginalName}
                    </a>
                  ) : (
                    <span>NA</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  {item?.applicant?.createdAt.split("T")[0]}
                </td>
                <td className="p-4 text-center">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors duration-200" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {shortListingStatus.map((status, index) => (
                        <div
                          onClick={() => statusHandler(status, item?._id)}
                          key={index}
                          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 rounded"
                        >
                          <span>{status}</span>
                        </div>
                      ))}
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

export default ApplicantsTable;
