import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { motion } from 'framer-motion';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred while registering the company.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-black-50 to-black-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white shadow-lg rounded-lg p-8"
                >
                    <h1 className="font-bold text-3xl text-center text-[blue] mb-4">Create Your Company</h1>
                    <p className="text-gray-600 text-center mb-8">
                        What would you like to name your company?
                    </p>

                    <div className="mb-6">
                        <Label className="text-black-600">Company Name</Label>
                        <Input 
                            type="text"
                            className="my-2 border-black-300 focus:border-black-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                            placeholder="JobHunt, Microsoft, Google, etc.."
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    
                    <div className="flex justify-between">
                        <Button 
                            variant="outline" 
                            className="text-blue-600 border-blue-600 hover:bg-blue-50" 
                            onClick={() => navigate("/admin/companies")}
                        >
                            Cancel
                        </Button>
                        <Button 
                            className="bg-blue-600 text-white hover:bg-blue-700"
                            onClick={registerNewCompany}
                        >
                            Continue
                        </Button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CompanyCreate;
