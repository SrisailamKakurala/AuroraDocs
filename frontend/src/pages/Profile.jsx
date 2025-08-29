import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Calendar, FileText, Book, 
  Languages, LayoutGrid, HelpCircle, PenTool,
  Download, Copy, Share2
} from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("notes");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const tabs = [
    { id: "notes", label: "Notes", icon: PenTool },
    { id: "questions", label: "Questions", icon: HelpCircle },
    { id: "translations", label: "Translations", icon: Languages },
    { id: "flashcards", label: "Flashcards", icon: LayoutGrid }, // Changed from CardStack to LayoutGrid
  ];

  // Example data - replace with actual data from your backend
  const generatedContent = {
    notes: [
      { id: 1, title: "Machine Learning Basics", date: "2025-08-27", pages: 5 },
      { id: 2, title: "Data Structures Notes", date: "2025-08-26", pages: 8 },
    ],
    questions: [
      { id: 1, title: "ML Quiz Paper", date: "2025-08-27", questions: 20 },
      { id: 2, title: "DSA Test Paper", date: "2025-08-26", questions: 15 },
    ],
    translations: [
      { id: 1, title: "Physics Notes", date: "2025-08-27", from: "English", to: "Hindi" },
      { id: 2, title: "Chemistry Notes", date: "2025-08-26", from: "English", to: "Spanish" },
    ],
    flashcards: [
      { id: 1, title: "ML Concepts", date: "2025-08-27", cards: 30 },
      { id: 2, title: "DSA Concepts", date: "2025-08-26", cards: 25 },
    ],
  };

  const stats = [
    { label: "Notes Generated", value: 24, icon: PenTool },
    { label: "Questions Created", value: 15, icon: HelpCircle },
    { label: "Translations", value: 8, icon: Languages },
    { label: "Flashcard Sets", value: 12, icon: LayoutGrid },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Profile Header with Gradient Background */}
      <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 animate-gradient" />
        
        <div className="relative z-10">
          <div className="flex items-start gap-8">
            {/* Enhanced Profile Picture */}
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-3xl font-bold overflow-hidden">
                  {user.name?.[0] || "U"}
                </div>
              </div>
            </div>

            {/* Enhanced Profile Info */}
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-white">{user.name || "User Name"}</h1>
                <span className="px-3 py-1 rounded-full bg-purple-600/20 border border-purple-600/50 text-purple-400 text-sm">
                  Pro User
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>{user.email || "email@example.com"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>Joined August 2025</span>
                </div>
              </div>

              {/* Activity Stats */}
              <div className="grid grid-cols-4 gap-4 mt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white/5 rounded-lg p-3 text-center">
                    <stat.icon className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-white/10">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-colors">
              <Download className="w-4 h-4" />
              Export All Data
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-gray-300 hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4" />
              Share Profile
            </button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="mt-8">
        {/* Tab Headers */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center hover:cursor-pointer gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {generatedContent[activeTab]?.map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-medium">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.date}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1 hover:bg-white/10 rounded" title="Download">
                      <Download className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded" title="Copy">
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                    <button className="p-1 hover:bg-white/10 rounded" title="Share">
                      <Share2 className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                {/* Content-specific details */}
                <div className="text-sm text-gray-400">
                  {activeTab === "notes" && `${item.pages} pages`}
                  {activeTab === "questions" && `${item.questions} questions`}
                  {activeTab === "translations" && `${item.from} → ${item.to}`}
                  {activeTab === "flashcards" && `${item.cards} cards`}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}