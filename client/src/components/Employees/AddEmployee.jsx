import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";

const AddEmployee = () => {
    const navigate = useNavigate();

    //get the login user
    const RoleUser = secureLocalStorage.getItem("loginNew");


    //this page can access by following users
    // SuperAdmin, Admin, Accountant


    //headleback
    const headleBack = () => {
        navigate('/Employee');
    }

    const [empData, SetEmpData] = useState({
        eid:'',
        initial:'',
        surname:'',
        address:'',
        phone:'',
        email:'',
        password:'',
        salary:'',
        image:'',
        category:'',
        nic:'',
        dob:'',
        type:'',
        emgcontact:'',
        civilstatus:'',
        gender:'',
        designation:'',
        relig:'',
        dno:''
    })

    const headleEmpSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('eid', empData.eid);
        formdata.append('initial', empData.initial);
        formdata.append('surname', empData.surname);
        formdata.append('address', empData.address);
        formdata.append('phone', empData.phone);
        formdata.append('email', empData.email);
        formdata.append('password', empData.password);
        formdata.append('category', empData.category);
        formdata.append('nic', empData.nic);
        formdata.append('dob', empData.dob);
        formdata.append('emgcontact', empData.emgcontact);
        formdata.append('type', empData.type);
        formdata.append('designation', empData.designation);
        formdata.append('civilstatus', empData.civilstatus);
        formdata.append('gender', empData.gender);
        formdata.append('relig', empData.relig);
        formdata.append('image', empData.image); 
        formdata.append('dno', empData.dno); 

        axios.post('http://localhost:8081/createEmp', formdata)
        .then(res => {
            if(res.data.Status === "Success"){

                alert("Employee Added Successfully");

                navigate('/Employee');
            }
            else{
                alert(res.data.Error);
            }
        })
    }
    const [divisionData, SetdivisionData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8081/DivisionView')
        .then(res => SetdivisionData(res.data))
        .catch(err => console.log(err))
    }, [])


    if(RoleUser === "SuperAdmin" || RoleUser === "Admin" || RoleUser === "Accountant"){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">Add New Employee</h1>
                    <hr className="mb-4" />
                    <div className="flex">
                        <button onClick={headleBack} className="border border-blue-500 py-3 px-16 rounded text-blue-500 font-semibold duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                    </div>
                    <div className="my-4">
                        <form onSubmit={headleEmpSubmit}>
                            <div className="my-4 lg:grid grid-cols-3 gap-2">
                                <div className="">
                                    <label htmlFor="">Employee No</label>
                                    <input type="text" required name="eid" className="pl-2 border border-blue-400 rounded w-full h-12"  placeholder="Enter Employee ID" 
                                    onChange={e => SetEmpData({...empData, eid:e.target.value})}/>
                                    <p className="text-red-500">(Integer type, max length 11, unique)</p>
                                </div>
                                <div className="">
                                    <label htmlFor="">Division No</label>
                                    <select className="w-full h-12 border border-blue-400 rounded pl-2" required name="did"
                                    onChange={e => SetEmpData({...empData, dno:e.target.value})}>
                                        <option value="">Select Division</option>
                                    {
                                        divisionData.map((divi => {
                                            return (
                                                <option value={divi.did}>{divi.title}</option>
                                            )
                                        })) 
                                    }
                                    </select>

                                </div>
                                <div className="">
                                    <label htmlFor="">Initials</label>
                                    <input type="text" required name="initial" className="pl-2 border border-blue-400 rounded w-full h-12" placeholder="Enter Initials" 
                                    onChange={e => SetEmpData({...empData, initial:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 25)</p>
                                </div>
                                <div className="">
                                    <label htmlFor="">Surname</label>
                                    <input type="text" required name="surname" className="pl-2 border border-blue-400 rounded w-full h-12" placeholder="Enter Surname" 
                                    onChange={e => SetEmpData({...empData, surname:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 150)</p>
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-1">
                                <div className="">
                                    <label htmlFor="">Address</label>
                                    <input type="text" required name="address" className="pl-2 border border-blue-400 rounded w-full h-12" placeholder="Enter Address" 
                                    onChange={e => SetEmpData({...empData, address:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 200)</p>
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-4 gap-2">
                                <div className="">
                                    <label htmlFor="">Phone No</label>
                                    <input type="text" required name="phone" className="pl-2 border border-blue-400 rounded w-full h-12" placeholder="Enter Phone Number" 
                                    onChange={e => SetEmpData({...empData, phone:e.target.value})}/>
                                    <p className="text-red-500">(Integer type, max length 11 eg: 0712345678)</p>
                                </div>
                                <div className="">
                                    <label htmlFor="">Email</label>
                                    <input type="email" required name="email" className="pl-2 border border-blue-400 rounded w-full h-12"  placeholder="Enter Email" 
                                    onChange={e => SetEmpData({...empData, email:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 100)</p>
                                </div>
                                <div className="">
                                    <label htmlFor="">Password</label>
                                    <input type="password" required name="password" className="pl-2 border border-blue-400 rounded w-full h-12" placeholder="Enter Password" 
                                    onChange={e => SetEmpData({...empData, password:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 120)</p>
                                </div>
                                {/* <div className="">
                                    <label htmlFor="">Salary</label>
                                    <input type="text" required name="salary" className="pl-2 border border-blue-400 rounded w-full h-12" placeholder="Enter Salary" 
                                    onChange={e => SetEmpData({...empData, salary:e.target.value})}/>
                                    <p className="text-red-500">(desimal type, max length 8, eg: 150000.00)</p>
                                </div> */}
                            </div>
                            <div className="my-4 lg:grid grid-cols-4 gap-2">
                                <div className="">
                                    <label htmlFor="">Designation</label>
                                    <select className="w-full h-12 border border-blue-400 rounded pl-2" required
                                    onChange={e => SetEmpData({...empData, designation:e.target.value})}>
                                        <option>Select Option</option>
                                        <option value="Non Academic">Non Academic</option>
                                        <option value="Academic">Academic</option>                                        
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Job Category</label>
                                    <select className="w-full h-12 border border-blue-400 rounded pl-2" required
                                    onChange={e => SetEmpData({...empData, category:e.target.value})}>
                                        <option>Select Option</option>
                                        <option value="HOD">Head</option>
                                        <option value="TO">Transport Office</option>
                                        <option value="Librarian">Librarian</option>
                                        <option value="Labmanager">Labmanager</option>
                                        <option value="Accountant">Accountant</option> 
                                        <option value="PostDoc">PostDoc</option>
                                        <option value="NonAcademic Staff">NonAcademic Staff</option>
                                        <option value="RA">RA</option>   
                                        <option value="VRA">Volunteer RA</option>  
                                        <option value="Driver">Driver</option>      
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Employement Type</label>
                                    <select className="w-full h-12 border border-blue-400 rounded pl-2" required
                                    onChange={e => SetEmpData({...empData, type:e.target.value})}>
                                        <option>Select Option</option>
                                        <option value="Permanent">Permanent</option>
                                        <option value="Contract">Contract</option>
                                        <option value="Assignment">Assignment</option>
                                        <option value="Visiting">Visiting</option>
                                        <option value="Temporary">Temporary</option>
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Marital Status</label>
                                    <select className="w-full h-12 border border-blue-400 rounded pl-2" required
                                    onChange={e => SetEmpData({...empData, civilstatus:e.target.value})}>
                                        <option>Select Option</option>
                                        <option value="Married">Married</option>
                                        <option value="Single">Single</option>
                                    </select>
                                </div>
                            </div>
                            <div className="my-4 lg:grid grid-cols-3 gap-2">
                                <div className="">
                                    <label htmlFor="">Date of Birth</label>
                                    <input type="date" name="dob" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Date of Birth" 
                                    onChange={e => SetEmpData({...empData, dob:e.target.value})}/>
                                </div>
                                <div className="">
                                    <label htmlFor="">Religous</label>
                                    <input type="text" name="religous" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Religous" 
                                    onChange={e => SetEmpData({...empData, relig:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 25)</p>
                                </div>
                                <div className="">
                                    <label htmlFor="">NIC No</label>
                                    <input type="text" name="nic" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter NIC Number" 
                                    onChange={e => SetEmpData({...empData, nic:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 12 eg:XXXXXXXXXXXX, XXXXXXXXXV)</p>
                                </div>
                                <div className="">
                                    <label htmlFor="">Emergency Phone No</label>
                                    <input type="text" name="emgcontact" className="pl-2 border border-blue-400 rounded w-full h-12" required placeholder="Enter Emergency Phone No" 
                                    onChange={e => SetEmpData({...empData, emgcontact:e.target.value})}/>
                                    <p className="text-red-500">(String type, max length 245)</p>
                                </div>
                                <div className="">
                                    <label htmlFor="">Your Gender</label>
                                    <select name="" id="" className="w-full h-12 border border-blue-400 rounded pl-2" required
                                    onChange={e => SetEmpData({...empData, gender:e.target.value})}>
                                        <option>Select Option</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="">
                                    <label htmlFor="">Select Image</label>
                                    <input type="file"  name="image" className="pl-2  rounded w-full bg-blue-500" required placeholder="Upload File" 
                                    onChange={e => SetEmpData({...empData, image:e.target.files[0]})} />
                                </div>
                            </div>
                            <div className="">
                                <button type="submit" className="rounded px-16 py-2 border border-green-500 text-green-500 font-semibold duration-500 hover:bg-green-500 hover:text-white hover:shadow-xl">
                                    Add Employee
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            navigate('/UnAccess');
          }, [])
    }

}

export default AddEmployee