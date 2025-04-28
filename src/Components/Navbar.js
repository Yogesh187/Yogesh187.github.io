// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("IsLoggedIn") == "true");
//   const [user, setUser] = useState(localStorage.getItem("User"));


//   useEffect(() => {
//     setIsLoggedIn(localStorage.getItem("IsLoggedIn") == "true");
//   }, []);


//   const handleLogout = () => {
//     localStorage.removeItem("IsLoggedIn");
//     localStorage.removeItem("User");
//     alert("Logged out successfully!");
//     setIsLoggedIn(false);
//     window.location.href = "/";
//   };


//   return (
//     <nav className="navbar navbar-expand-sm navbar-dark bg-dark border-bottom">
//       <div className="container-fluid">
//         <Link className="navbar-brand fw-bold" to="/">
//           {/* <img
//             src="/logo.png"
//             alt="Logo"
//             style={{ height: "30px", marginRight: "8px" }}
//           /> */}
//           Mobile Phone Analysis
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
//           <ul className="navbar-nav flex-grow-1">
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/">
//                 <i className="fa fa-home me-2"></i>Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/Tacfinder">
//                 <i className="fa fa-search me-2"></i>Tac Finder
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/LuhnCheck">
//                 <i className="fa fa-check me-2"></i>Luhn Check
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/CountryCode">
//                 <i className="fa fa-globe me-2"></i>Country Code
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/PhoneNumberFind">
//                 <i className="fa fa-phone me-2"></i>Phone Number
//               </Link>
//             </li>
//           </ul>
//           <ul className="navbar-nav">
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <button className="btn btn-dark">
//                     <i className="fa fa-user me-2"></i> {user}
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-outline-light" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <Link className="btn btn-outline-light" to="/Login">
//                   Login
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }


// export default Navbar;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("IsLoggedIn") === "true");
//   const [user, setUser] = useState(localStorage.getItem("User"));

//   useEffect(() => {
//     setIsLoggedIn(localStorage.getItem("IsLoggedIn") === "true");
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("IsLoggedIn");
//     localStorage.removeItem("User");
//     alert("Logged out successfully!");
//     setIsLoggedIn(false);
//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
//       <div className="container-fluid">
//         <Link className="navbar-brand fw-bold" to="/">
//           Mobile Phone Analysis
//         </Link>
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
//           <span className="navbar-toggler-icon"></span>
//         </button>
//         <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
//           <ul className="navbar-nav flex-grow-1">
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/">
//                 <i className="fa fa-home me-2"></i>Home
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/Tacfinder">
//                 <i className="fa fa-search me-2"></i>Tac Finder
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/LuhnCheck">
//                 <i className="fa fa-check me-2"></i>Luhn Check
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/CountryCode">
//                 <i className="fa fa-globe me-2"></i>Country Code
//               </Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link text-white" to="/Pages/PhoneNumberFind">
//                 <i className="fa fa-globe me-2"></i>phone number
//               </Link>
//             </li>

//             {/* 🔽 Phone Number Dropdown Starts Here */}
//             <li className="nav-item">
//               <Link className="nav-link text-white" to="#" id="phoneNumberDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 <i className="fa fa-phone me-2"></i>Phone Number
//               </Link>
//               <ul className="dropdown-menu" aria-labelledby="phoneNumberDropdown">
//                 <li>
//                   <Link className="dropdown-item" to="/Pages/PhoneNumberFind">Find Phone Number</Link>
//                 </li>
//                 <li>
//                   <Link className="dropdown-item" to="/Pages/CarrierLookup">Carrier Lookup</Link>
//                 </li>
//                 <li>
//                   <Link className="dropdown-item" to="/Pages/PhoneValidation">Phone Validation</Link>
//                 </li>
//                 <li>
//                   <Link className="dropdown-item" to="/Pages/SpamCheck">Spam Check</Link>
//                 </li>
//               </ul>
//             </li>
//             {/* 🔼 Phone Number Dropdown Ends Here */}

//           </ul>
//           <ul className="navbar-nav">
//             {isLoggedIn ? (
//               <>
//                 <li className="nav-item">
//                   <button className="btn btn-dark">
//                     <i className="fa fa-user me-2"></i> {user}
//                   </button>
//                 </li>
//                 <li className="nav-item">
//                   <button className="btn btn-outline-light" onClick={handleLogout}>
//                     Logout
//                   </button>
//                 </li>
//               </>
//             ) : (
//               <li className="nav-item">
//                 <Link className="btn btn-outline-light" to="/Login">
//                   Login
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;



import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("IsLoggedIn") === "true");
  const [user, setUser] = useState(localStorage.getItem("User"));

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("IsLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("IsLoggedIn");
    localStorage.removeItem("User");
    alert("Logged out successfully!");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
        Phone Numbering Analyzer
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
          <ul className="navbar-nav flex-grow-1">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                <i className="fa fa-home me-2"></i>Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Pages/Tacfinder">
                <i className="fa fa-search me-2"></i>Tac Finder
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Pages/LuhnCheck">
                <i className="fa fa-check me-2"></i>Luhn Check
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/Pages/CountryCode">
                <i className="fa fa-globe me-2"></i>Country Code
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link text-white dropdown-toggle"
                to="#"
                id="phoneNumberDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa fa-phone me-2"></i>Number Analysis
              </Link>
              <ul className="dropdown-menu" aria-labelledby="phoneNumberDropdown">
                <li>
                  <Link className="dropdown-item" to="/Pages/PhoneNumberFind">
                    Phone Number Lookup
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Pages/IMSI">
                    IMSI
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Pages/IMEI">
                    IMEI
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/Pages/ICCID">
                    ICCID
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-dark">
                    <i className="fa fa-user me-2"></i> {user}
                  </button>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-light" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/Login">
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;