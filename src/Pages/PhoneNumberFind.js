import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import mobileData from "../Data/mobile_number_info.json"; // Ensure this file has the correct data


const PhoneNumberFinder = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [result, setResult] = useState(null);
    const [searched, setSearched] = useState(false); // Track search button click


    const handleSearch = () => {
        setSearched(true); // Mark that search has been performed
        const foundEntry = mobileData.find((item) =>
            mobileNumber.startsWith(item["Mobile Prefix"])
        );
        setResult(foundEntry || null);
    };


    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Mobile Number Lookup</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter mobile number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>


                {searched && (
                    result ? (
                        <table className="table table-bordered table-striped">
                            <thead className="table-dark text-center">
                                <tr>
                                    <th>Country</th>
                                    <th>Country Code</th>
                                    <th>Network Operator</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{result["Country Name"]}</td>
                                    <td>{result["Country Code"]}</td>
                                    <td>{result["Network Operator"]}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-danger text-center">No match found.</p>
                    )
                )}
            </div>
        </div>
    );
};


export default PhoneNumberFinder;