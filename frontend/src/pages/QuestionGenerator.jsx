import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Settings, Book, PlusCircle, Loader2, 
  Copy, FileDown, Upload, X, ChevronDown,
  Sparkles, Layout, Target
} from "lucide-react";
import FileUploader from "@/components/shared/FileUploader";

export default function QuestionGenerator() {
  const [step, setStep] = useState('intro');
  const [inputMethod, setInputMethod] = useState('file');
  const [file, setFile] = useState(null);
  const [syllabusText, setSyllabusText] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [settings, setSettings] = useState({
    questionTypes: {
      mcq: true,
      fillInBlanks: false,
      descriptive: false
    },
    difficulty: "medium",
    totalQuestions: 10,
    distribution: {
      mcq: 60,
      fillInBlanks: 20,
      descriptive: 20
    },
    topics: []
  });
  const [questions, setQuestions] = useState(null);

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;
    setInputMethod('file');
    setFile(selectedFile);
    setSyllabusText('');
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const totalSteps = 10;
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadProgress(i * (100 / totalSteps));
    }

    setIsUploading(false);
    // Here you would typically extract topics from the document
    setSettings(prev => ({
      ...prev,
      topics: ["Topic 1", "Topic 2", "Topic 3"] // Example topics
    }));
  };

  const handleTextInput = (text) => {
    setInputMethod('text');
    setSyllabusText(text);
    setFile(null);
  };

  const generateQuestions = async () => {
    setIsGenerating(true);
    try {
      // Simulate API call to generate questions
      await new Promise(resolve => setTimeout(resolve, 2000));
      setQuestions([
        {
          type: "mcq",
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          answer: "Paris"
        },
        // Add more sample questions here
      ]);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const exportQuestions = async (format) => {
    if (!questions) return;
    
    // Example implementation - replace with actual export logic
    const content = questions.map((q, i) => `
${i + 1}. ${q.question}
${q.type === 'mcq' ? q.options.map((opt, j) => `   ${String.fromCharCode(97 + j)}) ${opt}`).join('\n') : ''}
`).join('\n');

    switch (format) {
      case 'copy':
        navigator.clipboard.writeText(content);
        break;
      case 'txt':
        // Download as text file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'questions.txt';
        a.click();
        break;
      // Add more export formats
    }
  };

  const features = [
    {
      title: "Smart Question Generation",
      description: "AI analyzes your syllabus and generates relevant questions across different formats",
      icon: Sparkles
    },
    {
      title: "Flexible Formats",
      description: "Create multiple-choice, fill-in-the-blanks, or descriptive questions with customizable distribution",
      icon: Layout
    },
    {
      title: "Difficulty Control",
      description: "Adjust difficulty levels and specify the number of questions to match your needs",
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#010207]">
        <div className="absolute top-[20%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[8rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8 mt-8">
        {step === 'intro' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
                Generate Professional
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Question Papers
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Transform your syllabus into comprehensive question papers. 
                AI-powered generation helps you create diverse question sets instantly.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setStep('generate')}
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

        {step === 'generate' && (
          // Wrap existing generator UI in motion div
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Input & Settings */}
              <div className="space-y-6">
                {/* Input Method Selector */}
                <div className="flex gap-2 p-2 bg-white/5 rounded-lg">
                  <button
                    onClick={() => setInputMethod('file')}
                    className={`flex-1 p-2 rounded ${inputMethod === 'file' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:bg-white/5'}`}
                  >
                    Upload Syllabus
                  </button>
                  <button
                    onClick={() => setInputMethod('text')}
                    className={`flex-1 p-2 rounded ${inputMethod === 'text' 
                      ? 'bg-purple-600 text-white' 
                      : 'text-gray-400 hover:bg-white/5'}`}
                  >
                    Paste Syllabus
                  </button>
                </div>

                {/* Input Area */}
                {inputMethod === 'file' ? (
                  !file ? (
                    <FileUploader
                      onFileSelect={handleFileSelect}
                      isUploading={isUploading}
                      uploadProgress={uploadProgress}
                      file={file}
                    />
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
                      <FileText className="w-6 h-6 text-blue-400" />
                      <span className="text-gray-300 flex-1 truncate">{file.name}</span>
                      <button
                        onClick={() => setFile(null)}
                        className="p-1 hover:bg-white/10 rounded"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  )
                ) : (
                  <textarea
                    value={syllabusText}
                    onChange={(e) => handleTextInput(e.target.value)}
                    placeholder="Paste your syllabus content here..."
                    className="w-full h-48 p-4 rounded-lg bg-black/20 border border-white/10 text-white resize-none"
                  />
                )}

                {/* Settings Panel */}
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <h3 className="text-lg font-semibold text-white mb-4">Question Settings</h3>
                  
                  {/* Question Types */}
                  <div className="space-y-3 mb-6">
                    <label className="text-sm text-gray-400">Question Types</label>
                    <div className="space-y-2 flex justify-around mt-2">
                      {Object.entries(settings.questionTypes).map(([type, enabled]) => (
                        <label key={type} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={enabled}
                            onChange={(e) => setSettings(prev => ({
                              ...prev,
                              questionTypes: {
                                ...prev.questionTypes,
                                [type]: e.target.checked
                              }
                            }))}
                            className="rounded border-white/10 bg-black/20"
                          />
                          <span className="text-gray-300 capitalize">
                            {type === 'mcq' ? 'Multiple Choice' : 
                             type === 'fillInBlanks' ? 'Fill in the Blanks' : 
                             'Descriptive'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Difficulty Level</label>
                      <select
                        value={settings.difficulty}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          difficulty: e.target.value
                        }))}
                        className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm text-gray-400">Number of Questions</label>
                      <input
                        type="number"
                        value={settings.totalQuestions}
                        onChange={(e) => setSettings(prev => ({
                          ...prev,
                          totalQuestions: parseInt(e.target.value)
                        }))}
                        min="1"
                        max="50"
                        className="w-full p-2 rounded-lg bg-black/20 border border-white/10 text-white"
                      />
                    </div>

                    <button
                      onClick={generateQuestions}
                      disabled={isGenerating || (!file && !syllabusText)}
                      className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-medium flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Generating Questions...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-4 h-4" />
                          Generate Questions
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column - Generated Questions */}
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 min-h-[500px]">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white">Generated Questions</h2>
                  
                  {questions && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => exportQuestions('copy')}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
                        title="Copy to clipboard"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => exportQuestions('txt')}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
                        title="Download as TXT"
                      >
                        <FileDown className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Questions Display */}
                {questions ? (
                  <div className="space-y-4">
                    {questions.map((q, i) => (
                      <div key={i} className="p-4 bg-black/20 rounded-lg">
                        <p className="text-white mb-2">
                          {i + 1}. {q.question}
                        </p>
                        {q.type === "mcq" && (
                          <div className="ml-4 space-y-1">
                            {q.options.map((opt, j) => (
                              <div key={j} className="text-gray-400">
                                {String.fromCharCode(97 + j)}) {opt}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-500">
                    Generated questions will appear here
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}