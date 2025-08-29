import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function FileUploader({ 
  onFileSelect, 
  isUploading, 
  uploadProgress, 
  file,
  acceptedTypes = ".pdf,.doc,.docx,.txt"
}) {
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) onFileSelect(droppedFile);
  };

  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="relative w-full max-w-lg mx-auto p-10 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center gap-4 bg-black/30 backdrop-blur-md text-white cursor-pointer hover:border-purple-600 transition-all duration-200 min-h-[300px]"
    >
      {isUploading ? (
        <div className="flex flex-col items-center gap-4 w-full">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
          <p className="text-lg font-semibold text-gray-300">
            Uploading {file?.name}...
          </p>
          <ProgressBar progress={uploadProgress} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
          <Upload className="w-12 h-12 text-purple-600 animate-bounce" />
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-300">
              Drag & Drop your document here
            </p>
            <p className="text-sm text-gray-500 mt-2">or click to select</p>
          </div>
          <input
            type="file"
            accept={acceptedTypes}
            onChange={(e) => onFileSelect(e.target.files?.[0])}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      )}
    </motion.div>
  );
}