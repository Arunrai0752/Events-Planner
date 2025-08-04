import React, { useState, useEffect } from "react";
import { FaEye, FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoAddCircleOutline } from "react-icons/io5";
import ViewBanquetModal from "./modals/ViewBanquetModal.jsx";
import EditBanquetModal from "./modals/EditBanquetModal.jsx";
import DeleteBanquetModal from "./modals/DeleteBanquetModal.jsx";
import AddBanquetModal from "./modals/AddBanquetModal.jsx";
import api from "../../config/api.jsx";


const BanquetHall = () => {
    const [banquetHalls, setBanquetHalls] = useState([
        {
            hallName: "",
            address: "",
            capacity: "",
            managerName: "",
            photos: [],
            contactNumber: "",
            email: "",
            rent: "",
            minBookingAmount: "",
            featureDescription: ""
        }
    ]);
    const [addBanquetHallModel, setAddBanquetHallModel] = useState(false);
    const [viewBanquetHallModel, setViewBanquetHallModel] = useState(false);
    const [editBanquetHallModel, setEditBanquetHallModel] = useState(false);
    const [deleteBanquetHallModel, setDeleteBanquetHallModel] = useState(false);
    const [selectedHall, setSelectedHall] = useState(null);

    useEffect(() => {
        const fetchBanquetHalls = async () => {
            try {

                const res = await api.get("/hall/get")
                setBanquetHalls(res.data.data)
                console.log(res.data.data);

                toast.success(res.data.message)
            } catch (error) {
                toast.error("Error fetching banquet halls:", error);
            }
        };

        fetchBanquetHalls();
    }, []);

    const handleView = (hall) => {
        setSelectedHall(hall);
        setViewBanquetHallModel(true);
    };

    const handleEdit = (hall) => {
        setSelectedHall(hall);
        setEditBanquetHallModel(true);
    };

    const handleDelete = (hall) => {
        setSelectedHall(hall);
        setDeleteBanquetHallModel(true);
    };


    return (
        <>
            <div className="px-4 mt-3 flex justify-between">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Banquet Halls</h2>
                <button
                    className="border rounded px-4 flex gap-3 items-center text-lg border-green-500 bg-green-500 text-white hover:bg-transparent hover:text-green-500"
                    onClick={() => setAddBanquetHallModel(true)}
                >
                    <IoAddCircleOutline /> Add New Hall
                </button>
            </div>

            <div className="m-3">
                <table className="min-w-full bg-white rounded-lg p-2">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-3 px-4 text-left">Hall Name</th>
                            <th className="py-3 px-4 text-left">Manager Name</th>
                            <th className="py-3 px-4 text-left">Contact Number</th>
                            <th className="py-3 px-4 text-left">Capacity</th>
                            <th className="py-3 px-4 text-left">Rent</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="p-4">
                        {banquetHalls.length > 0 ? (
                            banquetHalls.map((hall) => (
                                <tr className="hover:bg-gray-50" key={hall._id}>
                                    <td className="py-2 px-4">{hall.hallName}</td>
                                    <td className="py-2 px-4">{hall.managerName}</td>
                                    <td className="py-2 px-4">{hall.contactNumber}</td>
                                    <td className="py-2 px-4">{hall.capacity}</td>
                                    <td className="py-2 px-4">₹{hall.rent}</td>
                                    <td className="py-2 px-4 space-x-2">
                                        <button
                                            className="text-blue-400 px-3 py-1 rounded hover:text-blue-600"
                                            onClick={() => handleView(hall)}
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            className="text-yellow-400 px-3 py-1 rounded hover:text-yellow-600"
                                            onClick={() => handleEdit(hall)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="text-red-400 px-3 py-1 rounded hover:text-red-600"
                                            onClick={() => handleDelete(hall)}
                                        >
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center p-3 text-red-500">
                                    --No Banquets Halls are available --
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modals */}
            {viewBanquetHallModel && (
                <ViewBanquetModal
                    hall={selectedHall}
                    onClose={() => setViewBanquetHallModel(false)}
                />
            )}

            {editBanquetHallModel && (
                <EditBanquetModal
                    hall={selectedHall}
                    onClose={() => setEditBanquetHallModel(false)}
                />
            )}

            {deleteBanquetHallModel && (
                <DeleteBanquetModal
                    hall={selectedHall}
                    onClose={() => setDeleteBanquetHallModel(false)}
                />
            )}


            {addBanquetHallModel && (
                <AddBanquetModal
                    onClose={() => setAddBanquetHallModel(false)}
                />)}
        </>
    );
};

export default BanquetHall;