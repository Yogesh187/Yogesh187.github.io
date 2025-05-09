import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const PhoneNumberFinder = () => {
    const [mobileNumber, setMobileNumber] = useState("");
    // const [uuid, setUuid] = useState("");
    const [result, setResult] = useState(null);
    const [searched, setSearched] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setSearched(true);
        setError("");
        setResult(null);
    
        if (!mobileNumber) {
            setError("Please enter a phone number.");
            return;
        }
    
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/tools/analyze-phone/", {
                phone_number: mobileNumber
            });
    
            setResult({
                phone_number: response.data.phone_number,
                country: response.data.country,
                carrier: response.data.carrier,
                network_code: response.data.network_code,
                sequence_number: response.data.sequence_number
            });
        } catch (err) {
            console.error("API Error:", err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">MSISDN - Mobile Station International Subscriber Directory Number</h2>

                {/* <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        // placeholder="Enter UUID"
                        // value={uuid}
                        onChange={(e) => setUuid(e.target.value)}
                    />
                </div> */}

                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Full Mobile Number with Extention (eg: +44 780)"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                    />
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>

                {error && <p className="text-danger text-center">{error}</p>}

                {searched && result && (
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Mobile Number</th>
                                <th>Country Name</th>
                                <th>Carrier Name</th>
                                <th>Network Code</th>
                                <th>Sequence Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{result.phone_number}</td>
                                <td>{result.country}</td>
                                <td>{result.carrier}</td>
                                <td>{result.network_code}</td>
                                <td>{result.sequence_number}</td>
                            </tr>
                        </tbody>
                    </table>
                )}

                {searched && !result && !error && (
                    <p className="text-danger text-center">No match found.</p>
                )}
            </div>
        </div>
    );
};

export default PhoneNumberFinder;
