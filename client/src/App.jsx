import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/LoginSignUp/Login"
import { SignUp } from "./components/LoginSignUp/SignUp"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} ></Route>
        <Route path="/register" element={<SignUp />} ></Route>
      </Routes>
    </BrowserRouter>
  )
}