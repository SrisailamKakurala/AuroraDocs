import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import LoadingIndicator from "./LoadingIndicator";

export default function ChatWindow({ 
  messages, 
  isAnalyzing, 
  fileName,
  chatEndRef 
}) {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4 sticky top-0 bg-[#010207]">
        <FileText className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold">
          Chatting with:{" "}
          <span className="text-purple-400">{fileName}</span>
        </h2>
      </div>

      {/* Messages */}
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ x: message.type === 'user' ? 50 : -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`p-3 rounded-lg w-fit max-w-[80%] ${
            message.type === 'user' 
              ? 'ml-auto bg-purple-600/30 text-white'
              : message.type === 'error'
              ? 'bg-red-600/30 text-white'
              : 'bg-white/10 text-gray-200'
          }`}
        >
          {message.content}
        </motion.div>
      ))}
      
      {isAnalyzing && <LoadingIndicator />}
      <div ref={chatEndRef} />
    </div>
  );
}