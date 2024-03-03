import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/LoginSignUp/Login"
import { SignUp } from "./components/LoginSignUp/SignUp"
import SuperAdmin from "./components/SuperAdmin/SuperAdmin"
import About from "./components/AdminTest/About"
import Dash from "./components/AdminTest/Dash"
import SideList from "./components/SuperAdmin/SideList"
import PrivateRoute from "./components/ProtectedRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/register" element={<SignUp />} ></Route>

        <Route path="/superAdmin" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="/hod" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="/to" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="/librarian" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="/labManager" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />
        <Route path="/superAdmin" element={<PrivateRoute><SuperAdmin /></PrivateRoute>} />

        <Route path="/dash" element={<Dash />} ></Route>
        <Route path="/about" element={<About />} ></Route>
        </Routes>
    </BrowserRouter>
  )
}