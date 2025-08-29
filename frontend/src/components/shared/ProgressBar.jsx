import { motion } from "framer-motion";

export default function ProgressBar({ progress, height = "h-2", className = "" }) {
  return (
    <div className="w-full flex flex-col gap-1">
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${height} ${className}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <span className="text-sm text-gray-500 text-center">{progress}%</span>
    </div>
  );
}