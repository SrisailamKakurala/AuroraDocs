import { motion } from "framer-motion";

export default function LoadingIndicator({ text = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2 p-3 rounded-lg bg-white/5 w-fit"
    >
      <div className="flex space-x-2">
        <div 
          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" 
          style={{ animationDelay: "0ms" }}
        />
        <div 
          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" 
          style={{ animationDelay: "150ms" }}
        />
        <div 
          className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" 
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </motion.div>
  );
}