"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Sparkles, ArrowRight, X } from "lucide-react";
import FileUploader from "@/components/shared/FileUploader";
import ChatWindow from "@/components/shared/ChatWindow";
import ChatInput from "@/components/shared/ChatInput";
import { v4 as uuidv4 } from 'uuid';

const FileUploadProgress = ({ file, progress }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 mb-3"
  >
    <div className="flex items-center gap-4">
      <FileText className={`w-6 h-6 text-blue-400`} />
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <p
            className="text-sm text-gray-300 truncate max-w-[200px]"
            title={file.name}
          >
            {file.name}
          </p>
          <span className="text-xs text-gray-400">{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  </motion.div>
);

export default function MultiDocChat() {
  const [step, setStep] = useState("intro");
  const [files, setFiles] = useState([]);
  const [uploadQueue, setUploadQueue] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const chatEndRef = useRef(null);
  const [vectorIds, setVectorIds] = useState([]);
  const sessionId = uuidv4();  // Unique session ID

  const features = [
    {
      title: "Upload Multiple Docs",
      description: "Easily upload PDFs, Word files, or text files together.",
      icon: FileText,
    },
    {
      title: "Cross-Doc Analysis",
      description:
        "Ask questions that span across multiple documents for deeper insights.",
      icon: Sparkles,
    },
    {
      title: "Instant Summaries",
      description: "AI quickly extracts key points from all uploaded files.",
      icon: ArrowRight,
    },
  ];

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;

    const uploadItem = {
      file: selectedFile,
      progress: 0,
      id: Date.now(),
    };
    setUploadQueue((prev) => [...prev, uploadItem]);

    try {
      // Simulate progress for extraction
      const formData = new FormData();
      formData.append('file', selectedFile);

      const extractResponse = await fetch('http://0.0.0.0:8000/process/process', {
        method: 'POST',
        body: formData,
      });

      if (!extractResponse.ok) {
        throw new Error('Extraction failed');
      }

      const extractData = await extractResponse.json();
      setUploadQueue((prev) =>
        prev.map((item) =>
          item.id === uploadItem.id
            ? { ...item, progress: 50 }  // 50% after extraction
            : item
        )
      );

      // Embed the text
      const embedResponse = await fetch('http://0.0.0.0:8001/embed/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: extractData.text, session_id: sessionId }),
      });

      if (!embedResponse.ok) {
        throw new Error('Embedding failed');
      }

      const embedData = await embedResponse.json();
      setVectorIds((prev) => [...prev, embedData.vector_id]);
      setUploadQueue((prev) =>
        prev.map((item) =>
          item.id === uploadItem.id
            ? { ...item, progress: 100 }  // 100% after embedding
            : item
        )
      );

      setFiles((prev) => [...prev, selectedFile]);
      setUploadQueue((prev) => prev.filter((item) => item.id !== uploadItem.id));
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessages([
        {
          type: "bot",
          content: `Error processing file: ${error.message}`,
        },
      ]);
      setUploadQueue((prev) => prev.filter((item) => item.id !== uploadItem.id));
    }
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setVectorIds((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStartChat = () => {
    setStep("chat");
    setMessages([
      {
        type: "bot",
        content: `👋 Hi! I'm ready to help you analyze ${files.length} documents. What would you like to know?`,
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || vectorIds.length === 0) return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);
    const userQuestion = input;
    setInput("");
    setIsAnalyzing(true);

    try {
      const ragResponse = await fetch('http://0.0.0.0:8004/rag-service/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userQuestion, session_ids: vectorIds }),
      });

      if (!ragResponse.ok) {
        throw new Error('RAG failed');
      }

      const ragData = await ragResponse.json();
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: ragData.response,
        },
      ]);
      setIsAnalyzing(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: `Error: ${error.message}`,
        },
      ]);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 min-h-screen w-full flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[#010207]">
        <div className="absolute top-[20%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[8rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Hero */}
              <div className="text-center space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl font-bold text-white leading-tight"
                >
                  Chat With Your
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Multiple Documents
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                  Upload multiple documents and ask cross-document questions.
                  Get combined insights instantly.
                </motion.p>

                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setStep("upload")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>

               {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group p-8 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 relative before:absolute before:inset-0 before:rounded-2xl before:transition-opacity before:duration-500 before:opacity-0 group-hover:before:opacity-100 before:pointer-events-none"
                  style={{
                    '--glow-color': `linear-gradient(
                      135deg,
                      rgba(168, 85, 247, 0.4),
                      rgba(59, 130, 246, 0.4),
                      rgba(236, 72, 153, 0.4)
                    )`,
                    '--glow-spread': '25px',
                    '--glow-blur': '25px',
                    boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div className="absolute -z-10 inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `
                        radial-gradient(
                          800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                          var(--glow-color),
                          transparent 40%
                        )
                      `,
                      backgroundImage: 'var(--glow-color)',
                      filter: 'blur(var(--glow-blur))',
                    }}
                  />

                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            </motion.div>
          )}

          {step === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-7xl flex gap-6"
            >
              {/* Left Side */}
              <div className="w-1/2 flex flex-col gap-6">
                {/* Upload Queue */}
                {uploadQueue.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">
                      Uploading...
                    </h3>
                    <div className="space-y-2">
                      {uploadQueue.map((item) => (
                        <FileUploadProgress
                          key={item.id}
                          file={item.file}
                          progress={item.progress}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* File Uploader */}
                <FileUploader onFileSelect={handleFileSelect} />
                <div className="mt-6 text-center">
                  <p className="text-gray-400 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                    Upload at least 2 documents to start analysis
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="w-1/2">
                <div className="h-full bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <h2 className="text-xl font-semibold text-white mb-4">
                    {files.length > 0
                      ? "Uploaded Documents"
                      : "No Documents Yet"}
                  </h2>

                  {files.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 gap-3 mb-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                        {files.map((file, index) => (
                          <div
                            key={index}
                            className="p-3 bg-black/20 rounded-lg border border-white/10 flex items-center gap-3"
                          >
                            <FileText className="w-6 h-6 text-blue-400" />
                            <div className="flex-1 min-w-0">
                              <p
                                className="text-sm text-gray-300 truncate"
                                title={file.name}
                              >
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {(file.size / (1024 * 1024)).toFixed(2)} MB
                              </p>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded-full"
                            >
                              <X className="w-3 h-3 text-white" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {files.length >= 2 && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleStartChat}
                          className="w-full p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium shadow-lg"
                        >
                          Start Analyzing {files.length} Documents
                        </motion.button>
                      )}
                    </>
                  ) : (
                    <div className="h-[60vh] flex items-center justify-center text-gray-500">
                      <p>Uploaded files will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {step === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-[90vh] bg-black/40 backdrop-blur-xl rounded-2xl p-6 flex flex-col"
            >
              <ChatWindow
                messages={messages}
                isAnalyzing={isAnalyzing}
                fileName={`${files.length} Documents`}
                chatEndRef={chatEndRef}
              />
              <ChatInput
                input={input}
                setInput={setInput}
                onSend={handleSendMessage}
                isAnalyzing={isAnalyzing}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}