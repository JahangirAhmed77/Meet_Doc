// AddDoctor.js (Frontend)
import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { AdminContext } from '../../context/AdminContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const AddDoctor = () => {
    const { atoken, Backendurl } = useContext(AdminContext);

    const [docimg, setdocimg] = useState("");
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [Experience, setexperiance] = useState('1 Year');
    const [fees, setfees] = useState('');
    const [about, setabout] = useState('');
    const [speciality, setspeciality] = useState('General Physician');
    const [degree, setdegree] = useState('');
    const [address1, setaddress1] = useState('');
    const [address2, setaddress2] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (!docimg) {
                return toast.error("Image not selected");
            }

            const formData = new FormData();
            formData.append('image', docimg);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('experiance', Experience);
            formData.append('fees', Number(fees));
            formData.append('about', about);
            formData.append('speciality', speciality);
            formData.append('degree', degree);
            formData.append('address', JSON.stringify({ line1: address1, line2: address2 }));

            const { data } = await axios.post(`${Backendurl}/api/admin/add-doctor`, formData, {
                headers: {
                    Authorization: `Bearer ${atoken}`,
                },
            });

            if (data.success) {
                toast.success("Doctor added successfully");
                setdocimg(false)
                setname('');
                setemail('');
                setpassword('');
                setaddress1('');
                setaddress2('');
                setabout('');
                setdegree('');
                setfees('');
                
            } else {
                toast.error(data.message || "Error while adding the doctor");
                
            }
        } catch (error) {
            console.error("Error while adding the doctor:", error);
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-5 w-full">
            <p className="mb-3 text-lg font-medium">Add Doctor</p>

            <div className="bg-white px-8 py-8 w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
                <div className="flex items-center gap-4 mb-8 text-gray-500">
                    <label htmlFor="doc-img">
                        <img
                            className="w-16 bg-gray-100 rounded-full cursor-pointer"
                            src={docimg ? URL.createObjectURL(docimg) : assets.upload_area}
                            alt=""
                        />
                    </label>
                    <input onChange={(e) => setdocimg(e.target.files[0])} type="file" id="doc-img" hidden />
                    <p>
                        Upload your Doctor <br />
                        Picture
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
                    {/* Left Column */}
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>Doctor Name</p>
                            <input onChange={(e) => setname(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder="Name" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>Doctor Email</p>
                            <input onChange={(e) => setemail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder="Email" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>Doctors Password</p>
                            <input onChange={(e) => setpassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder="Password" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>Experience</p>
                            <select onChange={(e) => setexperiance(e.target.value)} value={Experience} className='border rounded px-3 py-2' name="" id="">
                                <option value="1 Year"> 1 Year</option>
                                <option value="2 Year"> 2 Year</option>
                                <option value="3 Year"> 3 Year</option>
                                <option value="4 Year"> 4 Year</option>
                                <option value="5 Year"> 5 Year</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>Fees</p>
                            <input onChange={(e) => setfees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder="fees" required />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className='w-full  lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>Speciality</p>
                            <select onChange={(e) => setspeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
                                <option value="General physician">General physician</option>
                                <option value="Gynecologist">Gynecologist</option>
                                <option value="Dermatologist">Dermatologist</option>
                                <option value="Pediatricians">Pediatricians</option>
                                <option value="Neurologist">Neurologist</option>
                                <option value="Gastroenterologist">Gastroenterologist</option>
                            </select>
                        </div>

                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>Education</p>
                            <input onChange={(e) => setdegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder="Education" required />
                        </div>

                        <div className='flex-1 flex flex-col gap-1 '>
                            <p>address</p>
                            <input onChange={(e) => setaddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder="address 1" required />
                            <input onChange={(e) => setaddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder="address 2" required />
                        </div>
                    </div>
                </div>

                <div>
                    <p className='mt-4 mb-2'>About Doctor</p>
                    <textarea
                        onChange={(e) => setabout(e.target.value)}
                        value={about}
                        type="text"
                        placeholder="write About Doctor"
                        rows={5}
                        required
                        className='w-full px-4 pt-2 border rounded'
                    />
                </div>

                <button type='submit' className='bg-[#04434f]  px-10 py-2 mt-4 text-white rounded-full'>Add Doctor</button>
            </div>
        </form>
    );
};

export default AddDoctor;