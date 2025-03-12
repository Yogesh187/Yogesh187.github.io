import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './Pages/Login';
import HomePage from './Pages/Home';
import Register from './Pages/Register';
import Navbar from './Components/Navbar';
import { IMEI, IMEIFinder } from './Pages/IMEI';
import { IMSIFinder } from './Pages/IMSI';
import { SimFinder } from './Pages/SIM';



function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Pages/Register" element={<Register />} />
          <Route path="/Pages/IMSI" element={<IMSIFinder/>}/>
          <Route path="/Pages/IMEI" element = {<IMEIFinder/>}/>
          <Route path="/Pages/SIM" element = {<SimFinder/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
