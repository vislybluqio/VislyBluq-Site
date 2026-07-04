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
      <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${isUser ? 'rounded-tr-none bg-[#adc6ff] text-[#002e69]' : 'rounded-tl-none border border-white/5 bg-[#2a3546] text-[#d7e3f9]'}`}>
        <p className="whitespace-pre-wrap">{content}</p>
        {!isUser && onSpeak && <button type="button" onClick={onSpeak} className="mt-2 flex items-center gap-1 text-xs text-[#77d8ff] hover:text-white" aria-label={speakLabel}><Volume2 className="h-3.5 w-3.5" />{speakLabel}</button>}
      </div>
    </div>
  );
};

export default ChatMessage;
