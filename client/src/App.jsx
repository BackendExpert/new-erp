import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/LoginSignUp/Login"
import { SignUp } from "./components/LoginSignUp/SignUp"
import SuperAdmin from "./components/SuperAdmin/SuperAdmin"
import SideList from "./components/SuperAdmin/SideList"
import PrivateRoute from "./components/ProtectedRoute"
import Admin from "./components/Admin/Admin"
import HeadDep from "./components/HOD/HeadDep"
import TransOfficer from "./components/TransportOfficer/TransOfficer"
import Librarian from "./components/Librarian/Librarian"
import LabManager from "./components/LabManager/LabManager"
import Accountant from "./components/Accountant/Accountant"
import Users from "./components/Users/Users"
import AddBook from "./components/library/Books/AddBook"
import Books from "./components/library/Books/Books"
import BookBorrow from "./components/library/Books/BookBorrow"
import Employees from "./components/Employees/Employees"
import AddEmployee from "./components/Employees/AddEmployee"
import UpdateEmployee from "./components/Employees/UpdateEmployee"
import AddDesignation from "./components/Designation/AddDesignation"
import Designations from "./components/Designation/Designations"
import UpdateDesignation from "./components/Designation/UpdateDesignation"
import AddVehicle from "./components/Vehicle/AddVehicle"
import Vehicles from "./components/Vehicle/Vehicles"
import UpdateVehicle from "./components/Vehicle/UpdateVehicle"
import AddProgram from "./components/Program/AddProgram"
import Programs from "./components/Program/Programs"
import UpdateProgram from "./components/Program/UpdateProgram"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/register" element={<SignUp />} ></Route>

        {/* PrivateRoute for protect the following routes from unauthrized access */}
        <Route path="/superAdmin" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        
        <Route path="/hod" element={<PrivateRoute><HeadDep /></PrivateRoute>} />
        
        <Route path="/to" element={<PrivateRoute><TransOfficer /></PrivateRoute>} />
        
        <Route path="/librarian" element={<PrivateRoute><Librarian /></PrivateRoute>} />
        
        <Route path="/labManager" element={<PrivateRoute><LabManager /></PrivateRoute>} />
        
        <Route path="/accountant" element={<PrivateRoute><Accountant /></PrivateRoute>} />
        
        <Route path="/user" element={<PrivateRoute><Users /></PrivateRoute>} />
        
        <Route path="/bookadd" element={<PrivateRoute><AddBook /></PrivateRoute>} />
        <Route path="/booklist" element={<PrivateRoute><Books /></PrivateRoute>} />
        <Route path="/BorrowBook/:id" element={<PrivateRoute><BookBorrow /></PrivateRoute>} />
        
        <Route path="/Employee" element={<PrivateRoute><Employees /></PrivateRoute>} />
        <Route path="/AddEmployee" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
        <Route path="/UpdateEmp/:id" element={<PrivateRoute><UpdateEmployee /></PrivateRoute>} />
        
        <Route path="/AddDesignation" element={<PrivateRoute><AddDesignation /></PrivateRoute>} />
        <Route path="/Designations" element={<PrivateRoute><Designations /></PrivateRoute>} />
        <Route path="/UpdateDesignation/:id" element={<PrivateRoute><UpdateDesignation /></PrivateRoute>} />
        
        <Route path="/AddVehicle" element={<PrivateRoute><AddVehicle /></PrivateRoute>} />
        <Route path="/Vehicles" element={<PrivateRoute><Vehicles /></PrivateRoute>} />
        <Route path="/UpdateVehicle/:id" element={<PrivateRoute><UpdateVehicle /></PrivateRoute>} />
        
        <Route path="/AddProgram" element={<PrivateRoute><AddProgram /></PrivateRoute>} />
        <Route path="/Programs" element={<PrivateRoute><Programs /></PrivateRoute>} />
        <Route path="/UpdateProgram/:id" element={<PrivateRoute><UpdateProgram /></PrivateRoute>} />
        
      </Routes>
    </BrowserRouter>
  )
}