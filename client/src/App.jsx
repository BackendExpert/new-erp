import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/LoginSignUp/Login"
import { SignUp } from "./components/LoginSignUp/SignUp"
import SuperAdmin from "./components/SuperAdmin/SuperAdmin"
import About from "./components/AdminTest/About"
import Dash from "./components/AdminTest/Dash"
import SideList from "./components/SuperAdmin/SideList"
import PrivateRoute from "./components/ProtectedRoute"
import Admin from "./components/Admin/Admin"
import HeadDep from "./components/HOD/HeadDep"
import TransOfficer from "./components/TransportOfficer/TransOfficer"
import Librarian from "./components/Librarian/Librarian"
import LabManager from "./components/LabManager/LabManager"
import Accountant from "./components/Accountant/Accountant"
import Users from "./components/Users/Users"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/register" element={<SignUp />} ></Route>

        <Route path="/superAdmin" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
        <Route path="/hod" element={<PrivateRoute><HeadDep /></PrivateRoute>} />
        <Route path="/to" element={<PrivateRoute><TransOfficer /></PrivateRoute>} />
        <Route path="/librarian" element={<PrivateRoute><Librarian /></PrivateRoute>} />
        <Route path="/labManager" element={<PrivateRoute><LabManager /></PrivateRoute>} />
        <Route path="/accountant" element={<PrivateRoute><Accountant /></PrivateRoute>} />
        <Route path="/user" element={<PrivateRoute><Users /></PrivateRoute>} />

        <Route path="/dash" element={<Dash />} ></Route>
        <Route path="/about" element={<About />} ></Route>
        </Routes>
    </BrowserRouter>
  )
}