import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* FIXED SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE MAIN WRAPPER */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}