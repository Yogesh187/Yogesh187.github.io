// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// export const CreateICCID = () => {
//   const [iccid, setIccid] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleCreate = async () => {
//     setMessage("");
//     setError("");

//     if (!iccid) {
//       setError("ICCID is required.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/tools/create-iccid/", {
//         iccid: iccid.trim(),  // Send only ICCID
//       });

//       setMessage(response.data.message || "ICCID processed successfully!");
//       setIccid("");
//     } catch (err) {
//       console.error(err);
//       setError(
//         err.response?.data?.error || "Something went wrong. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-4">Create ICCID Record</h2>

//         <div className="mb-3">
//           <label className="form-label">ICCID (Integrated Circuit Card ID)</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter ICCID"
//             value={iccid}
//             onChange={(e) => setIccid(e.target.value)}
//           />
//         </div>

//         <div className="text-center">
//           <button className="btn btn-primary" onClick={handleCreate}>
//             Submit ICCID
//           </button>
//         </div>

//         {error && <div className="alert alert-danger text-center mt-3">{error}</div>}
//         {message && <div className="alert alert-success text-center mt-3">{message}</div>}
//       </div>
//     </div>
//   );
// };

// export default CreateICCID;
