import { ChevronDown } from "lucide-react";

export default function SourceComponent({ sources, isOpen, onToggle }) {
  return (
    <div className="mt-4">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
      >
        <ChevronDown className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''} transition-transform`} />
        {isOpen ? "Hide Sources" : "Show Sources"}
      </button>
      {isOpen && (
        <div className="mt-2 p-3 bg-white/5 rounded-lg text-sm text-gray-400 space-y-2">
          {sources.map((source, index) => (
            <div key={index}>
              <p className="font-medium text-gray-300">Source {index + 1}:</p>
              <pre className="whitespace-pre-wrap break-words text-xs">{source}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}