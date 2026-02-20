import Layout from "./component/Layout";
import CallsPage from "./component/Calls/CallsPage";
import EngineerModule from "./component/EngineerModule";
import Dashboard from "./component/Dashboard";
import AddCall from "./component/Calls/AddCall";

import { Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        {/* CALL MODULE */}
        <Route path="/calls" element={<CallsPage />} />
        <Route path="/add-call" element={<AddCall />} />

        {/* ENGINEER MODULE */}
        <Route path="/engineers" element={<EngineerModule />} />
      </Routes>
    </Layout>
  );
}
