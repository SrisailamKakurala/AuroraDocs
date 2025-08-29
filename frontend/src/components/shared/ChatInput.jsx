import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

export default function ChatInput({ 
  input, 
  setInput, 
  onSend, 
  isAnalyzing 
}) {
  return (
    <div className="mt-4 flex items-center gap-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSend()}
        placeholder="Ask a question..."
        className="flex-1 p-3 rounded-lg bg-black/50 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onSend}
        disabled={isAnalyzing}
        className={`p-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white 
          hover:cursor-pointer font-semibold flex items-center gap-2 shadow-md
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isAnalyzing ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4" />
        )}
        Send
      </motion.button>
    </div>
  );
}