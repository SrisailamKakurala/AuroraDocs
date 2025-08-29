"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FileText, Sparkles, MessageCircle, ArrowRight } from "lucide-react";
import FileUploader from "@/components/shared/FileUploader";
import ChatWindow from "@/components/shared/ChatWindow";
import ChatInput from "@/components/shared/ChatInput";
import axios from "axios";

export default function SingleDocChat() {
  const [step, setStep] = useState("intro");
  const [file, setFile] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [vectorId, setVectorId] = useState("");
  const chatEndRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const features = [
    {
      title: "Ask Anything",
      description: "Upload a document and chat naturally with it — like talking to an expert.",
      icon: MessageCircle,
    },
    {
      title: "Quick Insights",
      description: "AI extracts summaries, answers questions, and highlights key points instantly.",
      icon: FileText,
    },
    {
      title: "Smart Analysis",
      description: "Understand complex documents by asking simple questions in plain English.",
      icon: Sparkles,
    },
  ];

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      // Step 1: Process the document to get text
      const processResponse = await axios.post("http://localhost:8000/docprocessor/process", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percent);
        },
      });

      const extractedText = processResponse.data.text;
      setSessionId(`session_${Date.now()}`);

      // Step 2: Embed the text
      const embedResponse = await axios.post("http://localhost:8001/embedder/embed", {
        text: extractedText,
        session_id: `session_${Date.now()}`,
      });

      setVectorId(embedResponse.data.vector_id);

      setIsUploading(false);
      setIsUploaded(true);
      setStep("chat");

      // Add initial message
      setMessages([
        {
          type: "bot",
          content: `👋 Hi! I've processed ${selectedFile.name}. What would you like to know about it?`,
        },
      ]);
    } catch (error) {
      console.error("Error uploading/processing file:", error);
      setMessages([
        ...messages,
        { type: "bot", content: "Error processing the document. Please try again." },
      ]);
      setIsUploading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { type: "user", content: input }]);
    const userQuestion = input;
    setInput("");
    setIsAnalyzing(true);

    try {
      // Call RAG service
      const ragResponse = await axios.post("http://localhost:8002/rag-service/rag", {
        query: userQuestion,
        session_ids: [vectorId],
      });

      setMessages((prev) => [
        ...prev,
        {
          type: "bot",
          content: ragResponse.data.response,
        },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "Error generating response. Please try again." },
      ]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="p-6 h-screen w-full flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#010207]">
        <div className="absolute top-[20%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[8rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <AnimatePresence mode="wait">
          {step === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-16"
            >
              {/* Hero Section */}
              <div className="text-center space-y-6">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl font-bold text-white leading-tight"
                >
                  Chat With Your
                  <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                    Documents
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                  Upload a document and start asking questions. Get instant
                  insights, summaries, and answers.
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
            <FileUploader
              key="upload"
              onFileSelect={handleFileSelect}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              file={file}
            />
          )}

          {step === "chat" && (
            <motion.div
              key="chat"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full h-[90vh] bg-black/40 backdrop-blur-xl rounded-2xl p-6 flex flex-col text-white shadow-lg"
            >
              <ChatWindow
                messages={messages}
                isAnalyzing={isAnalyzing}
                fileName={file?.name}
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