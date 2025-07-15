import React, { useEffect, useState } from 'react'
import api from '../../config/api'
import { RxCross1 } from "react-icons/rx";
import { IoCameraOutline } from "react-icons/io5";
import toast from 'react-hot-toast';
import Deactivate from './Deactivate.jsx';



const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];
const Districts = {
    "Andhra Pradesh": [
        "Anantapur",
        "Chittoor",
        "East Godavari",
        "Guntur",
        "Krishna",
        "Kurnool",
        "Nellore",
        "Prakasam",
        "Srikakulam",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari",
        "YSR Kadapa"
    ],
    "Uttar Pradesh": [
        "Agra",
        "Aligarh",
        "Allahabad",
        "Ambedkar Nagar",
        "Amethi",
        "Amroha",
        "Auraiya",
        "Ayodhya",
        "Azamgarh",
        "Baghpat",
        "Bahraich",
        "Ballia",
        "Balrampur",
        "Banda",
        "Barabanki",
        "Bareilly",
        "Basti",
        "Bhadohi",
        "Bijnor",
        "Budaun",
        "Bulandshahr",
        "Chandauli",
        "Chitrakoot",
        "Deoria",
        "Etah",
        "Etawah",
        "Farrukhabad",
        "Fatehpur",
        "Firozabad",
        "Gautam Buddha Nagar",
        "Ghaziabad",
        "Ghazipur",
        "Gonda",
        "Gorakhpur",
        "Hamirpur",
        "Hapur",
        "Hardoi",
        "Hathras",
        "Jalaun",
        "Jaunpur",
        "Jhansi",
        "Kannauj",
        "Kanpur Dehat",
        "Kanpur Nagar",
        "Kasganj",
        "Kaushambi",
        "Kheri",
        "Kushinagar",
        "Lalitpur",
        "Lucknow",
        "Maharajganj",
        "Mahoba",
        "Mainpuri",
        "Mathura",
        "Mau",
        "Meerut",
        "Mirzapur",
        "Moradabad",
        "Muzaffarnagar",
        "Pilibhit",
        "Pratapgarh",
        "Raebareli",
        "Rampur",
        "Saharanpur",
        "Sambhal",
        "Sant Kabir Nagar",
        "Shahjahanpur",
        "Shamli",
        "Shravasti",
        "Siddharthnagar",
        "Sitapur",
        "Sonbhadra",
        "Sultanpur",
        "Unnao",
        "Varanasi"
    ],
    "Maharashtra": [
        "Ahmednagar",
        "Akola",
        "Amravati",
        "Aurangabad",
        "Beed",
        "Bhandara",
        "Buldhana",
        "Chandrapur",
        "Dhule",
        "Gadchiroli",
        "Gondia",
        "Hingoli",
        "Jalgaon",
        "Jalna",
        "Kolhapur",
        "Latur",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nanded",
        "Nandurbar",
        "Nashik",
        "Osmanabad",
        "Palghar",
        "Parbhani",
        "Pune",
        "Raigad",
        "Ratnagiri",
        "Sangli",
        "Satara",
        "Sindhudurg",
        "Solapur",
        "Thane",
        "Wardha",
        "Washim",
        "Yavatmal"
    ],
    "West Bengal": [
        "Alipurduar",
        "Bankura",
        "Birbhum",
        "Cooch Behar",
        "Dakshin Dinajpur",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Jhargram",
        "Kalimpong",
        "Kolkata",
        "Malda",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "Paschim Bardhaman",
        "Paschim Medinipur",
        "Purba Bardhaman",
        "Purba Medinipur",
        "Purulia",
        "South 24 Parganas",
        "Uttar Dinajpur"
    ], "Madhya Pradesh": [
        "Agar Malwa",
        "Alirajpur",
        "Anuppur",
        "Ashoknagar",
        "Balaghat",
        "Barwani",
        "Betul",
        "Bhind",
        "Bhopal",
        "Burhanpur",
        "Chhatarpur",
        "Chhindwara",
        "Damoh",
        "Datia",
        "Dewas",
        "Dhar",
        "Dindori",
        "Guna",
        "Gwalior",
        "Harda",
        "Hoshangabad",
        "Indore",
        "Jabalpur",
        "Jhabua",
        "Katni",
        "Khandwa",
        "Khargone",
        "Mandla",
        "Mandsaur",
        "Morena",
        "Narsinghpur",
        "Neemuch",
        "Panna",
        "Raisen",
        "Rajgarh",
        "Ratlam",
        "Rewa",
        "Sagar",
        "Satna",
        "Sehore",
        "Seoni",
        "Shahdol",
        "Shajapur",
        "Sheopur",
        "Shivpuri",
        "Sidhi",
        "Singrauli",
        "Tikamgarh",
        "Ujjain",
        "Umaria",
        "Vidisha"
    ]
}
const City = [
    "Indore",
    "Bhopal",
    "Jabalpur",
    "Gwalior",
    "Ujjain",
    "Sagar",
    "Ratlam",
    "Rewa",
    "Satna",
    "Murwara (Katni)",
    "Singrauli",
    "Burhanpur",
    "Khandwa",
    "Chhindwara",
    "Vidisha",
    "Mandsaur",
    "Neemuch",
    "Hoshangabad",
    "Itarsi",
    "Sehore",
    "Betul",
    "Shivpuri",
    "Guna",
    "Dewas",
    "Dhar",
    "Mandla",
    "Balaghat",
    "Morena",
    "Bhind",
    "Sheopur",
    "Datia",
    "Tikamgarh",
    "Chhatarpur",
    "Panna",
    "Damoh",
    "Narsinghpur",
    "Seoni",
    "Harda",
    "Alirajpur",
    "Barwani",
    "Khargone",
    "Badwani",
    "Jhabua",
    "Rajgarh",
    "Shajapur",
    "Agar Malwa",
    "Umaria",
    "Anuppur",
    "Ashoknagar",
    "Shahdol",
    "Sidhi",
    "Singrauli"
]

const EditProfile = ({ isOpen, onClose, oldData }) => {
    const [preview, setPreview] = useState("");
    const [picture, setPicture] = useState("");
    const [loading, setLoading] = useState(false);
    const [isDeactivateModleOpen, setIsDeactivateModleOpen] = useState(false)

    const [userdata, setUserData] = useState({
        firstname: "",
        lastname: "",
        phonenumber: "",
        photo: "",
        gender: "",
        occupation: "",
        address: "",
        city: "",
        state: "",
        district: "",
        representing: "",
    });

    const handelChange = (e) => {

        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPicture(file);
        setPreview(URL.createObjectURL(file));
    }

    const handleSaveData = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();

        formData.append("firstname", userdata.firstname);
        formData.append("lastname", userdata.lastname);
        formData.append("picture", picture);
        formData.append("phone", userdata.phonenumber);
        formData.append("gender", userdata.gender);
        formData.append("occupation", userdata.occupation);
        formData.append("address", userdata.address);
        formData.append("city", userdata.city);
        formData.append("state", userdata.state);
        formData.append("district", userdata.district);
        formData.append("representing", userdata.representing);

        try {

            const res = await api.put("/user/update", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            toast.success(res.data.message);
            setUserData(res.data.data); // Make sure response has the correct structure
            setPreview(""); // Clear preview
            setPicture(""); // Clear uploaded picture
            onClose(); // Close moda

        } catch (error) {
            toast.error(
                `Error : ${error.response?.status || error.message} | ${error.response?.data.message || ""
                }`
            );
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (oldData && isOpen) {
            setUserData(oldData);
            setPreview(oldData.photo || "");
        }
    }, [isOpen, oldData]);


    if (!isOpen) return null;
    return (
        <div className='bg-white/30 inset-0 fixed flex justify-center items-center'>
            <div className='w-[60vw] h-[80vh] bg-white/95 rounded-lg '>


                <div className=' flex  justify-between text-2xl p-5'>

                    <h1>Edit Profile</h1>
                    <button onClick={onClose}> <RxCross1 /></button>
                </div>
                <div className='flex  max-w-full  h-1/3'>

                    <div className='flex flex-col items-center gap-4 py-4 w-full'>
                        <div className='relative'>
                            <img
                                src={preview || userdata.photo}
                                className='h-[150px] w-[150px] p-1 bg-sky-200 border-2  border-sky-400 rounded-full object-cover'
                                alt="Profile"
                            />
                            <label htmlFor='Imageupload' className='p-1 absolute right-2 bottom-2 bg-blue-200 border-1 rounded-full'>
                                <IoCameraOutline className='text-3xl ' />
                            </label>
                            <input type="file" className='hidden' name='Imageupload' id='Imageupload' onChange={handleImageChange} />

                        </div>

                        <div className='flex items-center gap-2 w-full max-w-xs'>
                            <label className='text-gray-700 whitespace-nowrap'>Email:</label>
                            <input
                                type="email"
                                value={userdata.email}
                                readOnly
                                className='w-full border border-gray-300 p-2 rounded-lg bg-gray-100 focus:outline-none'
                            />
                        </div>
                    </div>


                    <div className=' flex  justify-centeritems-center h-1/1 ps-5 gap-2'>

                        <div className='flex gap-6 p-4'>
                            <div className='flex flex-col gap-4 w-full'>
                                <div className='flex flex-col'>
                                    <label htmlFor="firstname" className='text-gray-700 mb-1'>First Name:</label>
                                    <input
                                        type="text"
                                        id="firstname"
                                        value={userdata.firstname}
                                        name="firstname"
                                        onChange={handelChange}
                                        className='border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="lastname" className='text-gray-700 mb-1'>Last Name:</label>
                                    <input
                                        type="text"
                                        id="lastname"
                                        value={userdata.lastname}
                                        name="lastname"
                                        onChange={handelChange}
                                        className='border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                                    />
                                </div>
                            </div>

                            <div className='flex flex-col gap-4 w-full'>
                                <div className='flex flex-col'>
                                    <label htmlFor="phonenumber" className='text-gray-700 mb-1'>Phone:</label>
                                    <input
                                        type="text"
                                        id="phonenumber"
                                        name="phonenumber"
                                        value={userdata.phonenumber}
                                        onChange={handelChange}
                                        className='border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                                    />
                                </div>

                                <div className='flex flex-col'>
                                    <label htmlFor="gender" className='text-gray-700 mb-1'>gender:</label>
                                    <select
                                        name="gender"
                                        value={userdata.gender}
                                        onChange={handelChange}
                                        className="p-2 border rounded-lg outline-none border-blue-300 w-full"
                                    >
                                        <option value="N/A">N/A</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

                <div className='max-w-full '>

                    <h1 className='text-center border-b-1 p-5 '>
                        Additional Informtion
                    </h1>

                    <div className=' flex flex-col gap-10 py-5'>
                        <div className=' flex justify-evenly'>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="occupation" className="text-gray-700 text-sm font-medium">
                                    Occupation
                                </label>
                                <select
                                    name="occupation"
                                    value={userdata.occupation}
                                    onChange={handelChange}
                                    className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all"
                                >
                                    <option value="">Select Occupation</option>
                                    <option value="Student">Student</option>
                                    <option value="Teacher">Teacher</option>
                                    <option value="Engineer">Engineer</option>
                                    <option value="Doctor">Doctor</option>
                                    <option value="Lawyer">Lawyer</option>
                                    <option value="Business Owner">Business Owner</option>
                                    <option value="Government Employee">Government Employee</option>
                                    <option value="Private Sector Employee">Private Sector Employee</option>
                                    <option value="Farmer">Farmer</option>
                                    <option value="Homemaker">Homemaker</option>
                                    <option value="Retired">Retired</option>
                                    <option value="Freelancer">Freelancer</option>
                                    <option value="Artist">Artist</option>
                                    <option value="Actor">Actor</option>
                                    <option value="Police">Police</option>
                                    <option value="Army">Army</option>
                                    <option value="Driver">Driver</option>
                                    <option value="Plumber">Plumber</option>
                                    <option value="Electrician">Electrician</option>
                                    <option value="Other">Other</option>
                                </select>

                            </div>


                            <div className='flex flex-col'>
                                <label htmlFor="representing" className='text-gray-700 mb-1'>representing:</label>
                                <select
                                    name="representing"
                                    value={userdata.representing}
                                    onChange={handelChange}
                                    className="p-2 border rounded-lg outline-none border-blue-300 w-full"
                                >
                                    <option value="N/A">N/A</option>
                                    <option value="bride">bride</option>
                                    <option value="groom">groom</option>
                                    <option value="guest">guest</option>
                                    <option value="Other">other</option>
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="state" className='text-gray-700 mb-1'>state:</label>
                                <select
                                    name="state"
                                    value={userdata.state}
                                    onChange={handelChange}
                                    className="p-2 border rounded-lg outline-none border-blue-300 w-full"
                                >
                                    <option value="N/A">N/A</option>
                                    {indianStates ? (indianStates.map((State, index) => (
                                        <option value={State} key={index}>{State}</option>
                                    ))) : "N/A"}


                                </select>
                            </div>




                        </div>
                        <div className=' flex justify-evenly'>
                            <div className='flex flex-col'>
                                <label htmlFor="district" className='text-gray-700 mb-1'>District:</label>
                                <select
                                    name="district"
                                    value={userdata.district}
                                    onChange={handelChange}
                                    className="p-2 border rounded-lg outline-none border-blue-300 w-full"
                                >
                                    <option value="N/A">N/A</option>

                                    {Districts && Districts[userdata.state]
                                        ? Districts[userdata.state].map((dist, index) => (
                                            <option value={dist} key={index}>{dist}</option>
                                        ))
                                        : "N/A"
                                    }

                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="city" className='text-gray-700 mb-1'>city:</label>
                                <select
                                    name="city"
                                    value={userdata.city}
                                    onChange={handelChange}
                                    className="p-2 border rounded-lg outline-none border-blue-300 w-full"
                                >
                                    <option value="N/A">N/A</option>
                                    {City && City.map((Cities, index) => (
                                        <option value={Cities} key={index}>{Cities}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex flex-col'>
                                <label htmlFor="address" className='text-gray-700 mb-1'>address:</label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={userdata.address}
                                    onChange={handelChange}
                                    className='border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-blue-500'
                                />
                            </div>


                        </div>
                    </div>



                </div>



                <div className='flex  items-center p-4 border-t border-gray-200 mt-4'>


                    <div className='flex justify-between items-center  w-full'>
                        <button className='px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors' onClick={() => setIsDeactivateModleOpen(true)}>
                            Deactivate Account
                        </button>
                        <button
                            className='px-6 py-2 bg-blue-500  text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50'
                            onClick={handleSaveData}
                            disabled={loading}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </div>
                </div>

                <Deactivate
                    isOpen1={isDeactivateModleOpen}
                    onClose1={() => setIsDeactivateModleOpen(false)}
                    onDeactivate={({ password, reason, feedback }) => {
                        console.log("Deactivating with:", password, reason, feedback);
                        toast.success("Account deactivated successfully.");
                        setIsDeactivateModleOpen(false);
                    }}
                />



            </div>
        </div>
    );
}

export default EditProfile




















