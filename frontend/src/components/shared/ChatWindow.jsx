import { motion } from "framer-motion";
import { FileText, ChevronDown } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import LoadingIndicator from "./LoadingIndicator";
import SourceComponent from "./SourceComponent";

export default function ChatWindow({ 
  messages, 
  isAnalyzing, 
  fileName,
  chatEndRef 
}) {
  const [showSources, setShowSources] = useState({});

  const toggleSources = (index) => {
    setShowSources((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4 mb-4 sticky top-0 bg-[#010207]">
        <FileText className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold">
          Chatting with:{" "}
          <span className="text-purple-400">{fileName}</span>
        </h2>
      </div>

      {/* Messages */}
      {messages.map((message, index) => (
        <motion.div
          key={index}
          initial={{ x: message.type === 'user' ? 50 : -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className={`p-3 rounded-lg w-fit max-w-[80%] ${
            message.type === 'user' 
              ? 'ml-auto bg-purple-600/30 text-white'
              : message.type === 'error'
              ? 'bg-red-600/30 text-white'
              : 'bg-white/10 text-gray-200'
          }`}
        >
          {message.type === 'bot' && message.content?.response ? (
            <>
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                className="prose prose-invert max-w-none"
                components={{
                  p: ({ node, ...props }) => <p className="text-gray-300 mb-2" {...props} />,
                  h4: ({ node, ...props }) => <h4 className="text-lg font-semibold text-purple-400 mb-2" {...props} />,
                  li: ({ node, ...props }) => <li className="text-gray-300 ml-6 list-disc" {...props} />,
                  hr: ({ node, ...props }) => <hr className="my-4 border-white/10" {...props} />,
                  pre: ({ node, ...props }) => <pre className="bg-white/5 p-2 rounded text-sm text-gray-400" {...props} />,
                }}
              >
                {message.content.response}
              </ReactMarkdown>
              {message.content.context_docs && message.content.context_docs.length > 0 && (
                <SourceComponent
                  sources={message.content.context_docs}
                  isOpen={showSources[index]}
                  onToggle={() => toggleSources(index)}
                />
              )}
            </>
          ) : (
            <div>{message.content}</div>
          )}
        </motion.div>
      ))}
      
      {isAnalyzing && <LoadingIndicator />}
      <div ref={chatEndRef} />
    </div>
  );
}