import { useState, type FormEvent } from 'react';

interface Props {
  onSend: (message: string) => void;
  disabled: boolean;
}

const SUGGESTIONS = [
  'Best resort for a honeymoon?',
  'Budget-friendly options',
  'Family resorts with kids club',
  'Best diving resorts',
];

export default function MessageInput({ onSend, disabled }: Props) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput('');
  };

  return (
    <div className="border-t border-gray-100 bg-white px-4 py-3">
      {/* Suggested prompts — only show when no messages */}
      <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSend(s)}
            disabled={disabled}
            className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-ocean-100 text-ocean-700 hover:bg-ocean-300 transition-colors disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Maldives resorts..."
          disabled={disabled}
          className="flex-1 rounded-full border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="rounded-full bg-ocean-700 text-white px-5 py-2.5 text-sm font-medium hover:bg-ocean-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </div>
  );
}
