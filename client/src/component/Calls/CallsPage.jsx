import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CallsPage.css";

export default function CallsPage() {
  const [tab, setTab] = useState("open");
  const [calls, setCalls] = useState([]);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;
  /* ===== LOAD CALLS ===== */
const loadCalls = async () => {
    const res = await axios.get(`${API}/calls/${tab}`);
    setCalls(res.data);
  };

  useEffect(() => {
    loadCalls();
  }, [tab]);

  /* ===== COMPLETE CALL ===== */
  const completeCall = async (id) => {
    await axios.post(`${API}/complete-call/${id}`);
    loadCalls();
  };

  /* ===== CANCEL CALL ===== */
  const cancelCall = async (id) => {
    await axios.post(`${API}/cancel-call/${id}`);
    loadCalls();
  };

  return (
    <div className="content">

      <h2>Call Management</h2>

      {/* ===== ADD CALL BUTTON ===== */}
      <button
        className="add-call-btn"
        onClick={() => navigate("/add-call")}
      >
        + Add Call
      </button>

      {/* ===== TABS ===== */}
      <div className="tabs">
        <button onClick={() => setTab("open")}>Open</button>
        <button onClick={() => setTab("pending")}>Pending</button>
        <button onClick={() => setTab("completed")}>Completed</button>
        <button onClick={() => setTab("cancelled")}>Cancelled</button>
      </div>

      {/* ===== CALL TABLE ===== */}
      <div className="card">
        <table className="crm-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Problem</th>
              <th>Engineer</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {calls.length === 0 ? (
              <tr>
                <td colSpan="8" align="center">
                  No Calls Found
                </td>
              </tr>
            ) : (
              calls.map(call => (
                <tr key={call.id}>
                  <td>{call.call_id}</td>

                  <td>
                    {new Date(
                      call.call_date
                    ).toLocaleString()}
                  </td>

                  <td>{call.customer_name}</td>

                  <td>
                    {call.product_name} (
                    {call.product_type})
                  </td>

                  <td>{call.problem}</td>

                  <td>
                    {call.engineer_name || "Not Assigned"}
                  </td>

                  <td>{call.status}</td>

                  <td>
                    {call.status === "open" && (
                      <>
                        <button
                          onClick={() => completeCall(call.id)}
                        >
                          Complete
                        </button>

                        <button
                          onClick={() => cancelCall(call.id)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}
