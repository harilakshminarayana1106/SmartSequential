import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [engineers, setEngineers] = useState([]);

  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API}/engineers`)
      .then(res => setEngineers(res.data));
  }, []);

  return (
    <div>
      <h2>Engineers Performance</h2>

      <div className="card">
        <table className="crm-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Skill</th>
            </tr>
          </thead>

          <tbody>
            {engineers.map(e => (
              <tr key={e.id}>
                <td>{e.name}</td>
                 <td>{e.status}</td>
                <td>{e.specialization}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
