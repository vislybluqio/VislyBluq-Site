import { ThumbsDown, ThumbsUp, Volume2 } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  onSpeak?: () => void;
  speakLabel?: string;
  onFeedback?: (rating: 'up' | 'down') => void;
  feedbackValue?: 'up' | 'down' | null;
}

const ChatMessage = ({ role, content, onSpeak, speakLabel, onFeedback, feedbackValue }: ChatMessageProps) => {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'rounded-tr-none bg-[#adc6ff] text-[#002e69]' : 'rounded-tl-none border border-white/5 bg-[#2a3546] text-[#d7e3f9]'}`}>
        <p className="whitespace-pre-wrap">{content}</p>
        {!isUser && (onSpeak || onFeedback) && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {onSpeak && <button type="button" onClick={onSpeak} className="flex items-center gap-1 text-xs text-[#77d8ff] hover:text-white" aria-label={speakLabel}><Volume2 className="h-3.5 w-3.5" />{speakLabel}</button>}
            {onFeedback && (
              <div className="ml-auto flex items-center gap-1" aria-label="Rate response">
                <button type="button" onClick={() => onFeedback('up')} className={`rounded-full p-1.5 transition ${feedbackValue === 'up' ? 'bg-emerald-400/20 text-emerald-200' : 'text-[#c2c6d6] hover:bg-white/10 hover:text-white'}`} aria-label="Helpful response"><ThumbsUp className="h-3.5 w-3.5" /></button>
                <button type="button" onClick={() => onFeedback('down')} className={`rounded-full p-1.5 transition ${feedbackValue === 'down' ? 'bg-red-400/20 text-red-200' : 'text-[#c2c6d6] hover:bg-white/10 hover:text-white'}`} aria-label="Not helpful response"><ThumbsDown className="h-3.5 w-3.5" /></button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
