import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export const ICCIDFinder = () => {
  const [iccid, setIccid] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleSearch = async () => {
    setSearched(true);
    setError("");
    setResult(null);

    // if (!imei || imei.length >= 8) {
    //   setError("Please enter tac code minimum 8 digits");
    //   return;
    // }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tools/analyze-iccid/", {
        iccid: iccid,
      });

      setResult(response.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 404) {
        navigate("http://127.0.0.1:8000/api/tools/analyze-iccid/");
      } else {
      setError(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    }
  }
  };
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">ICCID Lookup</h2>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter ICCID number"
            value={iccid}
            onChange={(e) => setIccid(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>

        {searched && error && (
          <div className="alert alert-danger text-center">{error}</div>
        )}

        {searched && result && (
          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark text-center">
              <tr>
                <th>iccid</th>
                <th>mii</th>
                <th>country_name</th>
                <th>country_code</th>
                <th>network_operator</th>
                <th>network_code</th>
                <th>unique_number</th>
                <th>check_digit</th>
                <th>luhn_valid</th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td>{result.iccid}</td>
                <td>{result.mii}</td>
                <td>{result.country_name}</td>
                <td>{result.country_code}</td>
                <td>{result.network_operator}</td>
                <td>{result.network_code}</td>
                <td>{result.unique_number}</td>
                <td>{result.check_digit}</td>
                <td>{result.luhn_valid}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ICCIDFinder;
