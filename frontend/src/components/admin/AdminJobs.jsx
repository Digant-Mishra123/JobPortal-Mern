import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/hooks/usegetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(setSearchJobByText(input))
    },[input])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-5 p-2 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between ">
          <Input className="w-fit" placeholder="Filter by name, role" onChange={(e) => setInput(e.target.value)}/>
          <Button onClick={() => navigate("/admin/jobs/create")}>Post New Job</Button>
        </div>
        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
