import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
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
import UnauthorizedAccess from "./components/UnauthorizedAccess"
import AddProject from "./components/Projects/AddProject"
import Projects from "./components/Projects/Projects"
import UpdateProject from "./components/Projects/UpdateProject"
import AddDivision from "./components/Division/AddDivision"
import UpdateDivision from "./components/Division/UpdateDivision"
import Divisions from "./components/Division/Divisions"
import AddEquipment from "./components/Equipments/AddEquipment"
import Equipments from "./components/Equipments/Equipments"
import UpdateEquipment from "./components/Equipments/UpdateEquipment"
import UsersUnAccess from "./components/SuperAdmin/UsersUnAccess"
import Journals from "./components/library/Journals/Journals"
import AddJournal from "./components/library/Journals/AddJournal"
import Thesis from "./components/library/Thesis/Thesis"
import AddThesis from "./components/library/Thesis/AddThesis"
import Magazine from "./components/library/Magazine/Magazine"
import AddMagazine from "./components/library/Magazine/AddMagazine"
import Profile from "./components/Profile"
import Articles from "./components/library/Articles/Articles"
import AddArticles from "./components/library/Articles/AddArticles"
import Accounts from "./components/Accounts/Accounts"
import AccountInfo from "./components/Accounts/AccountInfo"
import AddLeave from "./components/Leaves/AddLeave"
import DirectorDash from "./components/Director/DirectorDash"
import Secretary from "./components/Secretary/Secretary"
import ScientistsDash from "./components/Scientist/ScientistsDash"
import RADash from "./components/RA/RADash"
import NonAcademic from "./components/NonAcademic/NonAcademic"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/register" element={<SignUp />} ></Route>

        {/* PrivateRoute for protect the following routes from unauthrized access */}
        {/* DirectorDash */}
        <Route path="/DirectorDash" element={<PrivateRoute><DirectorDash /></PrivateRoute>} />
        {/* Secretary */}
        <Route path="/Secretary" element={<PrivateRoute><Secretary /></PrivateRoute>} />
        {/* SuperAdmin */}
        <Route path="/superAdmin" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        {/* Route for View all Unauthorized users on System */}
        <Route path="/Unauthorizedusers/:id" element={<PrivateRoute><UsersUnAccess /></PrivateRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        
        {/* Head of the Department */}
        <Route path="/hod" element={<PrivateRoute><HeadDep /></PrivateRoute>} />
        
        {/* transport Officer */}
        <Route path="/to" element={<PrivateRoute><TransOfficer /></PrivateRoute>} />
        
        {/* librarian */}
        <Route path="/librarian" element={<PrivateRoute><Librarian /></PrivateRoute>} />
        {/* Book */}
        <Route path="/bookadd" element={<PrivateRoute><AddBook /></PrivateRoute>} />
        <Route path="/booklist" element={<PrivateRoute><Books /></PrivateRoute>} />
        <Route path="/BorrowBook/:id" element={<PrivateRoute><BookBorrow /></PrivateRoute>} />
        {/* Journals */}
        <Route path="/Journals" element={<PrivateRoute><Journals /></PrivateRoute>} />
        <Route path="/AddJournal" element={<PrivateRoute><AddJournal /></PrivateRoute>} />
        {/* Thesis */}
        <Route path="/Thesis" element={<PrivateRoute><Thesis /></PrivateRoute>} />
        <Route path="/AddThesis" element={<PrivateRoute><AddThesis /></PrivateRoute>} />
        {/* Magazine */}
        <Route path="/Magazine" element={<PrivateRoute><Magazine /></PrivateRoute>} />
        <Route path="/AddMagazine" element={<PrivateRoute><AddMagazine /></PrivateRoute>} />
        {/* Articles */}
        <Route path="/Articles" element={<PrivateRoute><Articles /></PrivateRoute>} />
        <Route path="/AddArticle" element={<PrivateRoute><AddArticles /></PrivateRoute>} />

        {/* labManager */}
        <Route path="/labManager" element={<PrivateRoute><LabManager /></PrivateRoute>} />
        
        {/* accountant */}
        <Route path="/accountant" element={<PrivateRoute><Accountant /></PrivateRoute>} />
        
        {/* user */}
        <Route path="/user" element={<PrivateRoute><Users /></PrivateRoute>} />

        {/* ScientistsDash */}
        <Route path="/ScientistsDash" element={<PrivateRoute><ScientistsDash /></PrivateRoute>} />

        {/* NonAcademic */}
        <Route path="/NonAcademic" element={<PrivateRoute><NonAcademic /></PrivateRoute>} />

        {/* RADash */}
        <Route path="/RADash" element={<PrivateRoute><RADash /></PrivateRoute>} />

        {/* Employee */}
        <Route path="/Employee" element={<PrivateRoute><Employees /></PrivateRoute>} />
        <Route path="/AddEmployee" element={<PrivateRoute><AddEmployee /></PrivateRoute>} />
        <Route path="/UpdateEmp/:id" element={<PrivateRoute><UpdateEmployee /></PrivateRoute>} />
        
        {/* Designations */}
        <Route path="/AddDesignation" element={<PrivateRoute><AddDesignation /></PrivateRoute>} />
        <Route path="/Designations" element={<PrivateRoute><Designations /></PrivateRoute>} />
        <Route path="/UpdateDesignation/:id" element={<PrivateRoute><UpdateDesignation /></PrivateRoute>} />
       
       {/* Vehicles */}        
        <Route path="/AddVehicle" element={<PrivateRoute><AddVehicle /></PrivateRoute>} />
        <Route path="/Vehicles" element={<PrivateRoute><Vehicles /></PrivateRoute>} />
        <Route path="/UpdateVehicle/:id" element={<PrivateRoute><UpdateVehicle /></PrivateRoute>} />
        
        {/* Programs */}
        <Route path="/AddProgram" element={<PrivateRoute><AddProgram /></PrivateRoute>} />
        <Route path="/Programs" element={<PrivateRoute><Programs /></PrivateRoute>} />
        <Route path="/UpdateProgram/:id" element={<PrivateRoute><UpdateProgram /></PrivateRoute>} />

        {/* for prevent UnauthorizedAccess */}
        <Route path="/UnAccess" element={<PrivateRoute><UnauthorizedAccess /></PrivateRoute>} />

        {/* Projects */}
        <Route path="/AddProject" element={<PrivateRoute><AddProject /></PrivateRoute>} />
        <Route path="/Projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
        <Route path="/UpdateProject/:id" element={<PrivateRoute><UpdateProject /></PrivateRoute>} />

        {/* Divisions */}
        <Route path="/AddDivision" element={<PrivateRoute><AddDivision /></PrivateRoute>} />
        <Route path="/Divisions" element={<PrivateRoute><Divisions /></PrivateRoute>} />
        <Route path="/UpdateDivision/:id" element={<PrivateRoute><UpdateDivision /></PrivateRoute>} />
        
        {/* Equipments */}
        <Route path="/AddEquipment" element={<PrivateRoute><AddEquipment /></PrivateRoute>} />
        <Route path="/Equipments" element={<PrivateRoute><Equipments /></PrivateRoute>} />
        <Route path="/UpdateEquipment/:id" element={<PrivateRoute><UpdateEquipment /></PrivateRoute>} />

        {/* Profile */}
        <Route path="/Profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

        {/* Accounts */}
        <Route path="/Accounts" element={<PrivateRoute><Accounts /></PrivateRoute>} />
        <Route path="/AccountInfo/:id" element={<PrivateRoute><AccountInfo /></PrivateRoute>} />

        {/* AddLeave */}
        <Route path="/AddLeave" element={<PrivateRoute><AddLeave /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}