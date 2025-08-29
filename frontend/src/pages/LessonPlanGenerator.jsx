"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ArrowRight, Loader2 } from "lucide-react";

export default function LessonPlanGenerator() {
  const [step, setStep] = useState('intro');
  const [topic, setTopic] = useState('');
  const [lessonPlan, setLessonPlan] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    // Simulate lesson plan generation logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLessonPlan(`
      Objective: Students will understand the process of photosynthesis.
      Materials: Whiteboard, diagram of chloroplast.
      Introduction: Show a plant and ask, “How do plants eat?”
      Main Content: Explain sunlight, CO₂, water → glucose + oxygen.
      Activity: Label parts of the process on a diagram.
      Assessment: Quick quiz (e.g., “What gas is released?”).
      Homework: Write a paragraph on why photosynthesis is important.
    `); // Replace with actual generation logic
    setIsGenerating(false);
    setStep('view');
  };

  return (
    <div className="p-6 min-h-screen relative overflow-hidden bg-transparent">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[#010207]">
        <div className="absolute top-[20%] left-[15%] w-[35rem] h-[35rem] bg-purple-600/20 rounded-full blur-[8rem]" />
        <div className="absolute bottom-[20%] right-[15%] w-[35rem] h-[35rem] bg-blue-600/20 rounded-full blur-[8rem]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
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
                Lesson Plan Generator
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Simplify Your Teaching
                </span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-400 max-w-2xl mx-auto"
              >
                Automatically create structured lesson plans from your topics or syllabus input. 
                Save time and enhance your teaching effectiveness.
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
              {[
                {
                  title: "Structured Plans",
                  description: "Generate organized lesson plans with clear objectives and activities.",
                  icon: FileText
                },
                {
                  title: "Customizable",
                  description: "Input your topic, subject, and duration for tailored plans.",
                  icon: FileText
                },
                {
                  title: "Time-Saving",
                  description: "Quickly create lesson plans to focus on teaching.",
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
                Enter Your Lesson Topic
              </h2>
              <p className="text-gray-400">
                Provide a topic, subject, or grade level to generate your lesson plan.
              </p>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-8">
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Introduction to Photosynthesis for Grade 8 – 45 minutes"
                className="w-full h-32 p-6 bg-black/20 rounded-xl border border-white/10 text-white resize-none focus:border-purple-500 transition-colors placeholder:text-gray-500"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating || !topic}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-medium disabled:opacity-50 flex items-center gap-2 hover:scale-105 transition-all duration-200"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating Plan...
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Generate Lesson Plan
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'view' && (
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white mb-4">Generated Lesson Plan</h2>
            <div className="bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <pre className="text-gray-400 whitespace-pre-wrap">{lessonPlan}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
