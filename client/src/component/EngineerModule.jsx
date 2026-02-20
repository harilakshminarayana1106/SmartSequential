import { useState } from "react";
import AutoAssign from "./AutoAssign";

export default function EngineerModule() {
  const [tab, setTab] = useState("auto");

  return (
    <div className="content">

      {/* Tabs */}
      <div className="tabs">
        <button onClick={() => setTab("attendance")}>
          Engineers Attendance
        </button>

        <button onClick={() => setTab("performance")}>
          Performance Reports
        </button>

        <button onClick={() => setTab("nearby")}>
          Nearby Customers
        </button>

        <button onClick={() => setTab("live")}>
          Live Location
        </button>

        <button onClick={() => setTab("auto")}>
          Auto Assign Engineer
        </button>
      </div>

      {/* Tab Content */}
      <div className="card">

        {tab === "auto" && <AutoAssign />}
        {tab === "attendance" && <h3>Attendance Module</h3>}
        {tab === "performance" && <h3>Performance Reports</h3>}
        {tab === "nearby" && <h3>Nearby Customers Map</h3>}
        {tab === "live" && <h3>Live Engineer Tracking</h3>}

      </div>
    </div>
  );
}
