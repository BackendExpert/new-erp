import secureLocalStorage from "react-secure-storage"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import Icons from '@reacticons/ionicons'
import CountUp from 'react-countup'

const MyFullStats = () => {
    const navigate = useNavigate()
    const {id} = useParams();

    const RoleUser = secureLocalStorage.getItem("loginNew");

    //get current login user's email
    const EmailUser = secureLocalStorage.getItem("logiafter");

        //go back according to login user
        const headleBack = () => {
            if(RoleUser === "Director"){
              navigate('/DirectorDash');
            }
            if(RoleUser === "Secretary"){
                navigate('/Secretary');
            }
            if(RoleUser === "SuperAdmin"){
                navigate('/superAdmin');
            }
            else if(RoleUser === "Admin"){
                navigate('/admin');
            }
            else if(RoleUser === "HOD"){
              navigate('/hod');
            }      
            else if(RoleUser === "TO"){
              navigate('/to');
            }  
            else if(RoleUser === "Librarian"){
              navigate('/librarian');
            } 
            else if(RoleUser === "Labmanager"){
              navigate('/labManager');
            }     
            else if(RoleUser === "Accountant"){
              navigate('/accountant');
            } 
            else if(RoleUser === "User"){
              navigate('/user');
            } 
            else if(RoleUser === "RA"){
              navigate('/RADash');
            } 
            else if(RoleUser === "Scientist"){
              navigate('/ScientistsDash');
            } 
            else if(RoleUser === "NonAcademic"){
              navigate('/NonAcademic');
            } 
            else if(RoleUser === "PDFellow"){
              navigate('/PDFellow');
            } 
        }

        const [buttonValue, SetButtonValue] = useState()
        const HeadleButtonClick = (clickValue) => {
            SetButtonValue(clickValue)   
        }

        //fetch leaves according to login users
        const [viewLeaves, SetviewLeaves] = useState([])
        useEffect(() => {
          axios.get('http://localhost:8081/UserViewLeaves/' + EmailUser)
          .then(res => SetviewLeaves(res.data))
          .catch(err => console.log(err))
        }, [])

        // fetch reseversion data according to login user
        const [ViewRese, SetViewRese] = useState([])
        useEffect(() => {
          axios.get('http://localhost:8081/UserReseView/' + EmailUser)
          .then(res => SetViewRese(res.data))
          .catch(err => console.log(err))
        }, [])

        // fetch srn data according to login user
        const [ViewSRns, SetViewSRns] = useState([])
        useEffect(() => {
          axios.get('http://localhost:8081/UserViewSRN/' + EmailUser)
          .then(res => SetViewSRns(res.data))
          .catch(err => console.log(err))
        }, [])
        
        // fetch wr data
        const [ViewWorkReq, SetViewWorkReq] = useState([])
        useEffect(() => {
          axios.get('http://localhost:8081/UserViewWorReq/' + EmailUser)
          .then(res => SetViewWorkReq(res.data))
          .catch(err => console.log(err))
        }, [])

        // fetch GatePass data
        const [ViewGatePass, SetViewGatePass] = useState([])
        useEffect(() => {
          axios.get('http://localhost:8081/UserViewGatePass/' + EmailUser)
          .then(res => SetViewGatePass(res.data))
          .catch(err => console.log(err))
        }, [])

        // fetch Increment
        const [ViewIncrement, SetViewIncrement] = useState([])
        useEffect(() => {
          axios.get('http://localhost:8081/UserViewInc/' + EmailUser )
          .then(res => SetViewIncrement(res.data))
          .catch(err => console.log(err))
        }, [])

        //count Data

        const [requestLeave, SetrequestLeave] = useState(0);
        const [rejectLeave, SetRejectLeave] = useState(0);
        const [approveLeave, SetapproveLeave] = useState(0);  
        const [myRese, SetMyRese] = useState(0);
        const [ApproveMyRese, SetApproveMyRese] = useState(0);
        const [RequestSRN, SetRequestSRN] = useState(0)
        const [RejectSRN, SetRejectSRN] = useState(0)
        const [RequestWork, SetRequestWork] = useState(0)
        const [RejectWork, SetRejectWork] = useState(0)
        const [ApproveWork, SetApproveWork] = useState(0);
        const [RequstGate, SetRequstGate] = useState(0);
        const [RejectGate, SetRejectGate] = useState(0);
        const [ApprveGate, SetApprveGate] = useState(0);
        const [ReqInc, SetReqInc] = useState(0);
        const [RejectInc, SetRejectInc] = useState(0);
        const [ApproveInc, SetApproveInc] = useState(0);

        useEffect(() => {
          const fetchData = async () => {
            //count for my Request Leave
            try {
              const CountMyRequestLeav = await axios.get('http://localhost:8081/CountMyReqLeave/' + EmailUser);
              SetrequestLeave(CountMyRequestLeav.data.MyRecLeave);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
            //count for my Reject Leave
            try {
              const CountMyRejectLeav = await axios.get('http://localhost:8081/CountMyRejLeave/' + EmailUser);
              SetapproveLeave(CountMyRejectLeav.data.MyRejLeave);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
            //count for my Approve Leave
            try {
              const CountMyApproveLeav = await axios.get('http://localhost:8081/CountAppLeave/' + EmailUser);
              SetapproveLeave(CountMyApproveLeav.data.MyAppLeave);
            } catch (error) {
              console.error('Error fetching data:', error);
            }



            //count for my Request Reservations
            try {
              const CountMyRequestRese = await axios.get('http://localhost:8081/CountRequestRese/' + EmailUser);
              SetMyRese(CountMyRequestRese.data.MyReqRese);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
            //count for my Approve Reservations
            try {
              const CountMyApproveRese = await axios.get('http://localhost:8081/CountApproveRese/' + EmailUser);
              SetApproveMyRese(CountMyApproveRese.data.MyApproveRese);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            // for SRNs
            try {
              const CountMyRequestSRN = await axios.get('http://localhost:8081/CountRequeseSRN/' + EmailUser);
              SetRequestSRN(CountMyRequestSRN.data.MyReqSRN);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            try {
              const CountMyRejectSRN = await axios.get('http://localhost:8081/CountRejectSRN/' + EmailUser);
              SetRejectSRN(CountMyRejectSRN.data.MyRejectSRN);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            try {
              const CountMyRequestWork = await axios.get('http://localhost:8081/CountRequestWork/' + EmailUser);
              SetRequestWork(CountMyRequestWork.data.MyRequestWork);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            try {
              const CountMyRejectWork = await axios.get('http://localhost:8081/CountRejectWork/' + EmailUser);
              SetRejectWork(CountMyRejectWork.data.MyRejectWork);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
            

            try {
              const CountMyApproveWork = await axios.get('http://localhost:8081/CountApproveWork/' + EmailUser);
              SetApproveWork(CountMyApproveWork.data.MyApproveWork);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            // Gatepass
            try {
              const CountReqGate = await axios.get('http://localhost:8081/CountReqGatePass/' + EmailUser);
              SetRequstGate(CountReqGate.data.MyReqGate);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            try {
              const CountRejectGate = await axios.get('http://localhost:8081/CountRejectGatePass/' + EmailUser);
              SetRejectGate(CountRejectGate.data.MyRejectGate);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            try {
              const CountApproveGate = await axios.get('http://localhost:8081/CountApproveGatePass/' + EmailUser);
              SetApprveGate(CountApproveGate.data.MyApprveGate);
            } catch (error) {
              console.error('Error fetching data:', error);
            }


            // increment
            try {
              const CountReqinc = await axios.get('http://localhost:8081/CountReqInc/' + EmailUser);
              SetRejectInc(CountReqinc.data.MyReqInc);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

            try {
              const CountRejectinc = await axios.get('http://localhost:8081/CountRejectInc/' + EmailUser);
              SetReqInc(CountRejectinc.data.MyRejectInc);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
            try {
              const CountApproveinc = await axios.get('http://localhost:8081/CountApproveInc/' + EmailUser);
              SetApproveInc(CountApproveinc.data.MyApproveInc);
            } catch (error) {
              console.error('Error fetching data:', error);
            }

          }
          fetchData();
        }, []);

        const headleDownloadLeaves = () =>{
          axios.get('http://localhost:8081/DownloadCSVLeaves/' + EmailUser , { responseType: 'blob' })
          .then(res => {
              // Create a Blob from the response data
              const blob = new Blob([res.data], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);

              // Create a link element and click it to trigger the download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'myLeaves_'+ EmailUser + '.csv');
              document.body.appendChild(link);
              link.click();

              // Clean up resources
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
          })
          .catch(error => {
            alert(error)
          });
        }

        const headleDownloadRese = () => {
          axios.get('http://localhost:8081/DownloadCSVRese/' + EmailUser , { responseType: 'blob' })
          .then(res => {
              // Create a Blob from the response data
              const blob = new Blob([res.data], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);

              // Create a link element and click it to trigger the download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'myreservations_'+ EmailUser + '.csv');
              document.body.appendChild(link);
              link.click();

              // Clean up resources
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
          })
          .catch(error => {
            alert(error)
          });
        }

        const headleDownloadSRNs = () => {
          axios.get('http://localhost:8081/DownloadCSVSRNs/' + EmailUser , { responseType: 'blob' })
          .then(res => {
              // Create a Blob from the response data
              const blob = new Blob([res.data], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);

              // Create a link element and click it to trigger the download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'mysrns_'+ EmailUser + '.csv');
              document.body.appendChild(link);
              link.click();

              // Clean up resources
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
          })
          .catch(error => {
            alert(error)
          });
        }

        const headleDownloadWork = () => {
          axios.get('http://localhost:8081/DownloadCSVWorks/' + EmailUser , { responseType: 'blob' })
          .then(res => {
              // Create a Blob from the response data
              const blob = new Blob([res.data], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);

              // Create a link element and click it to trigger the download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'myworkRequests_'+ EmailUser + '.csv');
              document.body.appendChild(link);
              link.click();

              // Clean up resources
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
          })
          .catch(error => {
            alert(error)
          });
        }

        const headleDownloadGatepass = () => {
          axios.get('http://localhost:8081/DownloadCSVGatePass/' + EmailUser , { responseType: 'blob' })
          .then(res => {
              // Create a Blob from the response data
              const blob = new Blob([res.data], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);

              // Create a link element and click it to trigger the download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'myGatePass_'+ EmailUser + '.csv');
              document.body.appendChild(link);
              link.click();

              // Clean up resources
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
          })
          .catch(error => {
            alert(error)
          });
        }

        const headleDownloadIncrement = () => {
          axios.get('http://localhost:8081/DownloadCSVIncrement/' + EmailUser , { responseType: 'blob' })
          .then(res => {
              // Create a Blob from the response data
              const blob = new Blob([res.data], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);

              // Create a link element and click it to trigger the download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'myIncrement_'+ EmailUser + '.csv');
              document.body.appendChild(link);
              link.click();

              // Clean up resources
              window.URL.revokeObjectURL(url);
              document.body.removeChild(link);
          })
          .catch(error => {
            alert(error)
          });
        }

    if(id === EmailUser){
        return (
            <div className="bg-gray-200 py-4">
                <div className="bg-white my-2 mx-8 py-6 shadow-xl rounded border-b-4 border-blue-400 px-4">
                    <h1 className="text-xl font-semibold">My All Stats</h1>        
                    <hr className="mb-4" />
                    <button onClick={headleBack} className="border py-4 px-16 border-blue-500 rounded font-semibold text-blue-500 duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>

                    <div className="lg:grid grid-cols-5 gap-3 my-4">
                        <div onClick={() => HeadleButtonClick('Requested Leaves')} className="lg:ml-4 rounded py-4 px-8 bg-yellow-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          <div className="flex">
                            My Request Leaves 
                            <p className="mx-4 text-xl font-bold"><CountUp end={requestLeave} /></p>
                          </div>
                        </div>
                        <div onClick={() => HeadleButtonClick('Reject Leaves')} className="lg:ml-4 rounded py-4 px-8 bg-red-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Reject Leaves 
                            <p className="mx-4 text-xl font-bold"><CountUp end={approveLeave} /></p>
                          </div>                          
                        </div>
                        <div onClick={() => HeadleButtonClick('Approve Leaves')} className="lg:ml-4 rounded py-4 px-8 bg-green-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Approve Leaves 
                            <p className="mx-4 text-xl font-bold"><CountUp end={approveLeave} /></p>
                          </div>                          
                        </div>

                        <div onClick={() => HeadleButtonClick('Requested Reservations')} className="lg:ml-4 rounded py-4 px-8 bg-yellow-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          <div className="flex">
                            My Request Reservations
                            <p className="mx-4 text-xl font-bold"><CountUp end={myRese} /></p>
                          </div>
                        </div>

                        <div onClick={() => HeadleButtonClick('Approve Reservations')} className="lg:ml-4 rounded py-4 px-8 bg-green-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Approve Reservations 
                            <p className="mx-4 text-xl font-bold"><CountUp end={ApproveMyRese} /></p>
                          </div>                          
                        </div>  
                        
                        {/* For SRN */}
                        
                        <div onClick={() => HeadleButtonClick('Request SRN')} className="lg:ml-4 rounded py-4 px-8 bg-yellow-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Request SRN
                            <p className="mx-4 text-xl font-bold"><CountUp end={RequestSRN} /></p>
                          </div>                          
                        </div> 

                        <div onClick={() => HeadleButtonClick('Reject SRN')} className="lg:ml-4 rounded py-4 px-8 bg-red-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Reject SRN 
                            <p className="mx-4 text-xl font-bold"><CountUp end={RejectSRN} /></p>
                          </div>                          
                        </div> 

                         {/* For WorkRequests */}

                         <div onClick={() => HeadleButtonClick('Request Work')} className="lg:ml-4 rounded py-4 px-8 bg-yellow-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Work Requests 
                            <p className="mx-4 text-xl font-bold"><CountUp end={RequestWork} /></p>
                          </div>                          
                        </div> 

                        <div onClick={() => HeadleButtonClick('Reject Work')} className="lg:ml-4 rounded py-4 px-8 bg-red-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Reject Work Request
                            <p className="mx-4 text-xl font-bold"><CountUp end={RejectWork} /></p>
                          </div>                          
                        </div> 

                        <div onClick={() => HeadleButtonClick('Approve Work')} className="lg:ml-4 rounded py-4 px-8 bg-green-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Approve/Completed Work Requests
                            <p className="mx-4 text-xl font-bold"><CountUp end={ApproveWork} /></p>
                          </div>                          
                        </div> 
                        {/* For GatePass */}

                        <div onClick={() => HeadleButtonClick('Request GatePass')} className="lg:ml-4 rounded py-4 px-8 bg-yellow-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Request Gate Pass
                            <p className="mx-4 text-xl font-bold"><CountUp end={RequstGate} /></p>
                          </div>                          
                        </div> 

                        <div onClick={() => HeadleButtonClick('Reject GatePass')} className="lg:ml-4 rounded py-4 px-8 bg-red-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Reject GatePass Request
                            <p className="mx-4 text-xl font-bold"><CountUp end={RejectGate} /></p>
                          </div>                          
                        </div> 

                        <div onClick={() => HeadleButtonClick('Approve GatePass')} className="lg:ml-4 rounded py-4 px-8 bg-green-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Approve GatePass Request
                            <p className="mx-4 text-xl font-bold"><CountUp end={ApprveGate} /></p>
                          </div>                          
                        </div> 

                        {/* Increment Requests */}
                        <div onClick={() => HeadleButtonClick('Request Increment')} className="lg:ml-4 rounded py-4 px-8 bg-yellow-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Increment Requests
                            <p className="mx-4 text-xl font-bold"><CountUp end={ReqInc} /></p>
                          </div>                          
                        </div> 

                        <div onClick={() => HeadleButtonClick('Reject Increment')} className="lg:ml-4 rounded py-4 px-8 bg-red-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Reject Increment Requests
                            <p className="mx-4 text-xl font-bold"><CountUp end={RejectInc} /></p>
                          </div>                          
                        </div> 

                        <div onClick={() => HeadleButtonClick('Approve Increment')} className="lg:ml-4 rounded py-4 px-8 bg-green-500 text-white font-semibold cursor-pointer duration-500 hover:shadow-xl">
                          
                          <div className="flex">
                            My Approve Increment Requests
                            <p className="mx-4 text-xl font-bold"><CountUp end={ApproveInc} /></p>
                          </div>                          
                        </div> 
                    </div>
                    
                    <div className="text-xl mt-6 my-2 font-semibold">
                      My Leaves                       
                    </div>
                    <span onClick={headleDownloadLeaves} className="bg-blue-500 rounded py-2 px-9 text-white shadow-md cursor-pointer duration-500 hover:bg-blue-600 ">
                      download My Leaves 
                    </span>
                        <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                        <th scope='col' className='px-6 py-3'>Leave ID</th>                      
                                        <th scope='col' className='px-6 py-3'>Leave Type</th>
                                        <th scope='col' className='px-6 py-3'>Starting Date</th>                                        
                                        <th scope='col' className='px-6 py-3'>Starting Time</th>
                                        <th scope='col' className='px-6 py-3'>End Date</th>
                                        <th scope='col' className='px-6 py-3'>No. of Days</th>
                                        <th scope='col' className='px-6 py-3'>Status</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      viewLeaves.map((leaveUser, index) => {
                                        if(buttonValue === "Requested Leaves"){
                                          if(leaveUser.Status === "Requested"){
                                            return(
                                              <tr key={index}>
                                                <td className="px-6 py-4 font-bold">{leaveUser.LID}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.Type}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.StartDate}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.StartTime}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.EndDate}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.Duration}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                  <span className="py-2 px-4 rounded bg-yellow-500 text-white">{leaveUser.Status}</span>
                                                </td>    
                                              </tr>
                                            )
                                          }
                                        }
                                        if(buttonValue === "Reject Leaves"){
                                          if(leaveUser.Status === "Reject"){
                                            return(
                                              <tr key={index}>
                                                <td className="px-6 py-4 font-bold">{leaveUser.LID}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.Type}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.StartDate}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.StartTime}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.EndDate}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.Duration}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                  <span className="py-2 px-4 rounded bg-red-500 text-white">{leaveUser.Status}</span>
                                                </td>    
                                              </tr>
                                            )
                                          }
                                        }
                                        if(buttonValue === "Approve Leaves"){
                                          if(leaveUser.Status === "Approve"){
                                            return(
                                              <tr key={index}>
                                                <td className="px-6 py-4 font-bold">{leaveUser.LID}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.Type}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.StartDate}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.StartTime}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.EndDate}</td>
                                                <td className="px-6 py-4 font-bold">{leaveUser.Duration}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                  <span className="py-2 px-4 rounded bg-green-500 text-white">{leaveUser.Status}</span>
                                                </td>    
                                              </tr>
                                            )
                                          }
                                        }
                                      })
                                    }
                                </tbody>
                            </table>
                        </div>

                      <div className="text-xl mt-6 my-2 font-semibold">
                        My Reservations 
                      </div> 
                      <span onClick={headleDownloadRese} className="bg-blue-500 rounded py-2 px-9 text-white shadow-md cursor-pointer duration-500 hover:bg-blue-600 ">
                        download My Reservations 
                      </span>
                      <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                      <th scope='col' className='px-6 py-3'>Reservation ID</th>
                                      <th scope='col' className='px-6 py-3'>Purpose</th>
                                      <th scope='col' className='px-6 py-3'>Division No</th>                                        
                                      <th scope='col' className='px-6 py-3'>Starting Time</th>
                                      <th scope='col' className='px-6 py-3'>Date</th>
                                      <th scope='col' className='px-6 py-3'>Arrival Date</th>
                                      <th scope='col' className='px-6 py-3'>Route</th>
                                      <th scope='col' className='px-6 py-3'>Vehicle Type</th>
                                      <th scope='col' className='px-6 py-3'>Funding</th>
                                      <th scope='col' className='px-6 py-3'>Passengers</th>
                                      <th scope='col' className='px-6 py-3'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      ViewRese.map((ReseV, index) => {
                                        if(buttonValue === "Requested Reservations"){
                                          if(ReseV.Status === "Requested"){
                                            return (
                                              <tr key={index}>
                                                <td className="px-6 py-4 font-bold">{ReseV.RID}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.purpose}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.division}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.time}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.StartDate}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.EndDate}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.loc_route}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.veh_type}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.fundingsource}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.other_passengers}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                  <span className="py-2 px-4 rounded bg-yellow-500 text-white">{ReseV.Status}</span>
                                                </td>    
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Approve Reservations"){
                                          if(ReseV.Status === "Approve"){
                                            return (
                                              <tr key={index}>
                                                <td className="px-6 py-4 font-bold">{ReseV.RID}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.purpose}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.division}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.time}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.StartDate}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.EndDate}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.loc_route}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.veh_type}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.fundingsource}</td>
                                                <td className="px-6 py-4 font-bold">{ReseV.other_passengers}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                  <span className="py-2 px-4 rounded bg-green-500 text-white">{ReseV.Status}</span>
                                                </td>    
                                              </tr>
                                            )
                                          }
                                        }
                                      })
                                    }
                                </tbody>
                            </table>
                        </div>

                        <div className="text-xl mt-6 my-2 font-semibold">
                          My SRN Requests 
                        </div> 
                        <span onClick={headleDownloadSRNs} className="bg-blue-500 rounded py-2 px-9 text-white shadow-md cursor-pointer duration-500 hover:bg-blue-600 ">
                          download My SRNs 
                        </span>
                      <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                      <th scope='col' className='px-6 py-3'>SRN ID</th>
                                      <th scope='col' className='px-6 py-3'>Name</th>
                                      <th scope='col' className='px-6 py-3'>Email</th>
                                      <th scope='col' className='px-6 py-3'>Date</th>                                    
                                      <th scope='col' className='px-6 py-3'>SRN Type</th>
                                      <th scope='col' className='px-6 py-3'>Purchase Type</th>
                                      <th scope='col' className='px-6 py-3'>Item Type</th>
                                      <th scope='col' className='px-6 py-3'>Estimate</th>
                                      <th scope='col' className='px-6 py-3'>Vote</th>
                                      <th scope='col' className='px-6 py-3'>Description</th>                              
                                      <th scope='col' className='px-6 py-3'>Status</th>
                                      <th scope='col' className='px-6 py-3'>Action</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      ViewSRns.map((srnView, index) => {
                                        if(buttonValue === "Request SRN"){
                                          if(srnView.Status === "Request"){
                                            return (
                                              <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{srnView.SID}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.Rdate}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.srnType}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.PType}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.PIype}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.estimate}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.vote}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.description}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{srnView.Status}</span>
                                                    </td> 
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Reject SRN"){
                                          if(srnView.Status === "Reject"){
                                            return (
                                              <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{srnView.SID}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.Rdate}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.srnType}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.PType}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.PIype}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.estimate}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.vote}</td>
                                                    <td className='px-6 py-4 font-bold'>{srnView.description}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-red-500 text-white">{srnView.Status}</span>
                                                    </td> 
                                              </tr>
                                            )
                                          }
                                        }
                                      })
                                    }
                                </tbody>
                            </table>
                        </div>


                        <div className="text-xl mt-6 my-2 font-semibold">
                          My Work Requests
                        </div> 
                        <span onClick={headleDownloadWork} className="bg-blue-500 rounded py-2 px-9 text-white shadow-md cursor-pointer duration-500 hover:bg-blue-600 ">
                          download My Work Requests 
                        </span>
                      <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                      <th scope='col' className='px-6 py-3'>WorkRequest ID</th>
                                      <th scope='col' className='px-6 py-3'>Name</th>
                                      <th scope='col' className='px-6 py-3'>Email</th>
                                      <th scope='col' className='px-6 py-3'>Date</th>                                    
                                      <th scope='col' className='px-6 py-3'>Work Type</th>
                                      <th scope='col' className='px-6 py-3'>Supervisor</th>
                                      <th scope='col' className='px-6 py-3'>Description</th>                          
                                      <th scope='col' className='px-6 py-3'>Status</th>
                                      <th scope='col' className='px-6 py-3'>Action</th>    
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      ViewWorkReq.map((workReq, index) => {
                                        if(buttonValue === "Request Work"){
                                          if(workReq.Status === "Request"){
                                            return (
                                              <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{workReq.WID}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.Name}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.Email}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.RDate}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.WType}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.SEmail}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.description}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <span className="py-2 px-4 rounded bg-yellow-500 text-white">{workReq.Status}</span>
                                                </td> 
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Reject Work"){
                                          if(workReq.Status === "HodReject" || workReq.Status === "Reject"){
                                            return (
                                              <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{workReq.WID}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.Name}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.Email}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.RDate}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.WType}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.SEmail}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.description}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <span className="py-2 px-4 rounded bg-red-500 text-white">{workReq.Status}</span>
                                                </td> 
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Approve Work"){
                                          if(workReq.Status === "Approve" || workReq.Completed === 1){
                                            return (
                                              <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{workReq.WID}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.Name}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.Email}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.RDate}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.WType}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.SEmail}</td>
                                                <td className='px-6 py-4 font-bold'>{workReq.description}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <span className="py-2 px-4 rounded bg-green-500 text-white">{workReq.Status}</span>
                                                </td> 
                                                <td className='px-6 py-4 font-bold'>
                                                    {
                                                      (() => {
                                                        if(workReq.Completed === 1){
                                                          return (
                                                            <span className="py-2 px-4 rounded bg-green-500 text-white">Completed</span>
                                                          )
                                                        }
                                                        else{
                                                          return (
                                                            <span className="py-2 px-4 rounded bg-yellow-500 text-white">Still on Going</span>
                                                          )
                                                        }
                                                      })()
                                                    }
                                                </td> 

                                              </tr>
                                            )
                                          }
                                        }
                                      })
                                    }
                                </tbody>
                            </table>
                        </div>   
                        <div className="text-xl mt-6 my-2 font-semibold">
                          My Gate Pass Requests
                        </div> 
                        <span onClick={headleDownloadGatepass} className="bg-blue-500 rounded py-2 px-9 text-white shadow-md cursor-pointer duration-500 hover:bg-blue-600 ">
                          download My Gate Pass
                        </span>
                      <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                      <th scope='col' className='px-6 py-3'>GatePass ID</th>
                                      <th scope='col' className='px-6 py-3'>Start Date</th>
                                      <th scope='col' className='px-6 py-3'>End Date</th>                                     
                                      <th scope='col' className='px-6 py-3'>Purpose</th>
                                      <th scope='col' className='px-6 py-3'>Start Location</th>
                                      <th scope='col' className='px-6 py-3'>End Location</th> 
                                      <th scope='col' className='px-6 py-3'>Officer</th>
                                      <th scope='col' className='px-6 py-3'>OutSide Officer</th>        
                                      <th scope='col' className='px-6 py-3'>Item</th>                                     
                                      <th scope='col' className='px-6 py-3'>Item Type</th>
                                      <th scope='col' className='px-6 py-3'>Quantity</th>
                                      <th scope='col' className='px-6 py-3'>Invo No</th> 
                                      <th scope='col' className='px-6 py-3'>Status</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      ViewGatePass.map((gateMy, index) => {
                                        if(buttonValue === "Request GatePass"){
                                          if(gateMy.Status === "Request"){
                                            return (
                                              <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.GID}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.Name}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.Email}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.Date}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.location}</td> 
                                                    <td className='px-6 py-4 font-bold'>{gateMy.newplace}</td>                                                
                                                    <td className='px-6 py-4 font-bold'>{gateMy.officer}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.newofficer}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.item}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.itemtype}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.quantity}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-yellow-500 text-white">{gateMy.Status}</span>
                                                    </td>
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Reject GatePass"){
                                          if(gateMy.Status === "HODReject" || gateMy.Status === "Reject"){
                                            return (
                                              <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.GID}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.Date}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.location}</td> 
                                                    <td className='px-6 py-4 font-bold'>{gateMy.newplace}</td>                                                
                                                    <td className='px-6 py-4 font-bold'>{gateMy.officer}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.newofficer}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.item}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.itemtype}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.quantity}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-red-500 text-white">{gateMy.Status}</span>
                                                    </td>
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Approve GatePass"){
                                          if(gateMy.Status === "Approve"){
                                            return (
                                              <tr key={index}>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.GID}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.Date}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.RDate}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.purpose}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.location}</td> 
                                                    <td className='px-6 py-4 font-bold'>{gateMy.newplace}</td>                                                
                                                    <td className='px-6 py-4 font-bold'>{gateMy.officer}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.newofficer}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.item}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.itemtype}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.quantity}</td>
                                                    <td className='px-6 py-4 font-bold'>{gateMy.invno}</td>
                                                    <td className='px-6 py-4 font-bold'>
                                                        <span className="py-2 px-4 rounded bg-green-500 text-white">{gateMy.Status}</span>
                                                    </td>
                                              </tr>
                                            )
                                          }
                                        }
                                      })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className="text-xl mt-6 my-2 font-semibold">
                          My Increment Requests
                        </div> 
                        <span onClick={headleDownloadIncrement} className="bg-blue-500 rounded py-2 px-9 text-white shadow-md cursor-pointer duration-500 hover:bg-blue-600 ">
                          download My Increment Requests
                        </span>
                      <div className="relative overflow-x-auto my-8">
                            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-blue-100 rounded border-t-4 border-blue-200">
                                    <tr className='text-blue-500'>
                                      <th scope='col' className='px-6 py-3'>Increment ID</th>
                                      <th scope='col' className='px-6 py-3'>Email</th>
                                      <th scope='col' className='px-6 py-3'>Role</th>                                     
                                      <th scope='col' className='px-6 py-3'>Salary scale</th>
                                      <th scope='col' className='px-6 py-3'>Increment Date</th>
                                      <th scope='col' className='px-6 py-3'>Salary Step</th> 
                                      <th scope='col' className='px-6 py-3'>New salary</th>
                                      <th scope='col' className='px-6 py-3'>Attendance</th>        
                                      <th scope='col' className='px-6 py-3'>Decipline</th>                                     
                                      <th scope='col' className='px-6 py-3'>Conduct</th>
                                      <th scope='col' className='px-6 py-3'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                      ViewIncrement.map((viewinc, index) => {
                                        if(buttonValue === "Request Increment"){
                                          if(viewinc.status === "Request"){
                                            return (
                                              <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{viewinc.IID}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.email}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.category}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.sscale}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.idate}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.sstep}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.nsalary}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.attendance}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.decipline}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.conduct}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <span className="py-2 px-4 rounded bg-yellow-500 text-white">{viewinc.status}</span>
                                                </td>
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Reject Increment"){
                                          if(viewinc.status === "Reject" || viewinc.status === "HODReject"){
                                            return (
                                              <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{viewinc.IID}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.email}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.category}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.sscale}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.idate}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.sstep}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.nsalary}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.attendance}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.decipline}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.conduct}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <span className="py-2 px-4 rounded bg-red-500 text-white">{viewinc.status}</span>
                                                </td>
                                              </tr>
                                            )
                                          }
                                        }
                                        else if(buttonValue === "Approve Increment"){
                                          if(viewinc.status === "Approve"){
                                            return (
                                              <tr key={index}>
                                                <td className='px-6 py-4 font-bold'>{viewinc.IID}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.email}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.category}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.sscale}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.idate}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.sstep}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.nsalary}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.attendance}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.decipline}</td>
                                                <td className='px-6 py-4 font-bold'>{viewinc.conduct}</td>
                                                <td className='px-6 py-4 font-bold'>
                                                    <span className="py-2 px-4 rounded bg-green-500 text-white">{viewinc.status}</span>
                                                </td>
                                              </tr>
                                            )
                                          }
                                        }
                                      })
                                    }
                                </tbody>
                            </table>
                        </div>                                                  
                </div>
            </div>
        )
    }
    else{
        alert("Don't Try to view Other's Information")
        localStorage.clear();
        window.location.reload()
        navigate('/')
    }

}

export default MyFullStats