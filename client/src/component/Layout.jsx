import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import "./Layout.css";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="layout">

      <Header toggleSidebar={() => setOpen(!open)} />

      <div className="main-container">

        <Sidebar open={open} />

        <div className={`page-content ${open ? "" : "full"}`}>
          {children}
        </div>

      </div>
    </div>
  );
}
