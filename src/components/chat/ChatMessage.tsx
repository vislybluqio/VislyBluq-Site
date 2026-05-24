import { Volume2 } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  onSpeak?: () => void;
  speakLabel?: string;
}

const ChatMessage = ({ role, content, onSpeak, speakLabel }: ChatMessageProps) => {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-visly-blue text-white rounded-br-md'
            : 'bg-gray-100 text-visly-dark rounded-bl-md'
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {!isUser && onSpeak && (
          <button
            type="button"
            onClick={onSpeak}
            className="mt-2 flex items-center gap-1 text-xs text-visly-blue hover:text-visly-navy transition-colors"
            aria-label={speakLabel}
          >
            <Volume2 className="h-3.5 w-3.5" />
            {speakLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
