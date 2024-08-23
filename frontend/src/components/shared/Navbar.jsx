import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import axios from "axios";

const Navbar = () => {
  // const user = false;
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 ">
        <div>
          <h1 className="text-3xl font-bold">
            Career<span className="text-[blue]">Hub</span>
          </h1>
        </div>
        <div className="flex items-center gap-12 bg-gray-50 p-4 shadow-md">
          <ul className="flex font-semibold text-gray-800 items-center gap-6">
            {user && user.role === "Recruiter" ? (
              <>
                <li className="hover:underline">
                  <Link
                    to="/admin/companies"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Companies
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/admin/jobs"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Jobs
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:underline">
                  <Link to="/" className="text-bold text-blue-600 hover:text-blue-800">
                    Home
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/jobs"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Jobs
                  </Link>
                </li>
                <li className="hover:underline">
                  <Link
                    to="/browse"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Browse
                  </Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 text-white hover:bg-blue-700">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-blue-500">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white shadow-lg rounded-lg p-4">
                <div className="flex gap-4 items-center mb-4">
                  <Avatar className="cursor-pointer ring-2 ring-blue-500">
                    <AvatarImage
                      src={user?.profile?.profilePhoto}
                      alt="@user"
                    />
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {user?.fullname}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {user?.profile?.bio}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col space-y-2 text-gray-700">
                  {user && user.role === "Student" && (
                    <div className="flex items-center gap-2 cursor-pointer">
                      <User2 className="text-blue-600" />
                      <Button
                        variant="link"
                        className="text-blue-600 hover:underline"
                      >
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="text-red-600" />
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="text-red-600 hover:underline"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

