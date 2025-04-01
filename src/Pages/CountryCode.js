import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import cCode from "../Data/extended_country_phone_codes.json";


const CountryCode = () => {
    const [search, setSearch] = useState("");


    // Filter countries that start with the input
    // const filteredCountries = cCode.filter(
    //     (item) => item["country"].toLowerCase().startsWith(search.toLowerCase())
    // );
    const filteredCountries = cCode.filter(
        (item) =>
            item["country"].toLowerCase().startsWith(search.toLowerCase()) ||
            item["country_code"].toString().startsWith(search)
    );
   


    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">🌍 Country Code Finder</h2>
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter country name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>


                {search && (
                    <div className="table-responsive">
                        {filteredCountries.length > 0 ? (
                            <table className="table table-bordered table-striped">
                                <thead className="table-dark text-center">
                                    <tr>
                                        <th>Country</th>
                                        <th>Country Code</th>
                                        <th>MCC</th>
                                        <th>MNC</th>
                                        <th>ISO Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCountries.map((result,index) => (
                                        <tr key={index}>
                                            <td>{result.country}</td>
                                            <td>{result.country_code}</td>
                                            <td>{result.mcc}</td>
                                            <td>{result.mnc}</td>
                                            <td>{result.iso.toUpperCase()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-danger text-center">❌ No country found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


export default CountryCode;
