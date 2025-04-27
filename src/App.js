import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";


import Login from "./Pages/Login";
import HomePage from "./Pages/Home";
import Register from "./Pages/Register";
import Navbar from "./Components/Navbar";
import { IMEIFinder } from "./Pages/IMEI";
import { ICCIDFinder } from "./Pages/ICCID";
import { CreateIMEI } from "./Pages/createimei";
import { IMSIFinder } from "./Pages/IMSI";
import { SimFinder } from "./Pages/SIM";
import { TacFinder } from "./Pages/Tacfinder";
import { LuhnCheck } from "./Pages/LuhnCheck";
import CountryCode from "./Pages/CountryCode";
import PhoneNumberFinder from "./Pages/PhoneNumberFind";
import ProtectedRoute from "./Components/ProtectedRoute"; // Import the ProtectedRoute component
import CreateICCID from "./Pages/createiccid";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Pages/Register" element={<Register />} />

        {/* Protected Routes - Users must be logged in */}
        <Route path="/Pages/IMEI" element={<ProtectedRoute element={<IMEIFinder />} />} />
        <Route path="/Pages/ICCID" element={<ProtectedRoute element={<ICCIDFinder />} />} />
        <Route path="/Pages/createimei" element={<ProtectedRoute element={<CreateIMEI />} />} />
        <Route path="/Pages/createiccid" element={<ProtectedRoute element={<CreateICCID />} />} />
        <Route path="/Pages/IMSI" element={<ProtectedRoute element={<IMSIFinder />} />} />
        <Route path="/Pages/SIM" element={<ProtectedRoute element={<SimFinder />} />} />
        <Route path="/Pages/Tacfinder" element={<ProtectedRoute element={<TacFinder />} />} />
        <Route path="/Pages/LuhnCheck" element={<ProtectedRoute element={<LuhnCheck />} />} />
        <Route path="/Pages/CountryCode" element={<ProtectedRoute element={<CountryCode />} />} />
        <Route path="/Pages/PhoneNumberFind" element={<ProtectedRoute element={<PhoneNumberFinder />} />} />
      </Routes>
    </Router>
  );
}

export default App;
