import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Bookmark, Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const daysAgoFunction = (mongodbTime) => {
  const createdAt = new Date(mongodbTime);
  const currentTime = new Date();
  const timeDifference = currentTime - createdAt;
  return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
};

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      companies.length >= 0 &&
      companies.filter((company) => {
        if (!searchCompanyByText) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(searchCompanyByText.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4 ">
      {filterCompany?.map((company) => (
        <motion.div
          key={company._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-2 bg-purple-50">
            <div className="flex items-center justify-between">
              <p className="text-md font-bold-500">
                {daysAgoFunction(company?.createdAt) == 0
                  ? "Today"
                  : `${daysAgoFunction(company?.createdAt)} days ago`}
              </p>
              <Button variant="outline" className="rounded-full" size="icon">
                <Bookmark />
              </Button>
            </div>
            <div className="flex items-center justify-center mb-4">
              <Avatar>
                <AvatarImage
                  src={company.logo}
                  alt={`${company.name} Logo`}
                  //   className="text-xl"
                />
              </Avatar>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">{company.name}</h2>
              <p className="text-gray-600 mb-4">
                {company.createdAt.split("T")[0]}
              </p>
              <div className="relative">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="text-gray-600 cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-24 absolute right-0 mt-2">
                    <div
                      onClick={() =>
                        navigate(`/admin/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Edit2 className="w-4 text-gray-600" />
                      <span>Edit</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CompaniesTable;
