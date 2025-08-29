import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="flex text-[#dadada] h-screen w-full font-['Lato', sans-serif] border-r border-white/10 bg-gradient-to-br from-black via-gray-950 to-black">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content with animated aurora */}
      <div className="relative flex-1 overflow-y-auto h-screen">
        {/* Aurora background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="aurora"></div>
        </div>

        {/* Actual routed content */}
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
