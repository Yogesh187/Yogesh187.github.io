// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import axios from "axios";

// const PhoneNumberFinder = () => {
//     const [mobileNumber, setMobileNumber] = useState("");
//     // const [uuid, setUuid] = useState("");
//     const [result, setResult] = useState(null);
//     const [searched, setSearched] = useState(false);
//     const [error, setError] = useState("");

//     const handleSearch = async () => {
//         setSearched(true);
//         setError("");
//         setResult(null);

//         if (!mobileNumber) {
//             setError("Please enter a phone number.");
//             return;
//         }

//         try {
//             const response = await axios.post("http://127.0.0.1:8000/api/tools/analyze-phone/", {
//                 phone_number: mobileNumber
//             });

//             setResult({
//                 phone_number: response.data.phone_number,
//                 country: response.data.country,
//                 carrier: response.data.carrier,
//                 network_code: response.data.network_code,
//                 sequence_number: response.data.sequence_number
//             });
//         } catch (err) {
//             console.error("API Error:", err);
//             setError("Something went wrong. Please try again.");
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="card shadow p-4">
//                 <h2 className="text-center mb-4">Mobile Number Analysis</h2>

//                 {/* <div className="mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         // placeholder="Enter UUID"
//                         // value={uuid}
//                         onChange={(e) => setUuid(e.target.value)}
//                     />
//                 </div> */}

//                 <div className="input-group mb-3">
//                     <input
//                         type="text"
//                         className="form-control"
//                         placeholder="Enter Full Mobile Number with Extention (eg: +44 780)"
//                         value={mobileNumber}
//                         onChange={(e) => setMobileNumber(e.target.value)}
//                     />
//                     <button className="btn btn-primary" onClick={handleSearch}>
//                         Search
//                     </button>
//                 </div>

//                 {error && <p className="text-danger text-center">{error}</p>}

//                 {searched && result && (
//                     <table className="table table-bordered table-striped">
//                         <thead className="table-dark text-center">
//                             <tr>
//                                 <th>Mobile Number</th>
//                                 <th>Country Name</th>
//                                 <th>Carrier Name</th>
//                                 <th>Network Code</th>
//                                 <th>Sequence Number</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>{result.phone_number}</td>
//                                 <td>{result.country}</td>
//                                 <td>{result.carrier}</td>
//                                 <td>{result.network_code}</td>
//                                 <td>{result.sequence_number}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 )}

//                 {searched && !result && !error && (
//                     <p className="text-danger text-center">No match found.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PhoneNumberFinder;


// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import phoneData from "..//Data/extended_country_phone_codes.json"; // adjust path if needed

// const analyzePhoneNumber = (input) => {
//     try {
//       const trimmed = input.trim();
//       const parts = trimmed.split(" ");
  
//       if (parts.length !== 2) {
//         return { error: "Invalid format. Use: +<country_code> <10-digit-number>" };
//       }
  
//       const countryCode = parts[0].replace("+", "").trim();
//       const nationalNumber = parts[1].trim();
  
//       if (!/^\d+$/.test(countryCode) || !/^\d{10}$/.test(nationalNumber)) {
//         return { error: "Invalid country code or mobile number must be 10 digits." };
//       }
  
//       const candidates = phoneData.filter(
//         (entry) =>entry.country_code?.toString() === countryCode
//       );
  
//       if (candidates.length === 0) {
//         return { error: "No matching country code found." };
//       }
  
//       let matchedEntry = null;
//       let matchedMNC = "";
  
//       for (const entry of candidates.sort((a, b) => b.mnc.length - a.mnc.length)) {
//         const mnc = entry.mnc.toString();
//         if (nationalNumber.startsWith(mnc)) {
//           matchedEntry = entry;
//           matchedMNC = mnc;
//           break;
//         }
//       }
  
//       if (matchedEntry) {
//         const sequenceNumber = nationalNumber.slice(matchedMNC.length);
//         return {
//           phone_number: `+${countryCode} ${nationalNumber}`,
//           country: matchedEntry.country,
//           carrier: matchedEntry.name,
//           network_code: matchedMNC,
//           sequence_number: sequenceNumber
//         };
//       } else {
//         return { error: "No matching network code (MNC) found." };
//       }
//     } catch (err) {
//       return { error: "Unexpected error: " + err.message };
//     }
//   };  

// const PhoneNumberFinder = () => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [result, setResult] = useState(null);
//   const [searched, setSearched] = useState(false);
//   const [error, setError] = useState("");

//   const handleSearch = () => {
//     setSearched(true);
//     setError("");
//     setResult(null);

//     if (!mobileNumber) {
//       setError("Please enter a phone number.");
//       return;
//     }

//     const result = analyzePhoneNumber(mobileNumber);

//     if (result.error) {
//       setError(result.error);
//       setResult(null);
//     } else {
//       setResult(result);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-4">Mobile Number Analysis</h2>

//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter number like +91 9485348456"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//           />
//           <button className="btn btn-primary" onClick={handleSearch}>
//             Analyze
//           </button>
//         </div>

//         {error && <p className="text-danger text-center">{error}</p>}

//         {searched && result && (
//           <table className="table table-bordered table-striped mt-4">
//             <thead className="table-dark text-center">
//               <tr>
//                 <th>Mobile Number</th>
//                 <th>Country Name</th>
//                 <th>Carrier Name</th>
//                 <th>Network Code</th>
//                 <th>Sequence Number</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>{result.phone_number}</td>
//                 <td>{result.country}</td>
//                 <td>{result.carrier}</td>
//                 <td>{result.network_code}</td>
//                 <td>{result.sequence_number}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}

//         {searched && !result && !error && (
//           <p className="text-danger text-center">No match found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PhoneNumberFinder;






// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import phoneData from "../Data/extended_country_phone_codes.json"; // Ensure path is correct


// const analyzePhoneNumber = (input) => {
//   try {
//     const trimmed = input.trim();

//     if (!trimmed.startsWith("+") || !trimmed.includes(" ")) {
//       return {
//         error: "Invalid format. Use: +<country_code> <10-digit-number>",
//       };
//     }

//     const [codePart, numberPart] = trimmed.split(" ");
//     const countryCode = codePart.replace("+", "").trim();
//     const nationalNumber = numberPart.trim();

//     if (!/^\d+$/.test(countryCode) || !/^\d+$/.test(nationalNumber)) {
//       return {
//         error: "Invalid phone number or country code.",
//       };
//     }

//     let matchedMnc = null;
//     let matchedEntry = null;

//     // Step 1: Try matching using local JSON (like backend)
//     const validEntries = phoneData.filter(
//       (entry) => String(entry.country_code) === countryCode
//     );

//     for (const entry of validEntries.sort((a, b) => b.mnc.length - a.mnc.length)) {
//       const mnc = String(entry.mnc);
//       if (nationalNumber.startsWith(mnc)) {
//         matchedMnc = mnc;
//         matchedEntry = entry;
//         break;
//       }
//     }

//     // Step 2: Return if matched using JSON
//     if (matchedEntry && matchedMnc !== null) {
//       const sequenceNumber = nationalNumber.slice(matchedMnc.length);
//       return {
//         phone_number: `+${countryCode} ${nationalNumber}`,
//         country: matchedEntry.country,
//         carrier: matchedEntry.name,
//         network_code: matchedMnc,
//         sequence_number: sequenceNumber,
//       };
//     }

//     // Step 3: Fallback logic (if JSON fails)
//     // Guess country and carrier from rough rules (limited, no phonenumbers in JS)
//     const fallbackNetworkCode = nationalNumber.slice(0, 3);
//     const fallbackSequenceNumber = nationalNumber.slice(3);

//     return {
//       phone_number: `+${countryCode} ${nationalNumber}`,
//       country: "Unknown", // No geocoder fallback like Python
//       carrier: "Unknown", // No carrier fallback like Python
//       network_code: fallbackNetworkCode,
//       sequence_number: fallbackSequenceNumber,
//       fallback: true, // Flag to indicate it's a partial match
//     };
//   } catch (err) {
//     return {
//       error: "Unexpected error: " + err.message,
//     };
//   }
// };

  

// const PhoneNumberFinder = () => {
//   const [mobileNumber, setMobileNumber] = useState("");
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [searched, setSearched] = useState(false);

//   const handleSearch = () => {
//     setError("");
//     setResult(null);
//     setSearched(true);

//     if (!mobileNumber.trim()) {
//       setError("Please enter a phone number.");
//       return;
//     }

//     const analysisResult = analyzePhoneNumber(mobileNumber);

//     if (analysisResult.error) {
//       setError(analysisResult.error);
//     } else {
//       setResult(analysisResult);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card shadow p-4">
//         <h2 className="text-center mb-4">Mobile Number Analysis</h2>

//         <div className="input-group mb-3">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter number like +91 9485348456"
//             value={mobileNumber}
//             onChange={(e) => setMobileNumber(e.target.value)}
//           />
//           <button className="btn btn-primary" onClick={handleSearch}>
//             Analyze
//           </button>
//         </div>

//         {error && <p className="text-danger text-center">{error}</p>}

//         {searched && result && !error && (
//           <table className="table table-bordered table-striped mt-4">
//             <thead className="table-dark text-center">
//               <tr>
//                 <th>Mobile Number</th>
//                 <th>Country Name</th>
//                 <th>Carrier Name</th>
//                 <th>Network Code</th>
//                 <th>Sequence Number</th>
//               </tr>
//             </thead>
//             <tbody className="text-center">
//               <tr>
//                 <td>{result.phone_number}</td>
//                 <td>{result.country}</td>
//                 <td>{result.carrier}</td>
//                 <td>{result.network_code}</td>
//                 <td>{result.sequence_number}</td>
//               </tr>
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PhoneNumberFinder;


import React, { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const PhoneNumberAnalyzer = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setResult(null);

    try {
      const trimmed = input.trim().replace("+", "");
      const parts = trimmed.split(" ");
      if (parts.length !== 2) {
        return setResult({ error: "Invalid format. Use '<country_code> <number>'" });
      }

      const [countryCode, nationalNumber] = parts;
      if (!/^\d+$/.test(countryCode) || !/^\d+$/.test(nationalNumber)) {
        return setResult({ error: "Country code and number must be digits only." });
      }

      // Load the local JSON
      const response = await fetch("/extended_country_phone_codes.json");
      const jsonData = await response.json();

      let matchedEntry = null;
      let matchedMNC = null;

      const validEntries = jsonData.filter(entry => entry.country_code === countryCode);

      for (const entry of validEntries.sort((a, b) => b.mnc.length - a.mnc.length)) {
        if (nationalNumber.startsWith(entry.mnc)) {
          matchedEntry = entry;
          matchedMNC = entry.mnc;
          break;
        }
      }

      if (matchedEntry) {
        const sequence_number = nationalNumber.slice(matchedMNC.length);
        return setResult({
          phone_number: `${countryCode} ${nationalNumber}`,
          country: matchedEntry.country,
          carrier: matchedEntry.name,
          network_code: matchedMNC,
          sequence_number,
        });
      }

      // Fallback to libphonenumber-js
      const phoneNumber = parsePhoneNumberFromString(`+${countryCode}${nationalNumber}`);
      if (!phoneNumber || !phoneNumber.isValid()) {
        return setResult({ error: "Invalid phone number." });
      }

      setResult({
        phone_number: `${countryCode} ${nationalNumber}`,
        country: phoneNumber.country || "Unknown",
        carrier: "Unknown", // carrier detection is not supported directly
        network_code: nationalNumber.slice(0, 3),
        sequence_number: nationalNumber.slice(3),
        fallback: true,
      });

    } catch (err) {
      setResult({ error: "Something went wrong: " + err.message });
    }
  };

  return (
    <div className="container mt-5">
      <h3>Phone Number Analysis</h3>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="+91 9876543210"
        className="form-control mt-2"
      />
      <button onClick={handleAnalyze} className="btn btn-primary mt-3">
        Analyze
      </button>
      {result && (
        <pre className="mt-3 bg-light p-3 rounded">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default PhoneNumberAnalyzer;
