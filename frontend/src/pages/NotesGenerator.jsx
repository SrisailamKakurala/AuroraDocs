import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, FileText, PenTool, Key, Crown, 
  ChevronDown, Download, MessageSquare, Loader2,
  FileDown, Book, AlignLeft
} from "lucide-react";
import FileUploader from "@/components/shared/FileUploader";
import PricingModal from "@/components/shared/PricingModal";

export default function NotesGenerator() {
  const [step, setStep] = useState('intro'); // 'intro', 'input'
  const [inputMethod, setInputMethod] = useState('file'); // 'file', 'chapter', or 'text'
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedNotes, setGeneratedNotes] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [settings, setSettings] = useState({
    mode: 'detailed', // detailed, executive, cheatsheet
    includeHeadings: true,
    includeBulletPoints: true,
    includeExamples: true,
  });
  const [showPricing, setShowPricing] = useState(false);

  const isPremium = false; // Replace with actual premium status check

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    // ... file handling logic
  };

  const handleGenerate = async () => {
    if (!isPremium && !apiKey) {
      alert("Please provide your Gemini API key or upgrade to premium");
      return;
    }
    setIsGenerating(true);
    // ... generation logic
    setIsGenerating(false);
  };

  // Update the premium link click handler
  const handlePremiumClick = (e) => {
    e.preventDefault();
    setShowPricing(true);
  };

  const features = [
    {
      title: "Smart Generation",
      description: "AI analyzes your content and generates comprehensive, well-structured notes",
      icon: PenTool
    },
    {
      title: "Multiple Formats",
      description: "Generate detailed notes, executive summaries, or quick cheat sheets",
      icon: FileText
    },
    {
      title: "Interactive Review",
      description: "Chat with AI about your notes to deepen understanding and clarify concepts",
      icon: MessageSquare
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#010207]">
        <div className="absolute top-[20%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[8rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem]" />
      </div>

      {/* Update Premium Badge positioning */}
      <div 
        onClick={() => setShowPricing(true)}
        className="fixed top-6 right-6 z-50 cursor-pointer transform hover:scale-105 transition-transform"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-full border border-amber-600/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-amber-600/30 hover:to-yellow-600/30">
          <Crown className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 text-sm font-medium">Premium Feature</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 mt-16">
        {step === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-16"
          >
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-purple-400 backdrop-blur-sm">
                  Powered by AI
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl font-bold text-white leading-tight"
              >
                Transform Your Content Into
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Smart Study Notes
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Upload documents or paste text to generate well-structured notes. 
                AI-powered analysis helps you understand and retain information better.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setStep('input')}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
              >
                Get Started
                <ChevronDown className="w-5 h-5" />
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
                  className="group p-8 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 transition-all duration-300 relative"
                >
                  {/* Gradient Border Glow */}
                  <div 
                    className="absolute -z-10 inset-0 rounded-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(135deg,
                        rgba(168, 85, 247, 0.4),
                        rgba(59, 130, 246, 0.4),
                        rgba(236, 72, 153, 0.4)
                      )`,
                      filter: 'blur(55px)',
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

        {step === 'input' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {/* Input Method Selector */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-1">
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'file', label: 'Syllabus', icon: FileText },
                  { id: 'chapter', label: 'Chapter', icon: Book },
                  { id: 'text', label: 'Topic', icon: AlignLeft },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setInputMethod(method.id)}
                    className={`flex items-center justify-center gap-2 p-3 rounded ${
                      inputMethod === method.id
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <method.icon className="w-4 h-4" />
                    {method.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              {inputMethod === 'text' ? (
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your topic or content here..."
                  className="w-full h-48 p-4 rounded-lg bg-black/20 border border-white/10 text-white resize-none"
                />
              ) : (
                <FileUploader
                  onFileSelect={handleFileSelect}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                  file={file}
                />
              )}
            </div>

            {/* API Key Input for Non-Premium Users */}
            {!isPremium && (
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                <div className="flex items-center gap-2 mb-4 text-yellow-500">
                  <Key className="w-4 h-4" />
                  <h3 className="font-medium">Gemini API Key Required</h3>
                </div>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Gemini API key"
                  className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white"
                />
                <p className="mt-2 text-sm text-gray-400">
                  Or <a 
                    href="#" 
                    onClick={handlePremiumClick}
                    className="text-purple-400 hover:underline"
                  >
                    upgrade to premium
                  </a> for unlimited access
                </p>
              </div>
            )}

            {/* Generation Settings */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h3 className="font-medium text-white mb-4">Note Settings</h3>
              
              {/* Summarization Mode */}
              <div className="space-y-4 mb-6">
                <label className="text-sm text-gray-400">Summarization Mode</label>
                <select
                  value={settings.mode}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    mode: e.target.value
                  }))}
                  className="w-full p-3 rounded-lg bg-black/20 border border-white/10 text-white"
                >
                  <option value="detailed">Detailed</option>
                  <option value="executive">Executive Summary</option>
                  <option value="cheatsheet">Cheat Sheet</option>
                </select>
              </div>

              {/* Toggle Options */}
              {['includeHeadings', 'includeBulletPoints', 'includeExamples'].map((option) => (
                <label key={option} className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={settings[option]}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      [option]: e.target.checked
                    }))}
                    className="rounded border-white/10 bg-black/20"
                  />
                  <span className="text-gray-300">
                    {option.replace(/([A-Z])/g, ' $1')
                      .replace(/^./, str => str.toUpperCase())
                      .replace('Include ', '')}
                  </span>
                </label>
              ))}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || (!isPremium && !apiKey)}
                className="w-full mt-6 p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating Notes...
                  </>
                ) : (
                  <>
                    <PenTool className="w-4 h-4" />
                    Generate Notes
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <PricingModal 
        isOpen={showPricing} 
        onClose={() => setShowPricing(false)} 
      />
    </div>
  );
}