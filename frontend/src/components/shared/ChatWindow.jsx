import { motion } from "framer-motion";
import { FileText, ChevronDown } from "lucide-react";
import LoadingIndicator from "./LoadingIndicator";
import { useState } from "react";

export default function ChatWindow({ 
  messages, 
  isAnalyzing, 
  fileName,
  chatEndRef 
}) {
  const [showContext, setShowContext] = useState(false);

  const renderMessageContent = (content) => {
    // Split content into lines and process each
    return content.split("\n").map((line, index) => {
      let processedLine = line.trim();

      // Handle bold text (e.g., **text**)
      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

      // Handle headings (e.g., **Subject:** or lines starting with **)
      if (processedLine.startsWith("**") && processedLine.endsWith("**")) {
        return <h4 key={index} className="text-lg font-semibold text-purple-400 mb-2">{processedLine.replace(/\*\*/g, "")}</h4>;
      }

      // Handle unordered lists (lines starting with * or -)
      if (processedLine.match(/^\s*[-*]\s+/)) {
        return <li key={index} className="text-gray-300 ml-6 list-disc">{processedLine.replace(/^\s*[-*]\s+/, "")}</li>;
      }

      // Handle code blocks or examples (e.g., --- or indented text)
      if (processedLine.startsWith("---")) {
        return <hr key={index} className="my-4 border-white/10" />;
      }
      if (processedLine.match(/^[\s*]+\S/)) {
        return <pre key={index} className="bg-white/5 p-2 rounded text-sm text-gray-400">{processedLine}</pre>;
      }

      // Handle normal text
      return processedLine ? <p key={index} className="text-gray-300 mb-2">{processedLine}</p> : null;
    });
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
              <div dangerouslySetInnerHTML={{ __html: renderMessageContent(message.content.response) }} />
              {message.content.context_docs && message.content.context_docs.length > 0 && (
                <div className="mt-4">
                  <button
                    onClick={() => setShowContext(!showContext)}
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <ChevronDown className={`w-4 h-4 ${showContext ? 'rotate-180' : ''} transition-transform`} />
                    {showContext ? "Hide Sources" : "Show Sources"}
                  </button>
                  {showContext && (
                    <div className="mt-2 p-3 bg-white/5 rounded-lg text-sm text-gray-400 space-y-2">
                      {message.content.context_docs.map((doc, docIndex) => (
                        <div key={docIndex}>
                          <p className="font-medium text-gray-300">Source {docIndex + 1}:</p>
                          <pre className="whitespace-pre-wrap break-words">{doc}</pre>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
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