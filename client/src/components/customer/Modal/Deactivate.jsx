import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import api from '../../../config/api';

const Deactivate = ({ isOpen1, onClose1, onDeactivate }) => {
    const [deactivationData, setDeactivationData] = useState({
        password: "",
        reason: "",
        feedback: ""
    });

    const [deactiveConfirm, setDeactiveConfirm] = useState(false);

    if (!isOpen1) return null;


    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === "checkbox") {
            setDeactiveConfirm(checked);
        } else {
            setDeactivationData({
                ...deactivationData,
                [name]: value
            });
        }
    };


    const handleDeactivate = async (e) => {
        e.preventDefault();
        if (!deactiveConfirm) {
            alert("Please confirm to deactivate your account.");
            return;
        }

        const { password, reason, feedback } = deactivationData;

        if (!password) {
            alert("Please enter your password.");
            return;
        }

        if (!reason) {
            alert("Please provide a reason for deactivation.");
            return;
        }

        try {
            const res = await api.put("/user/deactivate", {
                password,
                reason,
                feedback
            });

            console.log("Deactivation success:", res.data);

            if (onDeactivate) {
                onDeactivate(deactivationData);
            }

            // Reset form
            setDeactivationData({
                password: "",
                reason: "",
                feedback: ""
            });
            setDeactiveConfirm(false);

            // Optional: Close modal
            onClose1();

        } catch (error) {
            console.error("Deactivation failed:", error);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div className='inset-0 bg-black/40 backdrop-blur-sm fixed flex justify-center items-center z-50 overflow-auto'>
            <div className='h-[80vh] w-[60vw] bg-white rounded-lg shadow-lg flex flex-col overflow-y-auto'>
                {/* Header */}
                <div className='px-6 py-4 border-b'>
                    <div className='flex justify-between items-center'>
                        <h1 className='text-2xl font-semibold text-red-600'>Deactivate Account</h1>
                        <button onClick={onClose1} className='text-3xl'><RxCross2 /></button>
                    </div>
                </div>
                <form onSubmit={handleDeactivate} className='flex flex-col flex-grow'>
                    {/* Warning */}
                    <div className='p-6'>
                        <div className='border p-4 rounded-lg bg-red-50 border-red-600'>
                            <h2 className='text-lg font-medium mb-2 text-red-500'>Warning:</h2>
                            <label className="flex items-start gap-2 cursor-pointer text-red-500">
                                <input
                                    type="checkbox"
                                    checked={deactiveConfirm}
                                    name="deactiveConfirm"
                                    onChange={handleInputChange}
                                    className="mt-1"
                                />
                                <span>
                                    Temporarily deactivating your account will make your profile and activity invisible to other users. <br />
                                    You can reactivate your account at any time by logging back in.
                                </span>
                            </label>
                        </div>
                    </div>
                    {/* Input Fields */}
                    <div className='px-6 flex flex-col gap-4 flex-grow'>
                        {/* Reason */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Reason for Deactivation <span className='text-red-500'>*</span></label>
                            <select
                                value={deactivationData.reason}
                                name="reason"
                                onChange={handleInputChange}
                                className='w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-red-300'
                            >
                                <option value="">Select a reason</option>
                                <option value="Privacy Concerns">Privacy Concerns</option>
                                <option value="Not Satisfied with the Platform">Not Satisfied with the Platform</option>
                                <option value="Taking a Break">Taking a Break</option>
                                <option value="Found What I Was Looking For">Found What I Was Looking For</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        {/* Feedback */}
                        <div>
                            <label className='block text-sm font-medium text-gray-700'>Additional Feedback (Optional)</label>
                            <textarea
                                value={deactivationData.feedback}
                                onChange={handleInputChange}
                                name="feedback"
                                rows={3}
                                placeholder="Let us know how we can improve..."
                                className='w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-red-300 resize-none'
                            />
                        </div>
                        {/* Password */}
                        <div>
                            <label htmlFor="Confirm-Password" className='text-sm font-medium text-gray-700'>
                                Confirm Password <span className='text-red-500'>*</span>
                            </label>
                            <input
                                type="password"
                                value={deactivationData.password}
                                name="password"
                                onChange={handleInputChange}
                                className='w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-red-300'
                                placeholder="Enter your password to confirm"
                                autoComplete="current-password"
                            />
                        </div>
                    </div>
                    {/* Footer Buttons */}
                    <div className='flex justify-end gap-3 px-6 py-4 border-t'>
                        <button
                            type="button"
                            onClick={onClose1}
                            className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                        >
                            Yes, Deactivate
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Deactivate;
