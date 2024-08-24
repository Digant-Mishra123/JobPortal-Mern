import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetCompanyAllCompanies from "@/hooks/useGetAllCompanies";
import { useDispatch } from "react-redux";
import { setSearchCompanyByText } from "@/redux/companySlice";

const Companies = () => {
  useGetCompanyAllCompanies();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchCompanyByText(input));
  }, [input]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto my-5 p-2 bg-white shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <Input
            className="w-full max-w-md"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            className="ml-4"
            onClick={() => navigate("/admin/companies/create")}
          >
            Create New Company
          </Button>
        </div>
        <p className="text-lg font-semibold p-2 text-center">
          A list of your companies
        </p>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
