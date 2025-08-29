"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Loader2, Crown } from "lucide-react";
import FileUploader from "@/components/shared/FileUploader";
import PricingModal from "@/components/shared/PricingModal";

export default function TranslateNotes() {
  const [step, setStep] = useState('intro');
  const [inputMethod, setInputMethod] = useState('text');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const [showPricing, setShowPricing] = useState(false);
  const isPremium = false; // Replace with actual premium status check

  const handleTranslate = async () => {
    setIsTranslating(true);
    // Simulate translation logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    setTranslatedText("Translated text goes here..."); // Replace with actual translation logic
    setIsTranslating(false);
    setStep('view');
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#010207]">
        <div className="absolute top-[20%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[8rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
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
                Translate Your Notes
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Effortlessly
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Upload documents or paste text to translate your notes into different languages. 
                Make your study materials accessible to everyone.
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

            {/* Premium Feature Notification */}
            <div 
              onClick={() => setShowPricing(true)}
              className="absolute top-6 right-6 cursor-pointer transform hover:scale-105 transition-transform"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600/20 to-yellow-600/20 rounded-full border border-amber-600/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-amber-600/30 hover:to-yellow-600/30">
                <Crown className="w-4 h-4 text-amber-400" />
                <span className="text-amber-400 text-sm font-medium">Premium Feature</span>
              </div>
            </div>

            {/* Features Grid */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                {
                  title: "Smart Translation",
                  description: "AI translates your notes accurately and quickly.",
                  icon: FileText
                },
                {
                  title: "Multiple Languages",
                  description: "Supports translation to and from various languages.",
                  icon: FileText
                },
                {
                  title: "Easy Upload",
                  description: "Upload documents or paste text for instant translation.",
                  icon: FileText
                }
              ].map((feature, index) => (
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
                Enter Your Notes
              </h2>
              <p className="text-gray-400">
                Paste your text or upload a document to translate your notes.
              </p>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8">
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
                    placeholder="Paste your notes here..."
                    className="w-full h-72 p-6 bg-black/20 rounded-xl border border-white/10 text-white resize-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
                  />
                ) : (
                  <FileUploader
                    onFileSelect={setFile}
                    acceptedTypes=".txt,.doc,.docx,.pdf"
                  />
                )}
              </div>

              {/* Translate Button */}
              <div className="flex justify-end">
                <button
                  onClick={handleTranslate}
                  disabled={isTranslating || (!content && !file) || !isPremium}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium disabled:opacity-50 flex items-center gap-2 hover:scale-105 transition-all duration-200"
                >
                  {isTranslating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Translating...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Translate Notes
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'view' && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">Translated Notes</h2>
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <p className="text-gray-400">{translatedText}</p>
            </div>
          </div>
        )}
      </div>

      <PricingModal 
        isOpen={showPricing} 
        onClose={() => setShowPricing(false)} 
      />
    </div>
  );
}
