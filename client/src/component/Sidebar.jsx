import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ open }) {
  return (
    <aside className={`sidebar ${open ? "" : "collapsed"}`}>

      <h2>CRM</h2>

      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/calls">Calls</Link>
        <Link to="/engineers">Engineers</Link>
        <Link to="/reports">Reports</Link>
      </nav>

    </aside>
  );
}
