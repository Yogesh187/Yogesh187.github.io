// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// export const IMSIFinder = () => {
//   const [imsi, setImsi] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [searched, setSearched] = useState(false);

//   const handleSearch = async () => {
//     setSearched(true);
//     setError("");
//     setResult(null);

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/tools/analyze-imsi/", {
//         imsi: imsi.trim(),
//       });

//       setResult(response.data);
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError("Something went wrong. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-4">IMSI - International Mobile Subscriber Identity</h2>
//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter 15-digit IMSI number"
//             value={imsi}
//             maxLength={15}
//             onChange={(e) => setImsi(e.target.value)}
//           />
//           <button className="btn btn-primary" onClick={handleSearch}>
//             Search
//           </button>
//         </div>

//         {searched && (
//           <>
//             {error ? (
//               <p className="text-danger text-center">{error}</p>
//             ) : result ? (
//               <table className="table table-bordered table-striped">
//                 <thead className="table-dark text-center">
//                   <tr>
//                     <th>Whole IMSI</th>
//                     <th>MCC</th>
//                     <th>MNC</th>
//                     <th>Carrier Name</th>
//                     <th>Country Name</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{result.imsi}</td>
//                     <td>{result.mcc}</td>
//                     <td>{result.mnc}</td>
//                     <td>{result.network || "N/A"}</td>
//                     <td>{result.country}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             ) : (
//               <p className="text-center">No result found.</p>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IMSIFinder;


import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import imsiData from "../Data/mcc_mnc_table_202505101308.json"; // adjust path if needed

export const IMSIFinder = () => {
  const [imsi, setImsi] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    setSearched(true);
    setError("");
    setResult(null);

    const trimmedImsi = imsi.trim();

    if (!trimmedImsi || trimmedImsi.length < 5) {
      setError("Please enter a valid IMSI (minimum 5 digits).");
      return;
    }

    const mcc = trimmedImsi.slice(0, 3);
    const mnc3 = trimmedImsi.slice(3, 6);
    const mnc2 = trimmedImsi.slice(3, 5);

    const match =
      imsiData.find(
        (entry) =>
          entry.mcc.toString() === mcc && entry.mnc.toString() === mnc3
      ) ||
      imsiData.find(
        (entry) =>
          entry.mcc.toString() === mcc && entry.mnc.toString() === mnc2
      );

    if (match) {
      setResult({
        imsi: trimmedImsi,
        mcc,
        mnc: match.mnc,
        country: match.country,
        network: match.network,
      });
    } else {
      setError("IMSI record not found in local data.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">
          IMSI - International Mobile Subscriber Identity
        </h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter 15-digit IMSI number"
            value={imsi}
            maxLength={15}
            onChange={(e) => setImsi(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {searched && (
          <>
            {error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : result ? (
              <table className="table table-bordered table-striped mt-4">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Whole IMSI</th>
                    <th>MCC</th>
                    <th>MNC</th>
                    <th>Carrier Name</th>
                    <th>Country Name</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr>
                    <td>{result.imsi}</td>
                    <td>{result.mcc}</td>
                    <td>{result.mnc}</td>
                    <td>{result.network || "N/A"}</td>
                    <td>{result.country}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <p className="text-center">No result found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IMSIFinder;
