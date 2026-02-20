import { useState } from "react";
import axios from "axios";

export default function AutoAssign() {
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [skill, setSkill] = useState("");
  const [result, setResult] = useState(null);
  const [message, setMessage] = useState("");

  const API = import.meta.env.VITE_API_URL;

  const assignEngineer = async () => {
    try {
      setMessage("");
      setResult(null);

      const res = await axios.post(`${API}/auto-assign`, {
        lat,
        lng,
        specialization: skill
      });

      if (res.data.message) {
        setMessage(res.data.message);
      } else {
        setResult(res.data);
      }

    } catch (err) {
      console.error(err);
      setMessage("Server error while assigning engineer");
    }
  };

  return (
    <div className="card">
      <h2>Auto Assign Engineer</h2>

      <div className="form-row">

        <input
          placeholder="Latitude"
          value={lat}
          onChange={e => setLat(e.target.value)}
        />

        <input
          placeholder="Longitude"
          value={lng}
          onChange={e => setLng(e.target.value)}
        />

        <input
          placeholder="Specialization (UPS/Inverter/Battery)"
          value={skill}
          onChange={e => setSkill(e.target.value)}
        />

        <button onClick={assignEngineer}>
          Assign Engineer
        </button>
      </div>

      {result && (
        <p style={{ color: "green", marginTop: "10px" }}>
          Assigned Engineer: <b>{result.name}</b>
        </p>
      )}

      {message && (
        <p style={{ color: "red", marginTop: "10px" }}>
          {message}
        </p>
      )}
    </div>
  );
}