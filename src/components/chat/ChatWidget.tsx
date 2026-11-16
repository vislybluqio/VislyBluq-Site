import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import ChatPanel from './ChatPanel';
import { CHAT_UI } from '../../config/chat';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ui = CHAT_UI.en;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-12 items-center gap-2 rounded-full border border-ink-line bg-ink px-4 text-sm font-medium text-ink-text shadow-[0_8px_30px_rgba(15,19,27,0.3)] transition-colors hover:bg-ink-raised"
        aria-label={isOpen ? ui.closeChat : ui.openChat}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="h-4 w-4" aria-hidden /> : <MessageCircle className="h-4 w-4" aria-hidden />}
        <span className="hidden sm:inline">{isOpen ? 'Close' : 'Ask a question'}</span>
      </button>
    </div>
  );
};

export default ChatWidget;
