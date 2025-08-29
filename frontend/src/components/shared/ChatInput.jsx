import { motion } from "framer-motion";
import { Sparkles, Loader2, Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ChatInput({ 
  input, 
  setInput, 
  onSend, 
  isAnalyzing 
}) {
  const [isListening, setIsListening] = useState(false);
  const recognition = useRef(null);

  useEffect(() => {
    if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
      console.warn("Speech recognition not supported");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition.current = new SpeechRecognition();
    recognition.current.continuous = false;
    recognition.current.interimResults = false;
    recognition.current.lang = 'en-US';

    recognition.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => prev + transcript);
      setIsListening(false);
    };

    recognition.current.onend = () => setIsListening(false);

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const handleVoiceInput = () => {
    if (isListening) {
      recognition.current.stop();
      setIsListening(false);
    } else {
      recognition.current.start();
      setIsListening(true);
    }
  };

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
        onClick={handleVoiceInput}
        disabled={isAnalyzing}
        className={`p-3 rounded-lg bg-gradient-to-r from-green-600 to-teal-600 text-white 
          hover:cursor-pointer font-semibold flex items-center gap-2 shadow-md
          ${isAnalyzing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <Mic className="w-4 h-4" />
      </motion.button>
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