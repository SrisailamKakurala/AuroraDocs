import {
  Home,
  FileText,
  Settings,
  LogOut,
  User,
  BookOpen,
  Layers,
  PenTool,
  HelpCircle,
  SquareStack,
  Languages,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Single Doc Chat", icon: <FileText className="h-5 w-5" />, to: "/" },
  { name: "Multi Doc Chat", icon: <Layers className="h-5 w-5" />, to: "/multi-doc" },
  { name: "Notes Generator", icon: <PenTool className="h-5 w-5" />, to: "/notes" },
  { name: "Mindmap Generator", icon: <SquareStack className="h-5 w-5" />, to: "/mindmap" },
  { name: "Question Paper Generator", icon: <HelpCircle className="h-5 w-5" />, to: "/questions" },
  { name: "Flashcard Generator", icon: <BookOpen className="h-5 w-5" />, to: "/flashcards" },
  { name: "Translate Notes", icon: <Languages className="h-5 w-5" />, to: "/translate" },
  { name: "Lesson Plan Generator", icon: <Calendar className="h-5 w-5" />, to: "/lesson-plan" },
];

export function Sidebar() {
  return (
    <div className="relative w-[20%] h-screen flex flex-col text-[#dadada] overflow-hidden border-r border-white/10 bg-gradient-to-br from-black via-gray-950 to-black">
      {/* AuroraDocs Logo */}
      <div className="relative z-10 flex items-center justify-center gap-1 px-6 py-5 font-extrabold text-3xl tracking-wide border-b border-white/10">
        {/* Gradient Sparkles Icon */}
        <Sparkles className="w-8 h-8" stroke="url(#aurora-gradient)" />
        <svg width="0" height="0">
          <defs>
            <linearGradient id="aurora-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#3b82f6" offset="0%" /> {/* blue-500 */}
              <stop stopColor="#9333ea" offset="50%" /> {/* purple-600 */}
              <stop stopColor="#10b981" offset="100%" /> {/* emerald-500 */}
            </linearGradient>
          </defs>
        </svg>

        {/* Gradient Logo Text */}
        <h2 className="bg-gradient-to-r from-blue-700 via-purple-700 to-emerald-700 bg-clip-text text-transparent animate-gradient">
          AuroraDocs
        </h2>
      </div>

      {/* Navigation */}
      <nav className="relative flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2 rounded-lg font-medium relative transition-all duration-300 ${
                isActive
                  ? "text-[#dadada] bg-white/10 shadow-md "
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Glow effect on active */}
                {isActive && (
                  <span className="absolute inset-0 rounded-lg -z-10 bg-gradient-to-r from-purple-500/40 via-indigo-500/40 to-blue-500/40 blur-lg animate-pulse" />
                )}
                {item.icon}
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <NavLink
          to="/profile"
          className="flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-gray-400 hover:text-white bg-white/5 transition"
        >
          <User className="h-5 w-5" />
          Profile
        </NavLink>

        <Button
          variant="ghost"
          className="w-full flex items-center gap-2 text-[#dadada] hover:text-white border-1 border-blue-950 hover:bg-white/20"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
