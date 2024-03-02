import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/LoginSignUp/Login"
import { SignUp } from "./components/LoginSignUp/SignUp"
import SuperAdmin from "./components/SuperAdmin/SuperAdmin"
import About from "./components/AdminTest/About"
import Dash from "./components/AdminTest/Dash"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/register" element={<SignUp />} ></Route>
        <Route path="/superAdmin" element={<SuperAdmin />} ></Route>
        <Route path="/dash" element={<Dash />} ></Route>
        <Route path="/about" element={<About />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}