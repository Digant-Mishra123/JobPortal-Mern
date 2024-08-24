import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { Avatar, AvatarImage } from "./ui/avatar";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);
//   console.log(allAppliedJobs)
  return (
    <div className="overflow-x-auto p-4">
      <Table className="min-w-full bg-white shadow-lg rounded-lg">
        <TableCaption className="text-lg font-semibold p-4">A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-100 border-b border-gray-200">
            <TableHead >Logo</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <span>You haven't applied any job yet.</span>
          ) : (
            allAppliedJobs.map((appliedJob) => (
              <TableRow key={appliedJob._id} className="hover:bg-gray-50 transition-colors duration-200">
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={appliedJob?.job?.company?.logo}
                      alt={`${appliedJob?.job?.company?.name} Logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                <TableCell>{appliedJob.job?.title}</TableCell>
                <TableCell>{appliedJob.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      appliedJob?.status === "rejected"
                        ? "bg-red-400"
                        : appliedJob.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {appliedJob.status.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
