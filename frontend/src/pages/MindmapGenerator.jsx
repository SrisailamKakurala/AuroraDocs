import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Upload, Sparkles, MessageSquare, 
  ZoomIn, ZoomOut, Download, Share2, Loader2,
  ArrowRight, Crown, Key
} from "lucide-react";
import FileUploader from "@/components/shared/FileUploader";
import PricingModal from "@/components/shared/PricingModal";

export default function MindmapGenerator() {
  const [step, setStep] = useState('intro');
  const [inputMethod, setInputMethod] = useState('text');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [mindmap, setMindmap] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [chatMessage, setChatMessage] = useState('');
  const [showPricing, setShowPricing] = useState(false);

  const features = [
    {
      title: "Smart Analysis",
      description: "AI analyzes your content and identifies key concepts and relationships",
      icon: Sparkles
    },
    {
      title: "Visual Organization",
      description: "Automatically creates hierarchical mind maps with main topics and subtopics",
      icon: FileText
    },
    {
      title: "Interactive Chat",
      description: "Chat with AI about specific topics by clicking on nodes for deeper understanding",
      icon: MessageSquare
    }
  ];

  const isPremium = false; // Replace with actual premium status check

  const handleGenerate = async () => {
    if (!isPremium) {
      setShowPricing(true);
      return;
    }
    setIsGenerating(true);
    // Add your AI generation logic here
    setIsGenerating(false);
    setStep('view');
  };

  useEffect(() => {
    const cards = document.querySelectorAll('.group');
    
    const handleMouseMove = (e) => {
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-transparent">
      Background Elements
      <div className="absolute inset-0 bg-[#010207]">
        <div className="absolute top-[20%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[8rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Update Premium Badge to be clickable */}
        <div 
          onClick={() => setShowPricing(true)}
          className="absolute top-6 right-6 cursor-pointer transform hover:scale-105 transition-transform"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-full border border-amber-600/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-amber-600/30 hover:to-yellow-600/30">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Premium Feature</span>
          </div>
        </div>

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
                Transform Your Ideas Into
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Visual Mind Maps
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Upload documents or paste text to create interactive mind maps. 
                AI-powered analysis helps you visualize connections and understand complex topics.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setStep('input')}
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

        {step === 'input' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Enter Your Content
              </h2>
              <p className="text-gray-400">
                Paste your text or upload a document to begin creating your mind map
              </p>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              {!isPremium && (
                <div className="mb-8 p-4 bg-amber-600/10 rounded-xl border border-amber-600/20">
                  <div className="flex items-start gap-3">
                    <Crown className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-white font-medium mb-1">Premium Feature</h3>
                      <p className="text-gray-400 text-sm mb-3">
                        Mind map generation is a premium feature. Upgrade to unlock unlimited mind map generation.
                      </p>
                      <button
                        onClick={() => setShowPricing(true)}
                        className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Upgrade to Premium
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Method Toggle */}
              <div className="inline-flex p-1 bg-white/5 rounded-xl mb-8 backdrop-blur-sm">
                {['text', 'file'].map((method) => (
                  <button
                    key={method}
                    onClick={() => setInputMethod(method)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      inputMethod === method
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {method === 'text' ? 'Paste Text' : 'Upload File'}
                  </button>
                ))}
              </div>

              {/* Input Area */}
              <div className="mb-8">
                {inputMethod === 'text' ? (
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Paste your content here..."
                    className="w-full h-72 p-6 bg-black/20 rounded-xl border border-white/10 text-white resize-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  />
                ) : (
                  <FileUploader
                    onFileSelect={setFile}
                    acceptedTypes=".txt,.doc,.docx,.pdf"
                  />
                )}
              </div>

              {/* Update Generate Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || (!content && !file)}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium disabled:opacity-50 flex items-center gap-2 hover:scale-105 transition-all duration-200"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Mindmap...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      {!isPremium ? 'Upgrade to Generate' : 'Generate Mindmap'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* View step component will be added later */}
      </div>

      <PricingModal 
        isOpen={showPricing} 
        onClose={() => setShowPricing(false)} 
      />
    </div>
  );
}